import React from "react";
import { Routes, Route } from "react-router";

import Login from "./pages/login/Login";
import TermsOfUse from "./pages/legals/TermsOfUse";
import PrivacyPolicy from "./pages/legals/PrivacyPolicy";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.Fragment>
  )
}

export default App;