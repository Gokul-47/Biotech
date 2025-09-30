
import CountUp from 'react-countup';
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';




function About() { useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);
  return (
    <div className='about-container'>
        <div className='about-top'>
            <h5>Our Trusted Collaborators</h5>
            <h1><CountUp start={0} end={150} duration={3} enableScrollSpy/>K+</h1>
        </div>
        <div className='about-bottom'>
            <div className='bottom-head'>
            <h1>Targeted Science.<br/>Real Impact.<br/><span>Better Lives</span></h1>
            <p>Exploring critical disease areas through focused research, <br/>breakthrough science, and patient-centered innovation worldwide.</p>
            </div>
            <div className='cards' >
                <div className='box' data-aos="fade-up">
                    <img src='/oncology.png'></img>
                    <h1>Oncology</h1>
                    <p>Advancing cancer treatment through targeted therapies and immuno-oncology breakthroughs. Advancing cancer treatment through targeted therapies</p>
                </div>
                 <div className='box' data-aos="fade-up">
                    <img src='/neurology.png'></img>
                    <h1>Neurology</h1>
                    <p>Advancing cancer treatment through targeted therapies and immuno-oncology breakthroughs. Advancing cancer treatment through targeted therapies</p>
                </div>
                 <div className='box' data-aos="fade-up">
                    <img src='/rare.png'></img>
                    <h1>Rare <br/>Diseases</h1>
                    <p>Advancing cancer treatment through targeted therapies and immuno-oncology breakthroughs. Advancing cancer treatment through targeted therapies</p>
                </div>
                 <div className='box' data-aos="fade-up">
                    <img src='/infectious.png'></img>
                    <h1>Infectious<br/> diseases</h1>
                    <p>Advancing cancer treatment through targeted therapies and immuno-oncology breakthroughs. Advancing cancer treatment through targeted therapies</p>
                </div>
                 <div className='box' data-aos="fade-up">
                    <img src='/autoimmune.png'></img>
                    <h1>Autoimmune<br/> Disorders</h1>
                    <p>Advancing cancer treatment through targeted therapies and immuno-oncology breakthroughs. Advancing cancer treatment through targeted therapies</p>
                </div>
                 <div className='box' data-aos="fade-up">
                    <img src='/rare.png'></img>
                    <h1>Gene & Cell Therapy</h1>
                    <p>Advancing cancer treatment through targeted therapies and immuno-oncology breakthroughs. Advancing cancer treatment through targeted therapies</p>
                </div>
                
            </div>
        </div>
    </div>
    
  )
}

export default About