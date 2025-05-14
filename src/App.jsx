import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilesPage from "./profiles/page";
import Home from "./page";
import AdminPage from "./admin/page";
import ProfileDetailPage from "./profiles/[id]/page";

const router = createBrowserRouter([
  {
    path: "/ProfileMap/",
    element: <Home />,
  },
  {
    path: "/ProfileMap/profiles",
    element: <ProfilesPage />,
  },
  {
    path: "/ProfileMap/profiles/:id", 
    element: <ProfileDetailPage />,
  },
  {
    path: "/ProfileMap/admin",
    element: <AdminPage />,
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
