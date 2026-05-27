import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../css/CpuPage.css";

// グラフ関係
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function CpuPage() {

    const [status, setStatus] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {

        const fetchStatus = () => {
            fetch("http://127.0.0.1:8000/status")
                .then((res) => res.json())
                .then((data) => {

                    // 現在ステータス更新
                    setStatus(data);

                    // 履歴追加
                    setHistory((prev) => {

                        const newHistory = [
                            ...prev,
                            {
                                time: new Date().toLocaleTimeString(),
                                cpu: data.cpu,
                            },
                        ];

                        // 直近30件だけ保持
                        return newHistory.slice(-30);
                    });

                })
                .catch((err) => console.error(err));
        };

        fetchStatus();

        const interval = setInterval(fetchStatus, 1000);

        return () => clearInterval(interval);

    }, []);

    if (!status) {
        return <p>Loading...</p>;
    }

    return (
        <div className="cpu-page">

            <Link to="/" className="back-button">
                ← Back
            </Link>

            <h1>CPU Details</h1>

            <p className="cpu-name">
                {status.cpu_name}
            </p>

            <div className="cpu-main-card">

                <h2>CPU Usage</h2>

                <p className="cpu-percent">
                    {status.cpu}%
                </p>

                <div className="bar-bg">

                    <div
                        className="bar-fill"
                        style={{
                            width: `${status.cpu}%`,
                            backgroundColor:
                                status.cpu < 50
                                    ? "#4ade80"
                                    : status.cpu < 80
                                        ? "#facc15"
                                        : "#ef4444"
                        }}
                    />

                </div>

            </div>

            <div className="cpu-info-grid">

                <div className="info-card">
                    <h3>Cores</h3>
                    <p>{status.cpu_cores}</p>
                </div>

                <div className="info-card">
                    <h3>Threads</h3>
                    <p>{status.cpu_threads}</p>
                </div>

                <div className="info-card">
                    <h3>Frequency</h3>

                    <p>
                        {Math.round(status.cpu_freq)} MHz
                    </p>
                </div>

            </div>

            <div className="chart-card">

                <h2>CPU History</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <LineChart data={history}>

                        <XAxis
                            dataKey="time"
                            tick={{
                                fill: "#aaa",
                                fontSize: 12
                            }}
                        />

                        <YAxis
                            domain={[0, 100]}
                            tick={{
                                fill: "#aaa"
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#2c2c2c",
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                            }}
                        />

                        <Line
                            type="linear"
                            dataKey="cpu"
                            stroke="#4ade80"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default CpuPage;