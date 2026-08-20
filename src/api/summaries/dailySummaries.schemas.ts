import {z} from "zod";


export const chartViewsSchema = z.enum(["consumption", "generation", "consumption_vs_generation", "daily_benefit_deficit"]);
export type chartView = z.infer<typeof chartViewsSchema>;

export const chartViewLabels: Record<chartView, string> = {
    consumption: "Consumption",
    generation: "Generation",
    consumption_vs_generation: "Consumption vs generation",
    daily_benefit_deficit: "Daily benefit / deficit",
};


export const DailySummarySchema = z.object({
    day: z.string(),
    kwhConsumed: z.number().nonnegative(),
    kwhGenerated: z.number().nonnegative(),
    kwhNetImport: z.number()
});
export type DailySummary = z.infer<typeof DailySummarySchema>;

export const DailySummariesListSchema = z.array(DailySummarySchema);
export type DailySummariesList = z.infer<typeof DailySummariesListSchema>;