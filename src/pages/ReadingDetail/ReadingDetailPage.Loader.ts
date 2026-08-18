import type { LoaderFunctionArgs } from "react-router-dom";
import {z} from "zod";

const IdSchema = z.coerce.number().int().positive();

export async function readingDetailLoader({ params }: LoaderFunctionArgs) {

    // params.id is whatever was in the URL slot, typed string | undefined.
    const parsed = IdSchema.safeParse(params.id);

    if (!parsed.success) {
        // Throwing a Response is React Router's signal for "stop here".
        // It abandons the navigation, skips the component entirely, and
        // renders errorElement instead. This replaces the
        // `if (!parsed.success) return <p>Invalid</p>` you had before.
        throw new Response("Invalid reading id", { status: 400 });
    }

    // Returned data becomes available to the component.
    // parsed.data is a validated number.
    return { id: parsed.data };
}