import "./CpuPage.css";

function CpuPage() {
return (
    <div className="cpu-page">
    <h1>CPU Details</h1>

    <div className="cpu-grid">

        <div className="cpu-card">
        <h2>Usage</h2>
        <p>34%</p>
        </div>

        <div className="cpu-card">
        <h2>Cores</h2>
        <p>8</p>
        </div>

        <div className="cpu-card">
        <h2>Frequency</h2>
        <p>3.2 GHz</p>
        </div>

    </div>
    </div>
);
}

export default CpuPage;