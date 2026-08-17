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
import NotFoundPage
    from "./pages/errors/NotFoundPage.tsx";
import DailyAggregatesPage from "./pages/DailyAggregatesPage.tsx";
import ReadingsPage from "./pages/ReadingsListPage.tsx";
import ReadingPage from "./pages/ReadingDetailPage.tsx";
import Layout from "./components/Layout.tsx";


const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <App/> },
            { path: '/readings', element: <ReadingsPage /> },
            { path: '/readings/:id', element: <ReadingPage /> },
            { path: '/dailyaggs', element: <DailyAggregatesPage /> },
            { path: '*', element: <NotFoundPage /> },
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

