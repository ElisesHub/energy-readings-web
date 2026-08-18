import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

type ErrorView = {
    statusCode: string;
    heading: string;
    detail: string;
    canRetry: boolean;
};

function toErrorView(error: unknown): ErrorView {
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return {
                statusCode: "404",
                heading: "That page isn't here",
                detail: "The address doesn't match any page in this app. Check the link, or start again from the home page.",

                canRetry: false,
            };
        }

        return {
            statusCode: String(error.status),
            heading: error.statusText || "The request was rejected",
            // Loaders throw `new Response(message, { status })`, so `data` is
            // usually the string you wrote. Anything else, don't render it.
            detail:
                typeof error.data === "string" && error.data.length > 0
                    ? error.data
                    : "Check the address and try a different link.",

            canRetry: error.status >= 500 || error.status === 408 || error.status === 429,
        };
    }

    // Unexpected exception. Keep the public message generic.
    return {
        statusCode: "ERR",
        heading: "Something broke on this page",
        detail: "The page stopped while it was loading. Reloading often clears it.",
        canRetry: true,
    };
}





export default function RouteErrorPage() {
    // Gives you whatever was thrown — from a loader, or from a crash
    // during render. This is the router's equivalent of a catch block.
    const error = useRouteError();
    const { statusCode, heading, detail, canRetry } = toErrorView(error);

    return (
        <div
            className="mx-auto flex max-w-md flex-col items-start px-4 py-20 text-left"
            role="alert"
            aria-labelledby="route-error-heading"
        >

            <p className=" font-mono text-slate-400">
                {statusCode}
            </p>

            <h1
                className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900"
                id="route-error-heading"
            >
                {heading}
            </h1>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{detail}</p>

            <div className="mt-7 flex flex-wrap gap-2.5">
                <Link
                    className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                    to="/"
                >
                    Go to the home page
                </Link>

                {canRetry && (
                    <button
                        className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                        onClick={() => window.location.reload()}
                        type="button"
                    >
                        Reload this page
                    </button>
                )}
            </div>
        </div>
    );
}