import "./App.css"
import { Route, Routes, Navigate } from "react-router"
import Login from "./pages/Login"
import Admin from "./pages/admin/Admin"
import User from "./pages/user/User"
import MennageAgents from "./pages/admin/MennageAgents"
import WatchReports from "./pages/reportsPages/WatchReports"
import SendReport from "./pages/reportsPages/SendReport"
import SendCsv from "./pages/reportsPages/SendCsv"
import PrivetComponent from "./components/PrivetComponent"

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Catch-all → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      {/* Admin-only routes */}
      <Route path="/admin" element={
        <PrivetComponent role="admin"><Admin /></PrivetComponent>
      } />
      <Route path="/admin/mennageagents" element={
        <PrivetComponent role="admin"><MennageAgents /></PrivetComponent>
      } />

      {/* Shared protected routes (both roles) */}
      <Route path="/user" element={
        <PrivetComponent><User /></PrivetComponent>
      } />
      <Route path="/reports" element={
        <PrivetComponent><WatchReports /></PrivetComponent>
      } />
      <Route path="/sendreport" element={
        <PrivetComponent><SendReport /></PrivetComponent>
      } />
      <Route path="/sendcsv" element={
        <PrivetComponent><SendCsv /></PrivetComponent>
      } />
    </Routes>
  )
}

export default App
