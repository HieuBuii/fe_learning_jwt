import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import routerConfigs from "./routes/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={createBrowserRouter(routerConfigs)} />
      <ToastContainer />
    </>
  );
}

export default App;
