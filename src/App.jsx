import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import RedirectRoute from './Components/RedirectRoute';
import ContentScheduling from './pages/ContentScheduling';
import Analytics from './pages/Analytics';
import TeamCollaboration from './pages/TeamCollaboration';
import Contact from './pages/Contact';
import ContentManagement from './pages/ContenManagement';
import Team from './pages/Team';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Inbox from './pages/Inbox';

function App() {
  return (
    <GoogleOAuthProvider clientId="161841218791-6rgpmnm1inblhi5bk0gvvntn0ulku4mr.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="features" element={<Features />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="/solutions/content-scheduling" element={<ContentScheduling />} />
              <Route path="/solutions/analytics" element={<Analytics />} />
              <Route path="/solutions/team-collaboration" element={<TeamCollaboration />} />
              <Route path="/contact" element={<Contact />} />
         

            
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/content-management" element={<ContentManagement/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team/>} />
                <Route path="/statistics" element={<Statistics/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/inbox" element={<Inbox />} />

              </Route>
            <Route path="/login" element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            } />
            <Route path="/get-started" element={<Signup />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;