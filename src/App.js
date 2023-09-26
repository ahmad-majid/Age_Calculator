import React, { useState } from 'react';
import './App.css';
import img from './icon.svg';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);
  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');

  const calculateAge = () => {
    const inputDay = parseInt(day, 10);
    const inputMonth = parseInt(month, 10) - 1;
    const inputYear = parseInt(year, 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const inputDate = new Date(inputYear, inputMonth, inputDay);


console.log(inputDate);

    if (!day || !month || !year) {
      setDayError('Day is required');
      setMonthError('Month is required');
      setYearError('Year is required');
      setResult(null); 
    } else if (
      inputDay < 0 || 
      inputDay > 31
    ) {
      setDayError('Invalid day');
      setMonthError('');
      setYearError('');
      setResult(null); 
    } else if (
      inputMonth < 0 || 
      inputMonth > 11 
    ) {
      setDayError('');
      setMonthError('Invalid month');
      setYearError('');
      setResult(null); 
    } else if (
      inputYear < 1900
    ) {
      setDayError('');
      setMonthError('');
      setYearError('Invalid year');
      setResult(null); 
    } else if (
      (inputMonth === 1 && inputDay > 29 && ((inputYear % 4 !== 0) || (inputYear % 100 === 0 && inputYear % 400 !== 0)))
    ) {
      setDayError('Invalid day');
    
      setResult(null); 
    } else if (
      (inputMonth === 1 && inputDay > 28 && (inputYear % 4 === 0 && (inputYear % 100 !== 0 || inputYear % 400 === 0)))
    ) {
      setDayError('Invalid day');
      setResult(null); 
    } else if (inputYear > currentYear) {
      setDayError('');
      setMonthError('');
      setYearError('Year must be in the past');
      setResult(null); 
    } else if (
      inputYear === currentYear &&
      (inputMonth > currentMonth || (inputMonth === currentMonth && inputDay > currentDay))
    ) {
      setDayError('');
      setMonthError('');
      setYearError('Year must be in the past');
      setResult(null); 
    } else {
      // Calculate age
      let years = currentYear - inputYear;
      let months = currentMonth - inputMonth;
      let days = currentDay - inputDay - 1; 

      if (days < 0) {
        months -= 1;
        days += 30; // Assuming 30 days in a month for simplicity
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setResult({
        years,
        months,
        days,
      });

      setDayError('');
      setMonthError('');
      setYearError('');
    }
  };

  return (
    <body>
    <main className="card">
      <section className="inputs">
        <div className={`input-day ${dayError ? 'error-input' : ''}`}>
          <label id="labelday" htmlFor="day">
            Date
          </label>
          <input
            type="number"
            name="day"
            id="day"
            placeholder="DD"
            min="0" // Start from 0
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          {dayError && <p className="error">{dayError}</p>}
        </div>
        <div className={`input-month ${monthError ? 'error-input' : ''}`}>
          <label id="labelmonth" htmlFor="month">
            Month
          </label>
          <input
            type="number"
            name="month"
            id="month"
            placeholder="MM"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          {monthError && <p className="error">{monthError}</p>}
        </div>
        <div className={`input-year ${yearError ? 'error-input' : ''}`}>
          <label id="labelyear" htmlFor="year">
            Year
          </label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="YYYY"
            min="1900"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          {yearError && <p className="error">{yearError}</p>}
        </div>
      </section>
      <div className="line-button">
        <hr />
        <button id="arrowbtn" onClick={calculateAge}>
          <img src={img} alt="icon-arrow" />
          Calculate
        </button>
      </div>
      <section className="result">
        {(!result || dayError || monthError || yearError) && (
          <div>
            <p>
              <span id="resultyears">--</span> years
            </p>
            <p>
              <span id="resultmonths">--</span> months
            </p>
            <p>
              <span id="resultdays">--</span> days
            </p>
          </div>
        )}
        {result && !dayError && !monthError && !yearError && (
          <div>
            <p>
              <span id="resultyears">{result.years}</span> years
            </p>
            <p>
              <span id="resultmonths">{result.months}</span> months
            </p>
            <p>
              <span id="resultdays">{result.days}</span> 
            </p>
          </div>
        )}
      </section>
      <div>
      
      </div>
    </main>
    <footer class="attribution">
    <p style={{fontSize:`14px`,wordSpacing:`6px`}}>Challenge by <a href="https://www.frontendmentor.io/profile/ahmad-majid" target="_blank">Frontend Mentor</a>. Coded by <a href="https://www.linkedin.com/in/ahmad-majid-957ba9200" target="_blank">Ahmad Majid</a></p>
  </footer>
  </body>
  );
}

export default App;
