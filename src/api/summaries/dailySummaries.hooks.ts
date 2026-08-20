
import {useQuery} from "@tanstack/react-query";
import { DailySummariesListSchema } from "./dailySummaries.schemas.ts"
const API_URL = "http://localhost:8000";


export function useDailySummariesQuery(
    meterId: string,
    from: string,
    to: string,
) {
    const params = new URLSearchParams({
        meter_id: meterId,
        from,
        to,
    });

    return useQuery({
        queryKey: ["summaries", "daily", meterId, from, to],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/summaries/daily?${params}`);
            if (!response.ok) {
                throw new Error(`Daily summaries request failed: ${response.status}`);
            }
            return DailySummariesListSchema.parse(await response.json());
        },
        enabled: Boolean(meterId && from && to),
    });
}