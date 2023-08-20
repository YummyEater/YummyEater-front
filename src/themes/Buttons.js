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
          color: colors.palette.white, backgroundColor: colors.palette.orange.main,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.main,
            border: `1px solid ${colors.palette.orange.dark} !important`,
          },
          '&:active': {
            backgroundColor: colors.palette.orange.dark,
            border: '1px solid ${colors.palette.orange.dark} !important'
          },
          '&.Mui-disabled': { color: colors.palette.white, opacity: 0.6 }
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
          color: colors.palette.orange.main, backgroundColor: colors.palette.orange.light,
          border: `1px solid ${colors.palette.orange.light} !important`, borderRadius: '20px!important',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.orange.light,
            border: `1px solid ${colors.palette.orange.main} !important`,
          },
          '&:active': {
            color: colors.palette.white,
            backgroundColor: colors.palette.orange.main,
            border: '1px solid ${colors.palette.orange.main} !important'
          },
          '&.Mui-disabled': { color: colors.palette.orange.main, opacity: 0.6 }
        }
      }
    }
  },
});

export const verifyButtonTheme2 = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '112px', padding: '8px',
          fontSize: '16px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.orange.main, backgroundColor: colors.palette.white,
          border: `1px solid ${colors.palette.orange.main} !important`, borderRadius: '20px!important',
          '&:hover, &:focus, &:active': {
            backgroundColor: colors.palette.orange.light,
            // border: `1px solid ${colors.palette.orange.main} !important`,
          },
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
          color: colors.palette.black, padding: 0, minWidth: 'unset',
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
          borderRadius: '20px!important', padding: '2px 8px', minWidth: 'unset',
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
          borderRadius: '20px!important', padding: '2px 8px', minWidth: 'unset',
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
          color: colors.palette.orange.main, backgroundColor: colors.palette.orange.light,
          border: `1px solid ${colors.palette.orange.light} !important`,
          borderRadius: '20px!important', padding: '0 6px', minWidth: 'unset',
          textTransform: 'none',
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

export const infoButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.black, backgroundColor: colors.palette.gray.light,
          border: `1px solid ${colors.palette.gray.light} !important`,
          borderRadius: '20px!important', padding: '0 6px', minWidth: 'unset',
          textTransform: 'none',
          '&:hover, &:focus': {
            backgroundColor: colors.palette.gray.light,
            border: `1px solid ${colors.palette.gray.dark} !important`,
          },
          '&:active': {
            backgroundColor: colors.palette.gray.dark,
            border: '1px solid ${colors.palette.gray.dark} !important'
          },
          '&.Mui-disabled': {color: colors.palette.black,}
        }
      }
    }
  },
});

export const bTypeButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px !important', fontWeight: '400', lineHeight: '140%',
          color: colors.palette.white, backgroundColor: colors.palette.orange.main,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important', padding: '0 6px', minWidth: 'unset',
          "&.Mui-disabled": { color: colors.palette.white, },
        }
      }
    }
  },
});

export const bCategoryButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px !important', fontWeight: '400', lineHeight: '140%',
          color: colors.palette.orange.main, backgroundColor: colors.palette.white,
          border: `1px solid ${colors.palette.orange.main} !important`,
          borderRadius: '20px!important', padding: '0 6px', minWidth: 'unset',
          "&.Mui-disabled": { color: colors.palette.orange.main, },
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
          color: colors.palette.gray.dark2, backgroundColor: colors.palette.gray.light,
          border: `1px solid ${colors.palette.gray.light} !important`,
          borderRadius: '5px!important', padding: '0 4px', minWidth: 'unset',
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

export const uploadButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '80px', padding: '4px',
          fontSize: '14px !important', fontWeight: '600', lineHeight: '160%',
          color: colors.palette.white, backgroundColor: colors.palette.orange.main,
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

export const typeToggleTheme = createTheme({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: { root: { border: 'none', gap: '5px', } }
    },
    MuiToggleButton: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          padding: '2px 8px !important', minWidth: 'unset',
          border: 'none !important', borderRadius: '20px !important',
          fontSize: '14px', fontWeight: '400px', color: colors.palette.gray.dark2,
          backgroundColor: colors.palette.gray.light,
          '&:hover': {
            backgroundColor: colors.palette.gray.light, color: colors.palette.orange.main,
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: colors.palette.orange.light, color: colors.palette.orange.main,
          }
        }
      }
    }
  },
});

export const categoryToggleTheme = createTheme({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { flexWrap: 'wrap !important', border: 'none', gap: '5px', },
        grouped: { '&:not(:first-of-type)' : { marginLeft: 'unset' } }
      }
    },
    MuiToggleButton: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          padding: '2px 8px !important', minWidth: 'unset',
          border: `0.5px solid ${colors.palette.gray.dark2} !important`, borderRadius: '20px !important',
          fontSize: '14px', fontWeight: '400px', color: colors.palette.gray.dark2,
          backgroundColor: colors.palette.white,
          '&:hover': {
            backgroundColor: colors.palette.white,
            border: `0.5px solid ${colors.palette.orange.main} !important`,
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: colors.palette.orange.main, backgroundColor: colors.palette.white,
            border: `0.5px solid ${colors.palette.orange.main} !important`
          },
          '&.first-cate:before': {
            content: '""', display: 'block', position: 'absolute', left: '-12px',
            backgroundColor: colors.palette.gray.dark2, width: '7px', height: '1px',
          }
        }
      }
    }
  },
});

export const mainButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '13px !important', fontWeight: '400', lineHeight: '140%',
          color: colors.palette.orange.main, backgroundColor: colors.palette.orange.light,
          borderRadius: '20px!important', padding: '2px 8px', minWidth: 'unset', userSelect: 'none',
          "&.Mui-disabled": { color: colors.palette.orange.main, },
        }
      }
    }
  },
});

export const categoryToggleThemeM = createTheme({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { flexWrap: 'wrap !important', border: 'none', gap: '4px', },
        grouped: { '&:not(:first-of-type)' : { marginLeft: 'unset' } }
      }
    },
    MuiToggleButton: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          padding: '2px 8px !important', minWidth: 'unset',
          border: `0.5px solid ${colors.palette.gray.dark2} !important`, borderRadius: '20px !important',
          fontSize: '14px', fontWeight: '400px', color: colors.palette.gray.dark2,
          backgroundColor: colors.palette.white,
          '&:hover': {
            backgroundColor: colors.palette.white,
            border: `0.5px solid ${colors.palette.orange.main} !important`,
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: colors.palette.orange.main, backgroundColor: colors.palette.white,
            border: `0.5px solid ${colors.palette.orange.main} !important`
          },
          '&.first-cate:before': {
            content: '""', display: 'block', position: 'absolute', left: '-12px',
            backgroundColor: colors.palette.gray.dark2, width: '7px', height: '1px',
          }
        }
      }
    }
  },
});

export const addButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '5px 12px', minWidth: 'unset', borderRadius: '10px!important',
          fontSize: '14px !important', fontWeight: '400', lineHeight: '160%',
          color: colors.palette.white, backgroundColor: colors.palette.orange.main,
          border: `1px solid ${colors.palette.orange.main} !important`,
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

export const uploadImgButtonTheme = createTheme({
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true, }, },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100px', height: '100px', borderRadius: '10px!important',
          backgroundColor: colors.palette.gray.light,
          '&:hover, &:focus': { backgroundColor: '#f2f0ef', },
          '&:active': { backgroundColor: '#f1eeed', }
        }
      }
    }
  },
});