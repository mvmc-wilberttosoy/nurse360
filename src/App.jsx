import React from "react";
import { Routes, Route } from "react-router";

import Login from "./pages/login/Login";
import TermsOfUse from "./pages/legals/TermsOfUse";
import PrivacyPolicy from "./pages/legals/PrivacyPolicy";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Modules from './pages/modules/Modules';
import CourseDetails from './pages/course-details/CourseDetails';
import LessonDetail from "./pages/lesson-details/LessonDetails";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/dashboard" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="/dashboard/courses" element={<Modules />} />
          <Route path="/dashboard/courses/:courseId" element={<CourseDetails />} />
          <Route path="/dashboard/courses/:courseId/lesson/:lessonId" element={<LessonDetail />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default App;