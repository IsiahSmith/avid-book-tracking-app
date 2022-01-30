import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          AVID is an app designed to track the user’s personal reading and reading behavior. 
          Users begin by adding the title, author, 
          and page count of the book they would like to track (this information can be edited after with the ‘Edit’ button). 
          The user is then able to edit the book’s information, 
          update the reading progress of the book, or mark the book as complete. 
          Clicking ‘Update’ will allow the user to update their progress in the book, 
          and prompt them to input the date the user last read the book, how long they read for, 
          and the current page they’re on. The updated progress is then tracked and displayed on screen. 
          Users can marks books as complete, giving them a rating and adding them to the 'Collections' page. 
          AVID also features a Reading Data page that features stats and metrics, such as the user’s reading speed and how long they read for each day via chart.js
          </p>

          <p>
          Thanks to my instructors and peers at Prime Digital Academy, 
          making this app would not have been possible without their teaching and support!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
