import type {
    DailySummariesList
} from "../../../api/summaries/dailySummaries.schemas.ts";
import {
    Area,
    AreaChart,
    CartesianGrid, Legend, ReferenceLine, Tooltip,
    XAxis, YAxis
} from "recharts";


export default function DailyBenefitDeficitChart({data} : {data : DailySummariesList}) {

    const values = data.map((d) => d.kwhNetImport);
    const dataMax = Math.max(...values);
    const dataMin = Math.min(...values);

    const off =
        dataMax <= 0 ? 0
            : dataMin >= 0 ? 1
                : dataMax / (dataMax - dataMin);
    return <>
<h1>Daily benefit/deficit</h1>
        <AreaChart data={data} height={500} width="100%" >
            <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="#ccffcc" stopOpacity={0.8} />
                    <stop offset={off} stopColor="#ff8080" stopOpacity={0.8} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 1" />

            <XAxis
                dataKey="day"
                tickFormatter={(v) => new Date(v).toLocaleDateString("en-GB", {day : "2-digit", month:"short"})}
                textAnchor="start"
                height={90}
                angle={90}
            />
            <YAxis  />
            <ReferenceLine y={0} stroke="#006699" />
            <Tooltip labelFormatter={(v) =>
                typeof v === "string" || typeof v === "number"
                    ? new Date(v).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
                    : ""

            }
                     formatter={(value) => {
                         const n = typeof value === "number" ? value : 0;
                         const colour = n > 0 ? "#d9534f" : "#2e9e4f";
                         return [
                             <span style={{ color: colour }}>{n > 0 ? "Net import: " : "Net export"}{n.toFixed(1)} kWh</span>,
                         ];
                     }}
            />

            <Area
                type="monotone"
                dataKey="kwhNetImport"
                baseValue={0}
                stroke="#d1d1e0"
                fill="url(#splitColor)"
            />

            <Legend offset={200}/>

        </AreaChart>
    </>
}
