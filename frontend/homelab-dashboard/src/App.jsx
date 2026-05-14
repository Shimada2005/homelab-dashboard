import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = () => {
      fetch("http://127.0.0.1:8000/status")
        .then((res) => res.json())
        .then((data) => setStatus(data))
        .catch((err) => console.error(err));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderBar = (value) => {
    const totalBars = 10;
    const filledBars = Math.round((value / 100) * totalBars);

    return "█".repeat(filledBars) + "░".repeat(totalBars - filledBars);
  };

  const getColor = (value) => {
  if (value < 50) return "#4ade80"; // green
  if (value < 80) return "#facc15"; // yellow
  return "#ef4444"; // red
};

  return (
    <div className="container">
      <h1>HomeLab Dashboard</h1>

      {status ? (
        <div className="card-container">
          <div className="card">
            <h2>CPU Usage</h2>

            <p className="percent">{status.cpu}%</p>

            <div className="bar-bg">
              <div className="bar-fill" 
              style={{ 
                width: `${status.cpu}%` ,
                backgroundColor: getColor(status.cpu)
                }} />
            </div>
          </div>

          <div className="card">
            <h2>Memory Usage</h2>

            <p className="percent">{status.memory}%</p>

            <div className="bar-bg">
              <div className="bar-fill" 
              style={{ 
                width: `${status.memory}%` ,
                backgroundColor: getColor(status.memory)
                }} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;