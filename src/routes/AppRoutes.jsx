import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import AttendanceForm from "../pages/Attendanceform";
import DostNotExists from "../pages/404-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/attendance" element={<AttendanceForm />} />
      <Route path="*" element={<DostNotExists />} />
    </Routes>
  );
};

export default AppRoutes;