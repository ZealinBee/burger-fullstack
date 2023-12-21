import {configureStore} from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersReducer";
import foodsReducer from "./reducers/foodsReducer";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/ordersReducer";

const store = configureStore({
    reducer: {
        usersReducer,
        foodsReducer,
        cartReducer,
        ordersReducer
    }
})

export default store