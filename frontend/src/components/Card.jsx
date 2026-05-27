import "../css/Card.css";

function Card({ title, children, onClick }) {
    return (
        <div 
            className="card"
            onClick={onClick}
        >
        <h2>{title}</h2>

        {children}
        </div>
    );
    }

    export default Card;