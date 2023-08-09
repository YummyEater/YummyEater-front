import { createTheme } from '@mui/material/styles';
import { colors } from './Colors';

export const submitButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '250px', padding: '8px',
          fontSize: '16px !important', fontWeight: '600', lineHeight: '160%',
          color: colors.palette.white,
          backgroundColor: colors.palette.orange.main,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.main,
            border: `1px solid ${colors.palette.orange.dark} !important`,
          },
          '&:active': {
            backgroundColor: colors.palette.orange.dark,
            border: '1px solid ${colors.palette.orange.dark} !important'
          }
        }
      }
    }
  },
});

export const verifyButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '112px', padding: '8px',
          fontSize: '16px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.orange.main,
          backgroundColor: colors.palette.orange.light,
          border: `1px solid ${colors.palette.orange.light} !important`,
          borderRadius: '20px!important',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.light,
            border: `1px solid ${colors.palette.orange.main} !important`,
          },
          '&:active': {
            color: colors.palette.white,
            backgroundColor: colors.palette.orange.main,
            border: '1px solid ${colors.palette.orange.main} !important'
          }
        }
      }
    }
  },
});

export const loginTextButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400',
          borderRadius: 0, borderBottom: `1px solid transparent !important`,
          color: colors.palette.black,
          padding: 0, minWidth: 'unset',
          '&:hover, &:focus': {
            backgroundColor: 'transparent',
            borderBottom: `1px solid ${colors.palette.orange.main} !important`,
          },
          '&:active': {
            backgroundColor: 'transparent',
            borderBottom: `1px solid ${colors.palette.orange.dark} !important`
          }
        }
      }
    }
  },
});

export const typeButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.white, backgroundColor: colors.palette.orange.main,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important',
          padding: '2px 8px', minWidth: 'unset',
          "&.Mui-disabled": { color: colors.palette.white, },
        }
      }
    }
  },
});

export const categoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.orange.main, backgroundColor: colors.palette.white,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important',
          padding: '2px 8px', minWidth: 'unset',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.light,
            border: `1px solid ${colors.palette.orange.main} !important`,
          },
          '&:active': {
            color: colors.palette.white,
            backgroundColor: colors.palette.orange.main,
            border: '1px solid ${colors.palette.orange.main} !important'
          }
        }
      }
    }
  },
});

export const tagButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.orange.main,
          backgroundColor: colors.palette.orange.light,
          border: `1px solid ${colors.palette.orange.light} !important`,
          borderRadius: '20px!important',
          padding: '0 5px',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.light,
            border: `1px solid ${colors.palette.orange.main} !important`,
          },
          '&:active': {
            color: colors.palette.white,
            backgroundColor: colors.palette.orange.main,
            border: '1px solid ${colors.palette.orange.main} !important'
          }
        }
      }
    }
  },
});

export const articleButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.gray.dark2,
          backgroundColor: colors.palette.gray.light,
          border: `1px solid ${colors.palette.gray.light} !important`,
          borderRadius: '5px!important',
          padding: '0 4px', minWidth: 'unset',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.gray.light,
            border: `1px solid ${colors.palette.gray.dark2} !important`,
          },
          '&:active': {
            color: colors.palette.white,
            backgroundColor: colors.palette.gray.dark2,
            border: '1px solid ${colors.palette.gray.dark2} !important'
          }
        }
      }
    }
  },
});

export const commentButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '80px', padding: '4px',
          fontSize: '14px !important', fontWeight: '600', lineHeight: '160%',
          color: colors.palette.white,
          backgroundColor: colors.palette.orange.main,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.main,
            border: `1px solid ${colors.palette.orange.dark} !important`,
          },
          '&:active': {
            backgroundColor: colors.palette.orange.dark,
            border: '1px solid ${colors.palette.orange.dark} !important'
          }
        }
      }
    }
  },
});