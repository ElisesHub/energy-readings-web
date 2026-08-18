import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import DailySummariesPage from "./pages/DailySummariesPage.tsx";
import ReadingsListPage from "./pages/ReadingsListPage.tsx";
import ReadingDetailPage from "./pages/ReadingDetail/ReadingDetailPage.tsx";
import Layout from "./components/Layout.tsx";
import RouteErrorPage
    from "./pages/errors/RouteErrorPage.tsx";
import {
    readingDetailLoader
} from "./pages/ReadingDetail/ReadingDetailPage.Loader.ts";


const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <RouteErrorPage />,   // Layout itself blew up — no chrome to keep
        children: [
            {
                // Pathless wrapper: errors from the routes below render *inside*
                // Layout, so the user keeps the nav and can click away.
                errorElement: <RouteErrorPage />,
                children: [
                    { index: true, element: <App /> },
                    { path: '/readings', element: <ReadingsListPage /> },
                    { path: '/readings/:id', element: <ReadingDetailPage />, loader: readingDetailLoader },
                    { path: '/dailyaggs', element: <DailySummariesPage /> },
                    { path: '*',
                        loader: () =>
                            {
                                throw new Response('Page Not Found', { status:404 })
                            },
                     },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
);

