import React from 'react'

function Contact() {
  return (
    <div>
        <h2>Contact Us</h2>
        <form id="contactForm">
            <input type="text" id="name" placeholder="Your Name" required />
            <input type="email" id="email" placeholder="Your Email" required />
            <textarea id="message" rows="4" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
            
        </form>
    </div>
  )
}

export default Contact
