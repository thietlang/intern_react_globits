import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { createCountry, editCountry } from './CountryService';

export default function CountryAction({ selectedCountry, setSelectedCountry, setCountries, setSnackbarOpen, setSuccessMessage ,loadCountries }) {
  const [country, setCountry] = useState({
    code: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry); // Nếu đang xem chi tiết, điền dữ liệu vào
    }
  }, [selectedCountry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCountry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (country.id) {
        response = await editCountry(country); // Chỉnh sửa quốc gia
      } else {
        response = await createCountry(country); // Thêm mới quốc gia
      }
      if (response && response.data) {
        setSuccessMessage(country.id ? 'Country updated successfully!' : 'Country created successfully!');
        setSnackbarOpen(true);
        setCountries((prevCountries) => [response.data, ...prevCountries]);
        setSelectedCountry(null); // Đóng form sau khi thành công
        loadCountries();
      }
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  // Dialog để chỉnh sửa quốc gia
  const renderEditDialog = () => (
    <Dialog open={selectedCountry !== null && !country.viewOnly} onClose={() => setSelectedCountry(null)}>
      <DialogTitle>{country.id ? 'Edit Country' : 'Add New Country'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Code"
          fullWidth
          name="code"
          value={country.code}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          name="name"
          value={country.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          name="description"
          value={country.description}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSelectedCountry(null)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {country.id ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Dialog chỉ để xem thông tin chi tiết
  const renderViewDialog = () => (
    <Dialog open={selectedCountry !== null && country.viewOnly} onClose={() => setSelectedCountry(null)}>
      <DialogTitle>{country.name}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Code"
          fullWidth
          name="code"
          value={country.code}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          name="name"
          value={country.name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          name="description"
          value={country.description}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSelectedCountry(null)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {renderEditDialog()}
      {renderViewDialog()}
    </>
  );
}
