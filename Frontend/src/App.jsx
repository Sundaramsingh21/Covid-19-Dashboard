import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios'
import Header from './components/Header';
import StatCards from './components/StatCards';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState({ label: 'United States', value: 'usa' });
  const [countryOptions, setCountryOptions] = useState([]);
  const [historicalData, setHistoricalData] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [startDate, setStartDate] = useState(new Date('2020-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState('');


  // Fetch list of countries
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((res) => {
        const countries = res.data.map((country) => ({
          label: country.name.common,
          value: country.cca3.toLowerCase()
        }));
        setCountryOptions(countries.sort((a, b) => a.label.localeCompare(b.label)));
        // console.log("Mapped countries:", countries);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load country list.');
      });
  }, []);

  // Fetch COVID historical + current stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        const [historicalRes, currentRes] = await Promise.all([
          axios.get(`https://disease.sh/v3/covid-19/historical/${selectedCountry.value}?lastdays=1500`),
          axios.get(`https://disease.sh/v3/covid-19/countries/${selectedCountry.value}`)
        ]);

        setHistoricalData(historicalRes.data.timeline || historicalRes.data); // fallback in case 'timeline' is missing
        setCurrentStats(currentRes.data);
        // console.log("Historical API response:", historicalRes.data);
        console.log("Current API response:", currentRes.data);

      } catch (err) {
        console.error(err);
        setError('No Internet, Failed to load COVID data.');
      }
    };

    fetchData();
  }, [selectedCountry]);


  return (
    <div className="container">
      <Header />
      <div className="top-bar">

        {/* Selector */}
        <div className="search-dropdown">
          <Select
            options={countryOptions}
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Search Country"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '10px',
                padding: '2px 4px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }),
              option: (base, state) => ({
                ...base,
                borderRadius: '6px',
                backgroundColor: state.isFocused ? '#f0f8ff' : 'white',
                color: '#333',
                cursor: 'pointer',
              }),
            }}
          />
        </div>

        {/* Date Picker */}
        <div className="date-range-picker">
          <label>Filter by Date Range</label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setStartDate(update[0]);
              setEndDate(update[1]);
            }}
            isClearable={true}
            dateFormat="dd-MM-yyyy"
          />
        </div>
      </div>
      
      {/* Status like cases, recover & deaths */}
      {error && <p className="error">{error}</p>}
      {currentStats && <StatCards stats={currentStats} />}

      {/* Chats */}
      <div className="charts">
        {historicalData && <LineChart data={historicalData} startDate={startDate} endDate={endDate} />}
        {currentStats && <PieChart stats={currentStats} />}
      </div>
    </div>

  )
}

export default App
