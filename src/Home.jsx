import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';




function Home() {  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);
  return (
    <div className='hme'  >
        <h4 data-aos="fade-down">Trusted Product information </h4>
        <h1 data-aos="fade-down"><span>Advancing Global</span><br/>Health Through Scientific <br/>Innovation</h1>
        <p>Driving innovation in medicine through advaned research, precision science,and global pharmaceutical solution.</p>
    </div>
  )
}




export default Home

