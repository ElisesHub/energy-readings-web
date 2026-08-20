import {z} from "zod";
import {
    zodResolver
} from "@hookform/resolvers/zod";
import {
    type SubmitHandler,
    useForm
} from "react-hook-form";
import {
    chartViewsSchema,
    chartViewLabels
} from "../../api/summaries/dailySummaries.schemas.ts";
import ConsumptionChart
    from "./VisualisationTypes/ConsumptionChart.tsx";
import GenerationChart
    from "./VisualisationTypes/GenerationChart.tsx";
import ConsumptionVsGenerationChart
    from "./VisualisationTypes/ConsumptionVsGenerationChart.tsx";
import DailyBenefitDeficitChart
    from "./VisualisationTypes/DailyBenefitDeficitChart.tsx";
import {useState} from "react";
import {
    useDailySummariesQuery
} from "../../api/summaries/dailySummaries.hooks.ts";



const FormSchema = z.object({
    meterId: z.string().trim().min(1, "Meter Id is required"),
    from: z.string(),
    to: z.string(),
    chartView: chartViewsSchema,
});
type DailySummariesForm = z.infer<typeof FormSchema>;


export default function DailySummariesPage() {


    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    const toInput = (d: Date) => d.toISOString().slice(0, 10);

    const {
        register,
        handleSubmit, watch,
        formState: {errors, isSubmitting}
    } = useForm<DailySummariesForm>(
        {
            resolver: zodResolver(FormSchema),
            defaultValues: {
                chartView: "consumption",
                from: toInput(monthAgo),
                to: toInput(today),
            }
        }
    );

    const chartView = watch("chartView");
    // once the fields are valid, it calls this onSubmit function
    const [submitted, setSubmitted] = useState<DailySummariesForm | null>(null);

     const { data, isFetching, isError, error } = useDailySummariesQuery(
        submitted?.meterId ?? "",
        submitted?.from ?? "",
        submitted?.to ?? "",
    );

    const onSubmit: SubmitHandler<DailySummariesForm> = (form) => setSubmitted(form);

    return <>

        <div>

            <h6 className="-mt-2 mb-2 ">  / Daily summaries</h6>
            <form
                className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4"
                onSubmit={handleSubmit(onSubmit, (errs) => console.log("INVALID", errs))}
            >

                <div
                    className="flex flex-col gap-1">
                    <label htmlFor="meterId"
                           className="text-xs font-medium text-slate-600  text-left">Meter
                        ID</label>
                    <input {...register("meterId")}
                           id="meterId"
                           type="text"
                           placeholder="Meter ID"
                           className="h-9 w-40 rounded-md border border-slate-300 px-3 text-sm"/>
                    {errors.meterId && <div
                        className="text-xs text-red-500">{errors.meterId.message}</div>}
                </div>

                {/*<div className="flex flex-col gap-1">*/}
                {/*    <label htmlFor="readingType" className="text-xs font-medium text-slate-600  text-left">Reading type</label>*/}
                {/*    <select {...register("readingType")} id="readingType" className="h-9 w-40 appearance-none rounded-md border border-slate-300 bg-white px-3 text-sm">*/}
                {/*        {ReadingTypeSchema.options.map((value) => (*/}
                {/*            <option key={value} value={value}>{ReadingTypeLabels[value]}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*    {errors.readingType && <div className="text-xs text-red-500">{errors.readingType.message}</div>}*/}
                {/*</div>*/}

                <div
                    className="flex flex-col gap-1">
                    <label htmlFor="ChartView"
                           className="text-xs font-medium text-slate-600 text-left">Chart
                        type</label>
                    <select {...register("chartView")}
                            id="ChartView"
                            className="h-9 w-56 appearance-none rounded-md border border-slate-300 bg-white px-3 text-sm">
                        {chartViewsSchema.options.map((value) => (
                            <option key={value}
                                    value={value}>{chartViewLabels[value]}</option>
                        ))}
                    </select>
                    {errors.chartView && <div
                        className="text-xs text-red-500">{errors.chartView.message}</div>}
                </div>

                <div
                    className="flex flex-col gap-1">
                    <label htmlFor="from"
                           className="text-xs font-medium text-slate-600  text-left">From</label>
                    <input {...register("from")}
                           id="from" type="date"
                           className="h-9 rounded-md border border-slate-300 px-3 text-sm"/>
                    {errors.from && <div
                        className="text-xs text-red-500">{errors.from.message}</div>}
                </div>

                <div
                    className="flex flex-col gap-1">
                    <label htmlFor="to"
                           className="text-xs font-medium text-slate-600  text-left">To</label>
                    <input {...register("to")}
                           id="to" type="date"
                           className="h-9 rounded-md border border-slate-300 px-3 text-sm"/>
                    {errors.to && <div
                        className="text-xs text-red-500">{errors.to.message}</div>}
                </div>

                <button disabled={isSubmitting}
                        type="submit"
                        className="ml-auto h-9 rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>

                {errors.root && <div
                    className="w-full text-sm text-red-500">{errors.root.message}</div>}
            </form>
            {isError && <div className="text-sm text-red-500">{String(error)}</div>}

            {isFetching && <div className="text-sm text-slate-500">Loading…</div>}
            {
                data && (
                    chartView === "consumption" ? (
                            <ConsumptionChart data={data}/>
                        ) :

                        chartView === "generation" ?
                            (
                                <GenerationChart data={data}></GenerationChart>
                            )
                            :
                            chartView === "consumption_vs_generation" ?
                                (
                                    <ConsumptionVsGenerationChart data={data}></ConsumptionVsGenerationChart>
                                )
                                :
                                chartView === "daily_benefit_deficit" ?
                                    (
                                        <DailyBenefitDeficitChart  data={data}></DailyBenefitDeficitChart>
                                    )
                                    :
                                    <>No matching chart found</>
                )
            }

        </div>


    </>
}