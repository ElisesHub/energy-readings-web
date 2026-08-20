import {
    Area, AreaChart,
    CartesianGrid, Legend,
      Tooltip,
    XAxis, YAxis
} from "recharts";
import type {
    DailySummariesList
} from "../../../api/summaries/dailySummaries.schemas.ts";

export default function ConsumptionVsGenerationChart({data} : {data:DailySummariesList}) {
    return <>

        <h1>Used vs Generated</h1>
        <AreaChart data={data} height={500} width="100%" >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis
                dataKey="day"
                tickFormatter={(v) => new Date(v).toLocaleDateString("en-GB", {day : "2-digit", month:"short"})}
                textAnchor="start"
                height={90}
                angle={90}
            />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
                labelFormatter={(v) =>
                    typeof v === "string" || typeof v === "number"
                        ? new Date(v).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
                        : ""
                }
                formatter={(value, name) => [
                    `${typeof value === "number" ? value.toFixed(1) : value} kWh`,
                    name === "kwhGenerated" ? "Generated" : "Used",
                ]}
            />
            <Area type="monotone" dataKey="kwhGenerated" stroke="green" fill="#C9FFCB" />
            <Area type="monotone" dataKey="kwhConsumed" stroke="red" fill="#FFD3C9" />
            <Legend offset={200}/>
        </AreaChart>
    </>
}