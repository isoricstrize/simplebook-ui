import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import Books, { loader as booksLoader } from "./pages/Books.jsx";
import Profile from "./pages/Profile.jsx";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Login.jsx";
import Register, { action as registerAction } from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import Error from "./components/Error.jsx";
import { requireAuth } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} errorElement={<Error />} />
      <Route
        path="books"
        element={<Books />}
        errorElement={<Error />}
        loader={booksLoader}
      />
      <Route
        path="profile"
        element={<Profile />}
        errorElement={<Error />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="login"
        element={<Login />}
        errorElement={<Error />}
        action={loginAction}
        loader={loginLoader}
      />
      <Route
        path="register"
        element={<Register />}
        errorElement={<Error />}
        action={registerAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
