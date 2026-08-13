import {z}  from 'zod'
import { useQuery } from "@tanstack/react-query";
export const ReadingSchema = z.object({
    id: z.number().int(),
    meterId: z.string(),
    timestamp: z.string(),
    kwh: z.number(),
    readingType: z.enum(["consumption", "generation"]),
});

export const ReadingsList = z.array(ReadingSchema);
export type Reading = z.infer<typeof ReadingSchema>

export function GetReadings() {
    return useQuery({
        queryKey: ['readings'],
        queryFn: async () => {
            const response = await fetch(
                'http://localhost:8000/readings',
            )
            if (!response.ok) {
                throw new Error(`Readings request failed: ${response.status}`)
            }
            return ReadingsList.parse(await response.json())
        },
    });
}








