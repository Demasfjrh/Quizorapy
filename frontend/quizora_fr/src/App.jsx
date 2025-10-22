import { RouterProvider, createMemoryRouter } from "react-router";
import Home from "./pages/home";

const router = createMemoryRouter([
  { path: "/", element: <Home /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
