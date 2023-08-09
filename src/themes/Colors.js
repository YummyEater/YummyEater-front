import { createTheme } from '@mui/material/styles';

export const colors = createTheme({
  palette: {
    orange: {
      main: '#FD9E5E',
      light: '#FFEFE5',
      dark: '#F38049',
    },
    white: '#FFFFFF',
    black: '#271D16',
    gray: {
      light: '#F7F6F5',
      dark: '#D0CECC',
      dark2: '#B4B2B0',
    },
    success: {main: '#44D1A3'},
    danger: '#FF4600'
  },
});