import React, { useEffect, useState } from 'react';
import { pagingCountries, getCountry ,deleteCountry  } from './CountryService';
import { Button, IconButton, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Snackbar, Alert, Pagination,
   Select, MenuItem, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions,  TextField, InputAdornment } from '@mui/material';
import { Visibility, Edit, Delete, Add ,Search } from '@mui/icons-material';
import CountryAction from './CountryAction'; 


export default function CountryIndex() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // Trạng thái mở popup xác nhận
  const [countryToDelete, setCountryToDelete] = useState(null); // Lưu quốc gia được chọn để xóa    
  const [keyword, setKeyword] = useState('');  // Thêm state để lưu từ khóa tìm kiếm
  
  useEffect(() => {
    loadCountries();
  }, [currentPage, pageSize , keyword]);  // Cập nhật khi thay đổi keyword
  
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage') || 1;
    setCurrentPage(savedPage);
    loadCountries();
  }, []);
  

  const loadCountries = async () => {
    try {
      const searchObject = { pageIndex: currentPage, pageSize , keyword};
      const response = await pagingCountries(searchObject);
  
      if (response && response.data) {
        setCountries(response.data.content || []);
        setTotalPages(response.data.totalPages); // Tổng số trang từ API
      }
    } catch (err) {
      setError('Error loading countries.');
      console.error(err);
    }
  };

  const handleView = async (id) => {
    try {
      const response = await getCountry(id);
      setSelectedCountry({
        ...response.data,
        viewOnly: true, // Đánh dấu là chỉ xem chi tiết
      });
    } catch (err) {
      setError('Error fetching country details.');
      console.error(err);
    }
  };
  

  const handleDeleteConfirm = (id) => {
    setCountryToDelete(id); // Lưu quốc gia cần xóa
    setDeleteConfirmOpen(true); // Mở popup xác nhận
  };
  
  const handleDeleteCancel = () => {
    setCountryToDelete(null); // Xóa thông tin quốc gia cần xóa
    setDeleteConfirmOpen(false); // Đóng popup
  };
  
  const handleDeleteConfirmAction = async () => {
    if (!countryToDelete) return;
  
    try {
      await deleteCountry(countryToDelete);
      setSuccessMessage('Country deleted successfully!');
      setSnackbarOpen(true);
      setCountries((prevCountries) =>
        prevCountries.filter((country) => country.id !== countryToDelete)
      );
    } catch (err) {
      setError('Error deleting country.');
      console.error(err);
    } finally {
      setDeleteConfirmOpen(false);
      setCountryToDelete(null);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Cập nhật trang hiện tại
    localStorage.setItem('currentPage', value); // Lưu trang hiện tại vào localStorage
  };
  
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10)); // Cập nhật số bản ghi mỗi trang
    setCurrentPage(1); // Reset về trang đầu
  };
  
  // Cập nhật giá trị từ trường tìm kiếm
  const handleSearchChange = (event) => {
    setKeyword(event.target.value);  // Cập nhật keyword khi người dùng thay đổi
  };

  return (
    <>
        {/* Căn giữa trường tìm kiếm */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{ marginTop: 2 }}
      >
        <TextField
          label="Search Country"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={handleSearchChange}  // Khi thay đổi từ khóa, sẽ gọi loadCountries
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search /> 
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' }, marginBottom: 2, marginTop: 2 }}
        onClick={() => setSelectedCountry({})}  // Trigger form for adding country
      >
        Add Country
      </Button>
      {/* Country Details Form */}
      {selectedCountry && <CountryAction selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setCountries={setCountries} setSnackbarOpen={setSnackbarOpen} setSuccessMessage={setSuccessMessage} />}

      {/* Snackbar for Success or Error */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error || successMessage}
        </Alert>
      </Snackbar>

      {/* Country Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="country table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.id}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(country.id)} color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => setSelectedCountry(country)} color="secondary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteConfirm(country.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex',justifyContent:'flex-end', alignItems: 'center', marginTop: 20 , gap:'20px' }}>
        {/* Thay đổi số bản ghi mỗi trang */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1" style={{ marginRight: 8 }}>
            Số hàng mỗi trang:
          </Typography>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            size="small"
          >
            {[5, 10, 20, 50].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Phân trang */}
        <Pagination
  count={totalPages}
  page={currentPage}
  onChange={handlePageChange}
  variant="outlined"
  shape="rounded"
  showFirstButton
  showLastButton
  sx={{
    '& .MuiPaginationItem-root': {
      '&.Mui-selected': {
        backgroundColor: '#0c969c',
        color: 'white',
        '&:hover': {
          backgroundColor: '#0a7075',
        },
      },
    },
  }}
/>
      </div>
      {/* //popup delete */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-confirm-dialog"
      >
        <DialogTitle id="delete-confirm-dialog">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this country?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmAction} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
