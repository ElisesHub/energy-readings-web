import {useState, useEffect} from "react";
import {
    getReadings,
    type Reading
} from "./api/readings";

export default function App() {
    const [readings, setReadings] = useState<Reading[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getReadings()
            .then(setReadings)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <p>Loading…</p>;
    if (error) return <p>Something went wrong
        here: {error.message}</p>;
    if (readings.length === 0) return <p>No
        readings found.</p>;

    return (
        <table>
            <thead>
            <tr>
                <th>Reading</th>
                <th>Meter</th>
                <th>Date</th>
                <th>kWh</th>
                <th>Type</th>
            </tr>
            </thead>
            <tbody>
            {readings.map((r) => (
                <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.meter_id}</td>
                    <td>{r.timestamp}</td>
                    <td>{r.kwh}</td>
                    <td>{r.reading_type}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}