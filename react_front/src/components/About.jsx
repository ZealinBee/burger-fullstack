import "../styles/about.css"

const About = ()=>{
    return(
        <>
    <section class="section about" id="about">
        <div class="about-content container">
            <div class="about-imageContent">
                 <img src="https://zealinbee.blob.core.windows.net/burger/abiyt.jpeg" alt="about" className="about-img"/>

                <div class="aboutImg-textBox">
                    <i class='bx bx-heart heart-icon flex'></i>
                    <p class="content-description">I really love the Cappucino. The coffee were very smooth.</p>
                </div>
            </div>

            <div class="about-details">
                <div class="about-text">
                    <h4 class="content-subtitle"><i>Our coffee Shop</i></h4>
                    <h2 class="content-title">We Combine Classics <br/> and Modernity</h2>
                    <p class="content-description">We appreciate your trust greatly. 
                        Our clients choose us and our products because theyknow we are the best.
                    </p>
                </div>

                <div class="about-buttons flex">
                    <button class="button">About Us</button>
                    <a href="#" class="about-link flex">
                        <span class="link-text">see more</span>
                        <i class='bx bx-right-arrow-alt about-arrowIcon'></i>
                    </a>
                </div>
            </div>
        </div>
       
    </section>

    </>
    )
}

export default About;