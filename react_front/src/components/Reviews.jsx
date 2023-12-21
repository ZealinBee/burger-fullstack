import React from 'react';
import '../styles/reviews.css';

const Reviews = ()=>{
    return(
        <>
        <section id="review" className="section review">
        <div className="review-header">
            <span className="title">Our Reviews</span>
            <span className="sub-title">What Our Customer Says</span>
        </div>

        <div className="review-container">

            <figure className="snip1533">
                <figcaption>
                    <blockquote>
                        <p>I asked for a cup of coffee, but I got a sip of heaven instead.</p>
                    </blockquote>
                    <h3>Eleanor Brewington</h3>
                </figcaption>
            </figure>

            <figure className="snip1533">
                <figcaption>
                    <blockquote>
                        <p>This coffee just cured my Monday blues. Doctors hate it!</p>
                    </blockquote>
                    <h3>Ursula Gurnmeister</h3>
                </figcaption>
            </figure>

            <figure className="snip1533">
                <figcaption>
                    <blockquote>
                        <p>Forget love, fall in coffee. It's a much safer bet.</p>
                    </blockquote>
                    <h3>Lucas Mondaycure</h3>
                </figcaption>
            </figure>

        </div>
    </section>

        </>
    )
}

export default Reviews;