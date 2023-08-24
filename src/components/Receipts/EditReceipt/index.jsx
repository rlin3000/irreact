import { useLocation } from 'react-router-dom';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Card,
  ImageListItem,
  Button,
  // ImageListItemBar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function EditReceipt() {

  const navigate = useNavigate();
  
  const location = useLocation();

  const item = location.state?.item;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmClick = async () => {
    navigate('/receipts/', { replace: true });
  };

  const handleCancel = async () => {
    navigate('/receipts/', { replace: true });
  };

  const [value, setValue] = React.useState(dayjs(item.receiptDatetime));
  const [name, setName] = React.useState(item.companyName);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {item ? (
        // Render content when itemId is available
        <div>
          <Button onClick={handleConfirmClick}>Confirm</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      ) : (
        // Render content when itemId is not available
        <div>No receipt item selected.</div>
      )}
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Purchase Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Total Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="TotalAmount"
            defaultValue={item.totalAmount}
          />
        </FormControl>
        <TextField
          id="outlined-controlled"
          label="Shop/Vendor"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Card>
          <ImageListItem sx={{ height: '100% !important' }}>
            <img
              src={`https://www.ireceipts.au/Receipt/GetImage/${encodeURIComponent(item.imagePath)}`}
              alt={item.companyName}
              loading="lazy"
              style={{ cursor: 'pointer' }}
            />
          </ImageListItem>
        </Card>
      </div>
    </Box>
  );
}
