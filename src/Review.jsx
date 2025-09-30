
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


function Review() {useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);
  return (
    <div>
      <section className="testimonial-section">
        <div className="testimonial-intro">
          <h1>
            Voices of Trust, <br />
            Powered by <br />
            Science
          </h1>
          <p>
            Hear real stories from partners, patients, and professionals who've experienced our innovation in action.
          </p>
        </div>

        <div className="testimonial-cards-container">

          <div className="testimonial-card" data-aos='fade-left'>
           
            <p className="quote-text">
              Partnering with this biotech team accelerated our research timelines significantly. Their scientific rigor and transparency are truly unmatched. Partnering with this biotech team accelerated our research timelines significantly. Their scientific rigor and transparency are truly unmatched.
            </p>
            <div className="reviewer-info">
              <img src="placeholder-image.jpg" alt="Dr. Melissa Grant" className="reviewer-image" />
              <div className="reviewer-details">
                <p className="reviewer-name">Dr. Melissa Grant</p>
                <p className="reviewer-title">Clinical Research Director</p>
              </div>
            </div>
            <div className="rating">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star empty">★</span>
            </div>
          </div>

           <div className="testimonial-card" data-aos='fade-left'>
          
            <p className="quote-text">
              Partnering with this biotech team accelerated our research timelines significantly. Their scientific rigor and transparency are truly unmatched. Partnering with this biotech team accelerated our research timelines significantly. Their scientific rigor and transparency are truly unmatched.
            </p>
            <div className="reviewer-info">
              <img src="placeholder-image.jpg" alt="Dr. Melissa Grant" className="reviewer-image" />
              <div className="reviewer-details">
                <p className="reviewer-name">Dr. Melissa Grant</p>
                <p className="reviewer-title">Clinical Research Director</p>
              </div>
            </div>
            <div className="rating">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star empty">★</span>
            </div>
          </div>
          

        </div>
      </section>
    </div>
  )
}

export default Review