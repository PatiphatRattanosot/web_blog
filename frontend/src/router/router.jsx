import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Register from "../pages/Register";
import Layout from "../components/Layout";
import NotAllow from "../pages/NotAllow";
import OwnerOnly from "../components/OwnerOnly";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }, {
                path: '/edit/:id',
                element: <OwnerOnly><Edit></Edit></OwnerOnly>
            }, {
                path: '/create',
                element: <Create></Create>
            }, {
                path: '/post/:id',
                element: <PostDetail></PostDetail>
            }, {
                path: '/sign-in',
                element: <Login></Login>
            }, {
                path: '/sign-up',
                element: <Register></Register>
            }, {
                path: "/notallow",
                element: <NotAllow></NotAllow>
            }
        ]
    }
])

export default router