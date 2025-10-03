import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Review  from './Review.jsx'
import Contact from './Contact.jsx'
import Cliens from './cliens.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <Home/>
    <About/>
    <Review/>
    <Cliens/>
    <Contact/>
  </StrictMode>,
)
