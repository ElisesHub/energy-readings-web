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




    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Reading ID: {data.id}
            </h1>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm">
                <dt className="text-slate-500">Meter</dt>
                <dd className="font-medium text-slate-900">{data.meterId}</dd>

                <dt className="text-slate-500">Timestamp</dt>
                <dd className="font-medium text-slate-900">
                    {new Date(data.timestamp).toLocaleString()}
                </dd>

                <dt className="text-slate-500">Type</dt>
                <dd>
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                            data.readingType === "generation"
                                ? "bg-green-100 text-green-800"
                                : "bg-slate-100 text-slate-700"
                        }`}
                    >
                        {data.readingType}
                    </span>
                </dd>

                <dt className="text-slate-500">Energy</dt>
                <dd className="font-medium text-slate-900">
                    {data.kwh.toLocaleString(undefined, { maximumFractionDigits: 3 })} kWh
                </dd>
            </dl>
        </div>
    );








}