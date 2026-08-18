import {z}  from 'zod'



export const ReadingTypeSchema = z.enum(["consumption", "generation"]);
export type ReadingType = z.infer<typeof ReadingTypeSchema>;

export const ReadingSchema = z.object({
    id: z.number().int(),
    meterId: z.string(),
    timestamp: z.string(),
    kwh: z.number(),
    readingType: ReadingTypeSchema,
});

export const ReadingsList = z.array(ReadingSchema);
export type Reading = z.infer<typeof ReadingSchema>


