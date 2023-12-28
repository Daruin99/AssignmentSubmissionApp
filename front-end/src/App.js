import { Route, Routes } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "./DashBoard";
import Login from "./Login";
import AssignmentView from "./AssignmentsView";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./CodeReviewerAssignmentView";

// Create a context for isEditing at the top level of your application.
export const IsEditingContext = createContext();


function App() {
  // Create a state variable for isEditing.
  const isEditingState = useState(false);
  const [roles, setRoles] = useState([]);

  let jwt = localStorage.getItem("jwt");

  useEffect(() => {
    console.log(jwt)
    setRoles(getRolesFromJWT());
  }, [jwt]);
  
  function getRolesFromJWT() {
    if (jwt) {
      try {
        const decodedJwt = jwtDecode(jwt);
        return decodedJwt.authorities;
      } catch (e) {
        console.error(e);
      }
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
            roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
              <PrivateRoute key="assignment-rev">
                <CodeReviewerAssignmentView />
              </PrivateRoute>
            ) : (
              <PrivateRoute key="assignment">
                <AssignmentView />
              </PrivateRoute>
            )
          }
        ></Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </IsEditingContext.Provider>
  );
}

export default App;
