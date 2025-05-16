import React from 'react'
import './StatCards.css'

const StatCards = ({ stats }) => {

  const total = stats.population || 1;

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num;
  };

  const getPercent = (count) => {
    return ((count / total) * 100).toFixed(3) + '%';
  };
   const data = [
    { label: 'Total Cases', value: stats.cases, color: '#6c63ff' },
    { label: 'Recoveries', value: stats.recovered, color: '#00c853' },
    { label: 'Deaths', value: stats.deaths, color: '#f44336' },
  ];

  return (
    <div className="stat-cards-container">
      {data.map((item) => (
        <div key={item.label} className="stat-pill">
          <div className="pill-left" style={{ backgroundColor: item.color }}>
            <div className="pill-label">{item.label}</div>
            <div className="pill-percent">{getPercent(item.value)}</div>
          </div>
          <div className="pill-right">
            <div className="pill-value">{formatNumber(item.value)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatCards
