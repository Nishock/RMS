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

interface Teacher {
  _id: string;
  name: string;
  teacherId: string;
  department: string;
  subject: string;
  email: string;
  phone: string;
  experience: number;
}

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    teacherId: '',
    department: '',
    subject: '',
    email: '',
    phone: '',
    experience: 0,
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { role: 'teacher' }
      });
      setTeachers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch teachers');
      setLoading(false);
    }
  };

  const handleOpenDialog = (teacher?: Teacher) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData(teacher);
    } else {
      setEditingTeacher(null);
      setFormData({
        name: '',
        teacherId: '',
        department: '',
        subject: '',
        email: '',
        phone: '',
        experience: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTeacher(null);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editingTeacher) {
        // Update existing teacher
        await axios.put(`/api/users/${editingTeacher._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Add new teacher
        await axios.post('/api/users', {
          ...formData,
          role: 'teacher',
          password: 'defaultPassword123' // This should be changed by the user later
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchTeachers();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save teacher');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTeachers();
    } catch (err) {
      setError('Failed to delete teacher');
    }
  };

  const handleExport = () => {
    // Convert teachers data to CSV
    const headers = ['Name', 'Teacher ID', 'Department', 'Subject', 'Email', 'Phone', 'Experience'];
    const csvData = teachers.map(teacher => [
      teacher.name,
      teacher.teacherId,
      teacher.department,
      teacher.subject,
      teacher.email,
      teacher.phone,
      teacher.experience
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || teacher.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Teacher Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ mr: 2 }}
          >
            Add Teacher
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
          placeholder="Search teachers..."
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
          <InputLabel>Department</InputLabel>
          <Select
            value={filterDepartment}
            label="Department"
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <MenuItem value="all">All Departments</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Arts">Arts</MenuItem>
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
              <TableCell>Teacher ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Experience (Years)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenDialog(teacher)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(teacher._id)} size="small" color="error">
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
          {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
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
              label="Teacher ID"
              fullWidth
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                label="Department"
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Arts">Arts</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Subject"
              fullWidth
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
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
              label="Experience (Years)"
              fullWidth
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTeacher ? 'Save Changes' : 'Add Teacher'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 