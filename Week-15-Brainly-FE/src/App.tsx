
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Shared from "./pages/Shared";
import { Toaster } from "react-hot-toast";


function App() {
  
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<Shared />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
