import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter ,RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
    const router = createBrowserRouter([
        { path: '/', element: <App/>,
            errorElement : <div><h1>404 not found</h1><br/><br/>We didn't find what you were looking for </div>
        },
        { path: '/test', element: <div><br/><br/><h1>Yay!</h1> <br/><br/><h2>You found something</h2><br/><br/><p>And it's awesome </p></div>,
            errorElement : <div><h1>404 not found</h1><br/><br/>We didn't find what you were looking for </div>
        }
    ]);

 ReactDOM.createRoot(document.getElementById('root')!).render
 (
     <React.StrictMode>
         <RouterProvider router={router}/>
     </React.StrictMode>,
 );

