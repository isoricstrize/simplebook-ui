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
import Profile, { loader as profileLoader } from "./pages/Profile.jsx";
import Login, { action as loginAction } from "./pages/Login.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="books" element={<Books />} loader={booksLoader} />
      <Route path="profile" element={<Profile />} loader={profileLoader} />
      <Route path="login" element={<Login />} action={loginAction} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
