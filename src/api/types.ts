import {z} from "zod";

export const ReadingTypeSchema = z.enum(["consumption", "generation"]);
export type ReadingType = z.infer<typeof ReadingTypeSchema>;