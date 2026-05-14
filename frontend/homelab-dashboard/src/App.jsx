import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/status")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1>HomeLab Dashboard</h1>

      {status ? (
        <div className="card-container">
          <div className="card">
            <h2>CPU Usage</h2>
            <p>{status.cpu}%</p>
          </div>
          <div className="card">
            <h2>Memory Usage</h2>
            <p>{status.memory}%</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;