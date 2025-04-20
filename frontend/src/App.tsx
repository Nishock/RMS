import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './theme';
import { Layout } from './components/Layout/Layout';
import { AIAssistant } from './components/AIAssistant/AIAssistant';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { AuthState, User, UserRole } from './types';
import * as authService from './services/auth.service';
import { DashboardOverview } from './components/Admin/Dashboard/DashboardOverview';
import { TeacherManagement } from './components/Admin/Teachers/TeacherManagement';
import { StudentManagement } from './components/Admin/Students/StudentManagement';
import { StudentDashboard } from './components/Student/Dashboard/StudentDashboard';
import { Quiz } from './components/Student/Quiz/Quiz';
import { Revise } from './components/Student/Revise/Revise';
import { Assignment } from './components/Student/Assignment/Assignment';
import { Script } from './components/Student/Script/Script';

const queryClient = new QueryClient();

// Separate component that uses Router hooks
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (!['admin', 'teacher', 'student'].includes(userData.role)) {
          return {
            user: null,
            token: null,
            isAuthenticated: false,
          };
        }
        return {
          user: userData as User,
          token,
          isAuthenticated: true,
        };
      } catch (error) {
        return {
          user: null,
          token: null,
          isAuthenticated: false,
        };
      }
    }
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  });

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    navigate('/login');
  }, [navigate]);

  React.useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.verifyToken(token);
          setAuth({
            user: response.user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          handleLogout();
        }
      }
    };

    verifyAuth();
  }, [handleLogout]);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
    role: UserRole;
    teacherId?: string;
    rollNumber?: string;
  }) => {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password,
        credentials.role,
        credentials.teacherId,
        credentials.rollNumber
      );
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setAuth({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });

      // Redirect based on role
      if (response.user.role === 'student') {
        navigate('/student/dashboard');
      } else if (response.user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleSignup = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    rollNumber?: string;
    teacherId?: string;
  }) => {
    try {
      const response = await authService.signup(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setAuth({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });
      
      // Redirect to login after successful signup
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {!auth.isAuthenticated ? (
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup onSignup={handleSignup} />}
          />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      ) : (
        <Layout user={auth.user} onLogout={handleLogout}>
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                auth.user?.role === 'admin' ? (
                  <Routes>
                    <Route path="dashboard" element={<DashboardOverview />} />
                    <Route path="teachers" element={<TeacherManagement />} />
                    <Route path="students" element={<StudentManagement />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                auth.user?.role === 'student' ? (
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="quiz" element={<Quiz />} />
                    <Route path="revise" element={<Revise />} />
                    <Route path="assignment" element={<Assignment />} />
                    <Route path="script" element={<Script />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Teacher Routes */}
            <Route
              path="/teacher/*"
              element={
                auth.user?.role === 'teacher' ? (
                  <Routes>
                    <Route path="dashboard" element={<div>Teacher Dashboard</div>} />
                    <Route path="ai-assistant" element={<AIAssistant user={auth.user} />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Default Route */}
            <Route
              path="*"
              element={
                auth.user?.role === 'student' ? (
                  <Navigate to="/student/dashboard" replace />
                ) : auth.user?.role === 'teacher' ? (
                  <Navigate to="/teacher/dashboard" replace />
                ) : (
                  <Navigate to="/admin/dashboard" replace />
                )
              }
            />
          </Routes>
        </Layout>
      )}
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
