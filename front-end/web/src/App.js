import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "./DashBoard";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      ></Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
