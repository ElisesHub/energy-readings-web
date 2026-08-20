import {
    CartesianGrid, Legend, Line,
    LineChart, Tooltip,
    XAxis, YAxis
} from "recharts";
import type {
    DailySummariesList
} from "../../../api/summaries/dailySummaries.schemas.ts";

export default function GenerationChart({data} : {data: DailySummariesList}) {
    return <>

<h1>Kwh Generated</h1>
    <LineChart data={data} height={500} width="100%" >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
            dataKey="day"
            tickFormatter={(v) => new Date(v).toLocaleDateString("en-GB", {day : "2-digit", month:"short"})}
            textAnchor="start"
            height={90}
            angle={90}
        />
        <YAxis domain={['dataMin - 5', 'dataMax + 5']} width="auto" />
        <Tooltip
            labelFormatter={(v) =>
                typeof v === "string" || typeof v === "number"
                    ? new Date(v).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
                    : ""

            }
            formatter={(value) => typeof value === "number" ? [`${value.toFixed(1)} kWh`, "Consumption"] : ""}
        />
        <Line type="monotone" dataKey="kwhGenerated" />
        <Legend offset={200}/>
    </LineChart>
    </>
}