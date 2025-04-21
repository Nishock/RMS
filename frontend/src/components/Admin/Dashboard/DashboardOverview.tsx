import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  Container,
  Fade,
  keyframes,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import * as Recharts from 'recharts';
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} = Recharts;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.2); }
  50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.4); }
  100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.2); }
`;

// Sample data - replace with actual API data
const studentTrends = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 75 },
  { month: 'Mar', count: 85 },
  { month: 'Apr', count: 95 },
  { month: 'May', count: 110 },
  { month: 'Jun', count: 125 },
];

const courseDistribution = [
  { name: 'Computer Science', value: 400 },
  { name: 'Engineering', value: 300 },
  { name: 'Business', value: 200 },
  { name: 'Arts', value: 100 },
];

const teachersByDepartment = [
  { department: 'Computer Science', count: 15 },
  { department: 'Engineering', count: 12 },
  { department: 'Business', count: 8 },
  { department: 'Arts', count: 6 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'];

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  trend?: string;
}

const StatCard = ({ title, value, icon, gradient, trend }: StatCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        background: gradient,
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          '&::before': {
            opacity: 1,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5, fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
              {value}
            </Typography>
            {trend && (
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                {trend}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const DashboardOverview = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      color: '#fff',
      py: 6,
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Fade in timeout={1000}>
          <Box sx={{ 
            mb: 6,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200%',
              height: '300px',
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0) 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }
          }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Monitor your institution's performance and manage resources effectively
            </Typography>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1000}>
              <Box>
                <StatCard
                  title="Total Students"
                  value="1,234"
                  icon={<SchoolIcon sx={{ fontSize: 32, color: '#fff' }} />}
                  gradient="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                  trend="+12% from last month"
                />
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1200}>
              <Box>
                <StatCard
                  title="Total Teachers"
                  value="89"
                  icon={<PeopleIcon sx={{ fontSize: 32, color: '#fff' }} />}
                  gradient="linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)"
                  trend="+5% from last month"
                />
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1400}>
              <Box>
                <StatCard
                  title="Active Users"
                  value="892"
                  icon={<PersonIcon sx={{ fontSize: 32, color: '#fff' }} />}
                  gradient="linear-gradient(135deg, #EC4899 0%, #BE185D 100%)"
                  trend="+18% from last month"
                />
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1600}>
              <Box>
                <StatCard
                  title="Growth Rate"
                  value="12.5%"
                  icon={<TrendingUpIcon sx={{ fontSize: 32, color: '#fff' }} />}
                  gradient="linear-gradient(135deg, #10B981 0%, #047857 100%)"
                  trend="2.3% increase"
                />
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={4}>
          {/* Student Trends Line Chart */}
          <Grid item xs={12} md={8}>
            <Fade in timeout={1800}>
              <Card sx={{ 
                height: '400px',
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                p: 3,
              }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 3, fontWeight: 600 }}>
                  Student Enrollment Trends
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.7)"
                      tick={{ fill: 'rgba(255,255,255,0.7)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.7)"
                      tick={{ fill: 'rgba(255,255,255,0.7)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#8B5CF6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Fade>
          </Grid>

          {/* Course Distribution Pie Chart */}
          <Grid item xs={12} md={4}>
            <Fade in timeout={2000}>
              <Card sx={{ 
                height: '400px',
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                p: 3,
              }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 3, fontWeight: 600 }}>
                  Students per Course
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {courseDistribution.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Legend
                      formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.8)' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Fade>
          </Grid>

          {/* Teachers by Department Bar Chart */}
          <Grid item xs={12}>
            <Fade in timeout={2200}>
              <Card sx={{ 
                height: '400px',
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                p: 3,
              }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 3, fontWeight: 600 }}>
                  Teachers per Department
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teachersByDepartment}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="department" 
                      stroke="rgba(255,255,255,0.7)"
                      tick={{ fill: 'rgba(255,255,255,0.7)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.7)"
                      tick={{ fill: 'rgba(255,255,255,0.7)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 