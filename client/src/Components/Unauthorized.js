import React from 'react';
import { Link } from 'react-router-dom';
import logo403 from "../img/403.png";
import "../App.css";

const Unauthorized = () => {
  return (
    <div className='container'>
      <div className="four0three">
        <img src={logo403} alt="403 Forbidden Access" />
      </div>
      <div className="unauth-message">
        {/* <h1>403 - You Shall Not Pass</h1> */}
        <p>Uh oh, it looks like your missing something!<br />We have not been able to verify your credentials. Please be sure you are logged in.</p>
        <p><Link to='/'>Back to Home</Link></p>
      </div>
    </div>
  )
}

export default Unauthorized;