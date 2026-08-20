import { Link } from "react-router-dom"

export default function App() {
    return (
        <div>
            <h1>Welcome</h1>
            <h3>Where would you like to go?</h3>
            <div className="flex flex-row">
                <Link to="/summaries/daily">Daily Aggregates</Link>
                <Link to="/readings">Readings</Link>
            </div>
        </div>
    );
}