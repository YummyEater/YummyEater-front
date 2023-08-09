import { createTheme } from '@mui/material/styles';
import { colors } from './Colors';

export const loginInputTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.gray.light,
          borderRadius: '10px',
          borderBottom: '1px solid transparent',
          '&:before, &:after, &:hover:not(.Mui-disabled, .Mui-error):before, &.Mui-focused:after': {
            borderBottom: '1px solid transparent',
            borderRadius: '10px',
          },
          '&.Mui-focused': { backgroundColor: colors.palette.gray.light, }
        },
        input: {
          padding: '8px 15px',
          width: '370px',
          fontSize: '16px',
          '&:-webkit-autofill': {
            borderRadius: '10px',

          }
        },
      },
    },
  }
})

export const statRatingTheme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        root: { gap: '5px' },
        icon: { width: '18px', height: '18px' }
      },
    },
  }
})
export const commentRatingTheme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        root: { gap: '4px' },
        icon: { width: '16px', height: '16px' }
      },
    },
  }
})

export const selectTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:before, &:after, &:focus, &:hover:not(.Mui-disabled, .Mui-error):before, &.Mui-focused:after': {
            borderBottom: `0.5px solid ${colors.palette.black}`, backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: { cursor: 'pointer !important', },
        input: {
          fontSize: '13px', padding: '0', paddingRight: '10px !important',
          minWidth: 'unset !important', boxSizing: 'border-box',
          '&:focus': { backgroundColor: 'transparent', }
        }
      }
    },
    MuiMenuItem: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          fontSize: '13px',
          '&.Mui-selected, &.Mui-selected.Mui-focusVisible': { backgroundColor: colors.palette.orange.light },
          '&:hover, &.Mui-selected:hover': { backgroundColor: 'rgba(255, 239, 229, 0.5)' },
        }
      }
    }
  }
})

export const commentInputTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.gray.light,
          borderRadius: '10px', borderBottom: '1px solid transparent',
          padding: '10px 20px',
          '&:before, &:after, &:hover:not(.Mui-disabled, .Mui-error):before, &.Mui-focused:after': {
            borderBottom: '1px solid transparent',
            borderRadius: '10px',
          },
          '&.Mui-focused': { backgroundColor: colors.palette.gray.light, }
        },
        input: {
          fontSize: '15px',
        },
      },
    },
  }
})