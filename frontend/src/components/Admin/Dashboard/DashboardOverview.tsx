import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  Paper,
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      height: '100%',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 40, color: color, mr: 2 }} />
          <Box>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const DashboardOverview = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value="1,234"
            icon={SchoolIcon}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value="89"
            icon={PeopleIcon}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value="892"
            icon={PersonIcon}
            color="#00C49F"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth Rate"
            value="12.5%"
            icon={TrendingUpIcon}
            color="#FF8042"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Student Trends Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 3, 
            height: '400px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Enrollment Trends</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Course Distribution Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            height: '400px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Students per Course</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Teachers by Department Bar Chart */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            height: '400px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Teachers per Department</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teachersByDepartment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 