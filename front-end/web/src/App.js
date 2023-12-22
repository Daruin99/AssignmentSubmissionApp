import { Route, Routes } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "./DashBoard";
import Login from "./Login";
import AssignmentView from "./AssignmentsView";
import CodeReviewerDashboard from "./CodeReviewerDashboard";

// Create a context for isEditing at the top level of your application.
export const IsEditingContext = createContext();


function App() {
  // Create a state variable for isEditing.
  const isEditingState = useState(false);
  const [roles, setRoles] = useState([]);

  let jwt = localStorage.getItem("jwt");

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [jwt]);

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <IsEditingContext.Provider value={isEditingState}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
              <PrivateRoute key="rev-dashboard">
                <CodeReviewerDashboard />
              </PrivateRoute>
            ) : (
              <PrivateRoute key="dashboard">
                <DashBoard />
              </PrivateRoute>
            )
          }
        ></Route>

        <Route
          path="/assignments/:assignmentId"
          element={
            <PrivateRoute key="assignments">
              <AssignmentView />
            </PrivateRoute>
          }
        ></Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </IsEditingContext.Provider>
  );
}

export default App;
