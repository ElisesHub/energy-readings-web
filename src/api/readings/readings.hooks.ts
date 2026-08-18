
import { useQuery } from "@tanstack/react-query";
import { ReadingSchema, ReadingsList } from "../readings/readings.schemas.ts";

const API_URL = "http://localhost:8000";
export function useReadingListQuery() {
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
export function useReadingDetailQuery(id: number) {
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