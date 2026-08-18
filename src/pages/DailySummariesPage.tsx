
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

const FormSchema = z.object({
    meterId: z.string().trim().min(1, "Meter Id is required"),
    readingType: z.enum(["consumption", "generation"], "Value not recognised"),
    from: z.string(),
    to: z.string()
});
type DailySummariesForm = z.infer<typeof FormSchema>;

export default function DailySummariesPage()
{
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    const toInput = (d: Date) => d.toISOString().slice(0, 10);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
        }  = useForm<DailySummariesForm>(
                {
                    resolver: zodResolver(FormSchema),
                    defaultValues: {
                        readingType: "consumption",
                        from: toInput(monthAgo),
                        to: toInput(today),
                    }
                }
            );



    // once the fields are valid, it calls this onSubmit function
const onSubmit : SubmitHandler<DailySummariesForm> = async (data: DailySummariesForm) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log(data);
        }
        catch
        {
            setError("root", { message:"An error occurred - the form could not be submitted"});
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Daily Aggregates Page</h1>
            <form className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit(onSubmit, (errs) => console.log("INVALID", errs))}>
                <input {...register("meterId")} type="text" placeholder="Meter ID" className="h-9 w-40 rounded-md border border-slate-300 px-3 text-sm" />
                {errors.meterId && <div className="text-red-500">{errors.meterId.message}</div>}
                <select {...register("readingType")} className="h-9 w-40 appearance-none rounded-md border border-slate-300 bg-white px-3 text-sm" >
                    <option value="consumption">Consumption</option>
                    <option value="generation">Generation</option>
                </select>
                {errors.readingType && <div className="text-red-500">{errors.readingType.message}</div>}
                <input {...register("from")} type="date" placeholder="From" className="h-9 rounded-md border border-slate-300 px-3 text-sm" />
                {errors.from && <div className="text-red-500">{errors.from.message}</div>}
                <input {...register("to")} type="date" placeholder="To" className="h-9 rounded-md border border-slate-300 px-3 text-sm" />
                {errors.to && <div className="text-red-500">{errors.to.message}</div>}
                <button disabled={isSubmitting} type="submit" className="ml-auto h-9 rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">{isSubmitting ? "Loading..." : "Submit"}</button>
                {errors.root && <div className="text-red-500">{errors.root.message}</div>}
            </form>
        </div>

    );
}