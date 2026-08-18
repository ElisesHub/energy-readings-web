import {z} from "zod";

export const DailySummariesListSchema = z.object({
    day: z.string(),
    consumedKwh: z.number().nonnegative(),
    generatedKwh: z.number().nonnegative(),
    netImportKwh: z.number(),
});

export type DailySummariesList = z.infer<typeof DailySummariesListSchema>;