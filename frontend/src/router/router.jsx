import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Register from "../pages/Register";
import Layout from "../components/Layout";


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
                element: <Edit></Edit>
            }, {
                path: '/create',
                element: <Create></Create>
            }, {
                path: '/post/:id',
                element: <PostDetail></PostDetail>
            }, {
                path: '/sign-up',
                element: <Login></Login>
            }, {
                path: 'sign-in',
                element: <Register></Register>
            }
        ]
    }
])

export default router