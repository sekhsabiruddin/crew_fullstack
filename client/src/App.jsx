import "tailwindcss/tailwind.css";
import Home from "./components/Home/Home";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";
import Singup from "./components/Singup/Singup";
import Index from "./components/Home/index";
import { ToastContainer } from "react-toastify";
import { HashRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Routes/ProtectedRoute";
function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/task"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </HashRouter>
    </div>
  );
}

export default App;
