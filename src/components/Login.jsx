import React, { useState } from 'react';
import { Avatar, Box, Container, TextField, Typography, Button, Grid2, Link, ThemeProvider, createTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected the typo
    console.log(formData);
    // Add logic to handle login
  };

  const handleSignupClick = () => {
    navigate('/register');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  aria-label="Email Address"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  aria-label="Password"
                  onChange={handleInputChange}
                  value={formData.password} // Changed to lowercase password
                />
              </Grid2>
            </Grid2>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid2 container>
              <Grid2 item>
                <Link variant="body2" onClick={handleSignupClick}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;