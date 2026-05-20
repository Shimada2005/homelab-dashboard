import { useEffect, useState } from "react";
import "./Dashboard.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const [status, setStatus] = useState(null);
const [lastUpdated, setLastUpdated] = useState("");
const navigate = useNavigate();

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

const getColor = (value) => {
    if (value < 50) return "#4ade80";
    if (value < 80) return "#facc15";
    return "#ef4444";
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

        <Card title="CPU Usage" onClick={() => navigate("/cpu")}>
            <p className="percent">{status.cpu}%</p>

            <div className="bar-bg">
            <div
                className="bar-fill"
                style={{
                width: `${status.cpu}%`,
                backgroundColor: getColor(status.cpu),
                }}
            />
            </div>
        </Card>

        <Card title="Memory Usage">
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
        </Card>

        <Card title="Storage Usage">
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
        </Card>

        <Card title="Uptime">
            <p className="percent">
            {formatUptime(status.uptime)}
            </p>
        </Card>

        <Card title="Operating System">
            <p className="percent">
            {status.os}
            </p>
        </Card>

        <Card title="Hostname">
            <p className="percent">
            {status.hostname}
            </p>
        </Card>

        <Card title="IP Address">
            <p className="percent">
            {status.local_ip}
            </p>
        </Card>

        <Card title="Download">
            <p className="percent">
            {formatBytes(status.bytes_recv)}
            </p>
        </Card>

        <Card title="Upload">
            <p className="percent">
            {formatBytes(status.bytes_sent)}
            </p>
        </Card>

        <Card title="Docker">
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
        </Card>

        <Card title="Last Updated">
            <p className="percent">
            {lastUpdated}
            </p>
        </Card>

        <Card title="Disk Read">
            <p className="percent">
            {status.disk_read} MB/s
            </p>
        </Card>

        <Card title="Disk Write">
            <p className="percent">
            {status.disk_write} MB/s
            </p>
        </Card>

        </div>
    ) : (
        <p>Loading...</p>
    )}
    </div>
);
}

export default Dashboard;