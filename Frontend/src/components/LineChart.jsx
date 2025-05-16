import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ data, startDate, endDate }) => {

  const filterDates = (datesObj) => {
    return Object.keys(datesObj).filter(dateStr => {
      const date = new Date(dateStr);
      return date >= startDate && date <= endDate;
    });
  };

  const dates = filterDates(data.cases);
  const cases = dates.map(date => data.cases[date]);
  const recovered = dates.map(date => data.recovered[date]);
  const deaths = dates.map(date => data.deaths[date]);

  return (
    <div className="chart-container">
      <h3>Line Chart</h3>
      <Line
        stroke="#007bff"
        strokeWidth={2}
        data={{
          labels: dates,
          datasets: [
            {
              label: 'Cases',
              data: cases,
              borderColor: 'blue',
              fill: false,
              borderWidth: 1.2,
              tension: 0.3,
              pointRadius: 0
            },
            {
              label: 'Recovered',
              data: recovered,
              borderColor: 'green',
              fill: false,
              borderWidth: 1.2,
              tension: 0.3,
              pointRadius: 0
            },
            {
              label: 'Deaths',
              data: deaths,
              borderColor: 'red',
              fill: false,
              borderWidth: 1.2,
              tension: 0.3,
              pointRadius: 0
            },
          ]
        }}
        
      />
    </div>
  )
}

export default LineChart
