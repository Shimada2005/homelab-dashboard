import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchStatus = () => {
      fetch("http://127.0.0.1:8000/status")
        .then((res) => res.json())
        .then((data) => {
          setStatus(data);

          const now = new Date();

          setLastUpdated(
            now.toLocaleTimeString()
          );
        })
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

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes) => {
    const gb = bytes / 1024 / 1024 / 1024;

    return `${gb.toFixed(2)} GB`;
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
                  width: `${status.cpu}%`,
                  backgroundColor: getColor(status.cpu)
                }} />
            </div>
          </div>

          <div className="card">
            <h2>Memory Usage</h2>

            <p className="percent">{status.memory}%</p>

            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{
                  width: `${status.memory}%`,
                  backgroundColor: getColor(status.memory),
                }}
              />
            </div>
          </div>

          <div className="card">
            <h2>Storage Usage</h2>

            <p className="percent">{status.disk}%</p>

            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{
                  width: `${status.disk}%`,
                  backgroundColor: getColor(status.disk),
                }}
              />
            </div>
          </div>

          <div className="card">
            <h2>Uptime</h2>
            <p className="percent">{formatUptime(status.uptime)}</p>
          </div>

          <div className="card">
            <h2>Operating System</h2>

            <p className="percent">
              {status.os}
            </p>
          </div>

          <div className="card">
            <h2>Hostname</h2>

            <p className="percent">
              {status.hostname}
            </p>
          </div>

          <div className="card">
            <h2>IP Address</h2>

            <p className="percent">
              {status.local_ip}
            </p>
          </div>

          <div className="card">
            <h2>Download</h2>

            <p className="percent">
              {formatBytes(status.bytes_recv)}
            </p>
          </div>

          <div className="card">
            <h2>Upload</h2>

            <p className="percent">
              {formatBytes(status.bytes_sent)}
            </p>
          </div>

          <div className="card">
            <h2>Docker</h2>

            <p
              className="percent"
              style={{
                color:
                  status.docker_status === "Running"
                    ? "#4ade80"
                    : "#ef4444",
              }}
            >
              {status.docker_status}
            </p>
          </div>

          <div className="card">
            <h2>Last Updated</h2>

            <p className="percent">
              {lastUpdated}
            </p>
          </div>

          <div className="card">
            <h2>Disk Read</h2>

            <p className="percent">
              {status.disk_read} MB/s
            </p>
          </div>

          <div className="card">
            <h2>Disk Write</h2>

            <p className="percent">
              {status.disk_write} MB/s
            </p>
          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;