import React from 'react'

function Navbar() {
  return (
    <div className='nav'>
      <img src='/logobiotech.png'></img>
    <ul>
      <li><a href="#">Home ▼</a>
        <ul>
          <li><a href="#">Home 01</a></li>
          <li><a href="#">Home 02</a></li>
        </ul>
      </li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services </a></li>
      <li><a href="#">Research</a></li>
      <li><a href='#'>Pages ▼</a></li>
      <li><a href='#'>Blog</a></li>
    </ul>
    <button>Contact Us</button>
    </div>
  )
}

export default Navbar