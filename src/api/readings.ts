// src/api/readings.ts
export type Reading = {
    id: number;
    meter_id: string;
    timestamp: string;
    kwh: number;
    reading_type: "consumption" | "generation";
};

export async function getReadings(): Promise<Reading[]> {
    const response = await fetch("http://localhost:8000/readings");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}