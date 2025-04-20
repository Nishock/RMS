import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  rollNumber: string;
  course: string;
  year: number;
  email: string;
  phone: string;
  batch: string;
}

export const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    rollNumber: '',
    course: '',
    year: 1,
    email: '',
    phone: '',
    batch: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { role: 'student' }
      });
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch students');
      setLoading(false);
    }
  };

  const handleOpenDialog = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({
        name: '',
        rollNumber: '',
        course: '',
        year: 1,
        email: '',
        phone: '',
        batch: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editingStudent) {
        // Update existing student
        await axios.put(`/api/users/${editingStudent._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Add new student
        await axios.post('/api/users', {
          ...formData,
          role: 'student',
          password: 'defaultPassword123' // This should be changed by the user later
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchStudents();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save student');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStudents();
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  const handleExport = () => {
    // Convert students data to CSV
    const headers = ['Name', 'Roll Number', 'Course', 'Year', 'Email', 'Phone', 'Batch'];
    const csvData = students.map(student => [
      student.name,
      student.rollNumber,
      student.course,
      student.year,
      student.email,
      student.phone,
      student.batch
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    const matchesYear = filterYear === 'all' || student.year === Number(filterYear);
    
    return matchesSearch && matchesCourse && matchesYear;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Student Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ mr: 2 }}
          >
            Add Student
          </Button>
          <Button
            variant="outlined"
            startIcon={<ExportIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Paper sx={{ 
        mb: 3, 
        p: 2,
        display: 'flex',
        gap: 2,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
      }}>
        <TextField
          placeholder="Search students..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Course</InputLabel>
          <Select
            value={filterCourse}
            label="Course"
            onChange={(e) => setFilterCourse(e.target.value)}
          >
            <MenuItem value="all">All Courses</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Arts">Arts</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={filterYear}
            label="Year"
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <MenuItem value="all">All Years</MenuItem>
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <TableContainer component={Paper} sx={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenDialog(student)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(student._id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Roll Number"
              fullWidth
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={formData.course}
                label="Course"
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Arts">Arts</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={formData.year}
                label="Year"
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              >
                <MenuItem value={1}>1st Year</MenuItem>
                <MenuItem value={2}>2nd Year</MenuItem>
                <MenuItem value={3}>3rd Year</MenuItem>
                <MenuItem value={4}>4th Year</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              label="Batch"
              fullWidth
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              placeholder="e.g., 2023-27"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingStudent ? 'Save Changes' : 'Add Student'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 