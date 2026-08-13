
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

const DailyAggregatesFromSchema = z.object({
    meterId: z.string(),
    readingType: z.enum(["consumption", "generation"]),
    from: z.string(),
    to: z.string()
});
type DailyAggregatesForm = z.infer<typeof DailyAggregatesFromSchema>;

export default function DailyAggregatesPage()
{
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    const toInput = (d: Date) => d.toISOString().slice(0, 10);

    const {register, handleSubmit}  = useForm<DailyAggregatesForm>(
        {
            resolver: zodResolver(DailyAggregatesFromSchema),
            defaultValues: {
                readingType: "consumption",
                from: toInput(monthAgo),
                to: toInput(today),
            }
        }
    );


    function HandleSubmit(data: DailyAggregatesForm)
    {
        const result = DailyAggregatesFromSchema.safeParse(data);
        if(result.success)
        {
            // handle success
        }
        else
        {
            // handle error
        }
    }
const onSubmit : SubmitHandler = (data: DailyAggregatesForm) => {console.log(data);};

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Daily Aggregates Page</h1>
            <form className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit(onSubmit, (errs) => console.log("INVALID", errs))}>
                <input {...register("meterId")} type="text" placeholder="Meter ID" className="h-9 w-40 rounded-md border border-slate-300 px-3 text-sm" />
                <select {...register("readingType")} className="h-9 w-40 appearance-none rounded-md border border-slate-300 bg-white px-3 text-sm" >
                    <option value="consumption">Consumption</option>
                    <option value="generation">Generation</option>
                </select>
                <input {...register("from")} type="date" placeholder="From" className="h-9 rounded-md border border-slate-300 px-3 text-sm" />
                <input {...register("to")} type="date" placeholder="To" className="h-9 rounded-md border border-slate-300 px-3 text-sm" />
                <button type="submit" className="ml-auto h-9 rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">Submit</button>
            </form>
        </div>

    );
}