import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ stats }) => {
  return (
   <div className="chart-container">
      <h3>Pie Chart</h3>
      <Pie data={{
        labels: ['Cases', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          data: [stats.cases, stats.recovered, stats.deaths],
          backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
        }]
      }} />
    </div>
  )
}

export default PieChart
