const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const crypto = require("crypto-js");
var jwt = require("jsonwebtoken");
const { listen } = require("express/lib/application");
const port = 5555;

app.use(express.json());
app.use(cors());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "burger", //db name
});

app.get("/", (req, res) => {
  res.send("hello");
});

//////////sign up

app.post("/users", (req, res) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.mobile_number ||
    !req.body.password
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  conn.query(
    "SELECT * FROM customer WHERE username = ? OR email = ?",
    [req.body.username, req.body.email],
    (error, existingData) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (existingData.length > 0) {
        return res.status(400).json({
          error:
            "Username or email already exists. Please choose different data.",
        });
      }

      conn.query(
        "INSERT INTO customer(username, email, mobile_number, password, role) VALUES (?,?,?,?,?)",
        [
          req.body.username,
          req.body.email,
          req.body.mobile_number,
          req.body.password,
          0,
        ],
        (insertError, data) => {
          if (insertError) {
            console.error(insertError);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          console.log(data);
          res.status(201).json({ success: true, data });
        }
      );
    }
  );
});

////getting the list of foods is available to everyone

app.get("/foods", (req, res) => {
  conn.query("SELECT * FROM food", (error, data) => {
    if (error == null) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

//////////login&authentication/////////

app.post("/login", (req, res) => {
  conn.query(
    "SELECT * FROM customer WHERE email = ? AND password = ?",
    [req.body.email, req.body.password],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "User does not exist or wrong credentials" });
      }

      const user = results[0];

      // Now you have the user data, and you can proceed with further checks or actions.
      const secretKey = "ifhvseiguehrifvuejsrfiu";
      const token = jwt.sign(
        { customer_id: user.customer_id, email: user.email, role: user.role },
        secretKey,
        { expiresIn: "1h" }
      );
      if (user.role == 1) {
        res.status(200).json({ message: "Welcome admin", token });
      } else {
        res.status(200).json({ message: "Login successful", token });
      }
    }
  );
});

//MIDDLEWARE//
// Middleware for login user authorization
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, "ifhvseiguehrifvuejsrfiu");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized token" });
  }
};

function adminToken(req, res, next) {
  if (req.user.role == 1) {
    next();
  } else {
    res.send({ message: "access denied" });
  }
}

///////User order system
app.post("/placeOrder", authToken, (req, res) => {
  const customer_id = req.user.customer_id;

  if (!customer_id) {
    return res
      .status(400)
      .json({ error: "Customer ID is missing or invalid." });
  }

  conn.query(
    "INSERT INTO cust_order (customer_id, status) VALUES (?, ?)",
    [customer_id, "preparing"],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to insert order." });
      }

      const order_id = results.insertId;
      for (let i = 0; i < req.body.orders.length; i++) {
        console.log(req.body.orders[i]);
        conn.query(
          "INSERT INTO food_order (food_id, order_id, quantity) VALUES (?, ?, ?)",
          [req.body.orders[i].food_id, order_id, req.body.orders[i].quantity],
          (err, results) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "Failed to insert food order." });
            }
          }
        );
      }
      // delete the old location
      conn.query(
        "DELETE FROM location WHERE customer_id = ?",
        [customer_id],
        (err, results) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Failed to insert location." });
          }
        }
      );

      conn.query(
        "INSERT INTO location (customer_id, city, barangay, address) VALUES (?, ?, ?, ?)",
        [customer_id, req.body.city, req.body.barangay, req.body.address],
        (err, results) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Failed to insert location." });
          }
          res.send("Order placed successfully");
        }
      );
    }
  );
});

app.get("/orders/:order_id", authToken, (req, res) => {
  const order_id = req.params.order_id;
  if (!order_id) {
    return res.status(400).json({ error: "Order ID is missing or invalid." });
  }
  conn.query(
    "SELECT co.order_id, co.customer_id, co.status, f.food_name, f.price, location.address, fo.quantity FROM cust_order AS co INNER JOIN food_order AS fo ON fo.order_id = co.order_id INNER JOIN food AS f ON f.food_id = fo.food_id INNER JOIN location ON location.customer_id = co.customer_id WHERE co.order_id = ?;",
    [order_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to get order." });
      }
      res.send(results);
    }
  );
});

/////////displaying only their orders
app.get("/displayYourOrder", authToken, (req, res) => {
  const customer_id = req.user.customer_id;

  conn.query(
    "SELECT co.order_id, c.customer_id, co.status, l.address, co.created_at FROM cust_order AS co INNER JOIN customer AS c ON c.customer_id = co.customer_id INNER JOIN location AS l ON l.customer_id = c.customer_id WHERE c.customer_id = ?;",
    [customer_id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json(results);
    }
  );
});

//////////displaying the ALL orders (available for admins)
app.get("/displayOrder", authToken, adminToken, (req, res) => {
  conn.query(
    `SELECT co.order_id, c.customer_id, co.status, l.address, co.created_at FROM cust_order AS co INNER JOIN customer AS c ON c.customer_id = co.customer_id INNER JOIN location AS l ON l.customer_id = c.customer_id;`,
    (error, data) => {
      if (error == null) {
        res.send(data);
      } else {
        res.send(error);
      }
    }
  );
});

/////////Admin can change the status according to resto's order progress
app.put("/editStatus/:id", authToken, adminToken, (req, res) => {
  conn.query(
    `UPDATE cust_order SET status="${req.body.status}" WHERE order_id = ${req.params.id};`,
    (error, data) => {
      if (error == null) {
        res.send(req.params.id);
      } else {
        res.send(error);
      }
    }
  );
});

////////Delete the order if the status becomes DELIVERED

////posting foods is only allowed by admins
app.post("/foods", authToken, adminToken, (req, res) => {
  console.log(req.user.role);

  conn.query(
    "INSERT INTO food(food_name, description, price, quantity) VALUES (?,?,?,?)",
    [
      req.body.food_name,
      req.body.description,
      req.body.price,
      req.body.quantity,
    ],
    (error, data) => {
      if (
        req.body.food_name != undefined &&
        req.body.description != undefined &&
        req.body.price &&
        req.body.quantity
      ) {
        console.log(req.body);
        res.send(data);
      } else {
        res.send(error);
      }
    }
  );
});

//////Menu updates
app.put("/updateMenu/:food_id", authToken, adminToken, (req, res) => {
  const { food_name, description, price, quantity } = req.body;
  const foodId = req.params.food_id;

  const setFields = [];
  if (food_name !== undefined) setFields.push(`food_name = "${food_name}"`);
  if (description !== undefined)
    setFields.push(`description = "${description}"`);
  if (price !== undefined) setFields.push(`price = ${price}`);
  if (quantity !== undefined) setFields.push(`quantity = ${quantity}`);

  const setClause = setFields.join(", ");

  const sqlQuery = `UPDATE food SET ${setClause} WHERE food_id = ${foodId}`;

  conn.query(sqlQuery, (error, data) => {
    if (error === null) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

/////Delete the Food from the menu completely
// app.delete('/deleteFood/:food_id', authToken, adminToken, (req,res)=>{
//   conn.query(`DELETE FROM food WHERE food_id = ${req.params.food_id}`, (error, data)=>{
//     if(error==null){
//       res.send(data);
//     }else{
//       res.send(error);
//     }
//   })
// })

//////soft delete the food

app.delete("/deleteFood/:food_id", authToken, adminToken, (req, res) => {
  const foodId = req.params.food_id;
  const sqlQuery = `UPDATE food SET deleted_at = CURRENT_TIMESTAMP WHERE food_id = ${foodId}`;

  conn.query(sqlQuery, (error, data) => {
    if (error === null) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

///////item restoration
app.put("/restoreMenu/:food_id", authToken, adminToken, (req, res) => {
  const foodId = req.params.food_id;

  const sqlQuery = `UPDATE food SET deleted_at = NULL WHERE food_id = ${foodId}`;

  conn.query(sqlQuery, (error, data) => {
    if (error === null) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

//////only admin can see the list of custoemrs
app.get("/users", (req, res) => {
  conn.query("SELECT * FROM customer;", (error, data) => {
    if (error == null) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

app.get("/getSelf", authToken, (req, res) => {
  const decoded = jwt.verify(req.body.token, "ifhvseiguehrifvuejsrfiu");
  console.log(decoded);
  conn.query(
    `SELECT * FROM customer WHERE customer_id = ${req.user.customer_id}`,
    (error, data) => {
      if (error == null) {
        res.send(data);
      } else {
        res.send(error);
      }
    }
  );
});

/////ok!
app.get("/protected", authToken, adminToken, (req, res) => {
  res.json({
    message: "yey! you gone thru middleware",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
