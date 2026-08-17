import {z}  from 'zod'
import { useQuery } from "@tanstack/react-query";
import { ReadingTypeSchema, type ReadingType  } from "./types.ts";

const API_URL = "http://localhost:8000";

export const ReadingSchema = z.object({
    id: z.number().int(),
    meterId: z.string(),
    timestamp: z.string(),
    kwh: z.number(),
    readingType: ReadingTypeSchema,
});

export const ReadingsList = z.array(ReadingSchema);
export type Reading = z.infer<typeof ReadingSchema>

export function useReadingsQuery() {
    return useQuery({
        queryKey: ['readings'],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/readings`,
            )
            if (!response.ok) {
                throw new Error(`Readings request failed: ${response.status}`)
            }
            return ReadingsList.parse(await response.json())
        },
    });
}
export function useReadingQuery(id: number) {
    return useQuery({
        queryKey: ["reading", id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/readings/${id}`);
            if (!response.ok) {
                throw new Error(`Reading request failed: ${response.status}`);
            }
            return ReadingSchema.parse(await response.json());
        },
        enabled: Number.isFinite(id),
    });
}

// export function useDailyAggregateQuery(
//     meterId: string,
//     readingType: ReadingType,
//     from: string,
//     to: string,
// ) {
//     const params = new URLSearchParams({
//         meter_id: meterId,
//         reading_type: readingType,
//         from,
//         to,
//     });
//
//     return useQuery({
//         queryKey: ["aggregates", "daily", meterId, readingType, from, to],
//         queryFn: async () => {
//             const response = await fetch(`${API_URL}/aggregates/daily?${params}`);
//             if (!response.ok) {
//                 throw new Error(`Daily aggregates request failed: ${response.status}`);
//             }
//             return DailyAggregatesList.parse(await response.json());
//         },
//         enabled: Boolean(meterId && from && to),
//     });
// }