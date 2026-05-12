import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthCallback from './pages/AuthCallback'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './pages/DashboardLayout'
import DashboardOverview from './pages/DashboardOverview'
import CompilerPage from './pages/CompilerPage'
import NotesPage from './pages/NotesPage'
import AptitudePage from './pages/AptitudePage'
import PatternsPage from './pages/PatternsPage'
import CompaniesPage from './pages/CompaniesPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login"         element={<LoginPage />} />
      <Route path="/register"      element={<RegisterPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Dashboard — all children require auth */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index              element={<DashboardOverview />} />
        <Route path="companies"  element={<CompaniesPage />} />
        <Route path="patterns"   element={<PatternsPage />} />
        <Route path="compiler"   element={<CompilerPage />} />
        <Route path="notes"      element={<NotesPage />} />
        <Route path="aptitude"   element={<AptitudePage />} />
        <Route path="profile"    element={<ProfilePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
