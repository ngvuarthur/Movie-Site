import Home from "./Home";
import { createBrowserRouter } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import Towatchlist from "./towatchlist";
import Completedlist from "./Completedlist";
import Login from "./Login";
import { ProtectedRoute } from "../auth";

const routes = ([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "movies/:movieId",
        element: (
            <ProtectedRoute>
                <MovieDetail />
            </ProtectedRoute>
        ),
    },
    {
        path:"/to-watch",
        element: (
            <ProtectedRoute>
                <Towatchlist/>
            </ProtectedRoute>
        ),
    },
    {
        path:"/completed",
        element: (
            <ProtectedRoute>
                <Completedlist/>
            </ProtectedRoute>
        ),
    },
    {
        path:"/login",
        element: <Login/>,
    }
])

export default routes;