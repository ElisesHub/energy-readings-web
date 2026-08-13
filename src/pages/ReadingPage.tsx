import { useParams } from "react-router";
import { z } from "zod";
import { GetReading } from "../api/readings";

const Id = z.coerce.number().int().positive();
export default function ReadingPage()
{
    const { id } = useParams();
    const parsed = Id.safeParse(id);


    if (!parsed.success) return <p>Invalid reading id.</p>;

    const { isPending, error, data } = GetReading(parsed.data);

    if (isPending) return <p>Loading…</p>;
    if (error) return <p>An error has occurred: {error.message}</p>;

    return <div><h1>Reading {data.id}</h1></div>;

}