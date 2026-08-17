import { Link } from "react-router-dom"
import { useReadingsQuery } from "../api/readings";

export default function ReadingsListPage() {

    const { isPending, error, data } = useReadingsQuery();

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    if (data.length === 0) return <p>No readings found.</p>

    return (

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
                <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-4 py-3 font-medium text-slate-600">Reading</th>
                    <th className="px-4 py-3 font-medium text-slate-600">Meter</th>
                    <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                    <th className="px-4 py-3 text-right font-medium text-slate-600">kWh</th>
                    <th className="px-4 py-3 font-medium text-slate-600">Type</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {data.map((r) => (
                    <tr key={r.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-4 py-3">
                            <Link
                                to={`/readings/${r.id}`}
                                className="font-medium text-blue-600 hover:underline"
                            >
                                {r.id}
                            </Link>
                        </td>
                        <td className="px-4 py-3 text-slate-700">{r.meterId}</td>
                        <td className="px-4 py-3 text-slate-500">
                            {new Date(r.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-900">
                            {r.kwh.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
            <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.readingType === "generation"
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-100 text-slate-700"
                }`}
            >
              {r.readingType}
            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}