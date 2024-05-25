import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

function MyComponent() {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    dob: null, // Initialize dob with null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormdata((prevData) => ({ ...prevData, dob: newValue }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formdata); // Submit form data (e.g., using API call)
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formdata.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formdata.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <DatePicker
        label="Date of Birth"
        value={formdata.dob}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </form>
  );
}

export default MyComponent;
