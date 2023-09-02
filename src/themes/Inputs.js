import { createTheme } from '@mui/material/styles';
import { colors } from './Colors';

export const loginInputTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.gray.light,
          borderRadius: '10px', borderBottom: '1px solid transparent',
          '&:before, &:after, &:hover:not(.Mui-disabled, .Mui-error):before, &.Mui-focused:after': {
            borderBottom: '1px solid transparent', borderRadius: '10px',
          },
          '&.Mui-focused': { backgroundColor: colors.palette.gray.light, }
        },
        input: {
          padding: '8px 15px', fontSize: '16px', width:'370px',
          '&:-webkit-autofill': { borderRadius: '10px', }
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
    },
  }
})

export const mainSelectTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          marginTop: '8px !important',
          '&:before, &:after, &:focus, &:hover:not(.Mui-disabled, .Mui-error):before, &.Mui-focused:after': {
            borderBottom: `1px solid ${colors.palette.gray.dark}`, backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: { cursor: 'pointer !important', },
        input: {
          fontSize: '14px', paddingLeft: '5px',
          // padding: '5px 5px 5px 10px',
          minWidth: 'unset !important', boxSizing: 'border-box',
          '&:focus': { backgroundColor: 'transparent', }
        }
      }
    },
    MuiMenuItem: {
      defaultProps: { disableRipple: true, },
      styleOverrides: {
        root: {
          fontSize: '14px',
          '&.Mui-selected, &.Mui-selected.Mui-focusVisible': { backgroundColor: colors.palette.orange.light },
          '&:hover, &.Mui-selected:hover': { backgroundColor: 'rgba(255, 239, 229, 0.5)' },
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', maxWidth: 'unset !important',
          color: `${colors.palette.gray.dark2} !important`, paddingLeft: '5px',
          top: '-4px',
          '&.Mui-focused': { color: `${colors.palette.orange.main} !important` }
        },
        shrink: {
          transform: 'translate(-5px,5px) scale(0.75)', left: '5px', top: '-5px',
          color: `${colors.palette.orange.main} !important`
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
          backgroundColor: colors.palette.gray.light, padding: '10px 20px',
          borderRadius: '10px', borderBottom: '1px solid transparent',
          '&:before, &:after, &:hover:not(.Mui-disabled, .Mui-error):before, &.Mui-focused:after': {
            borderBottom: '1px solid transparent',
            borderRadius: '10px',
          },
          '&.Mui-focused': { backgroundColor: colors.palette.gray.light, }
        },
        input: { fontSize: '15px', },
      },
    },
  }
})

export const editorInputTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.white, paddingRight: '5px',
          borderBottom: `1px solid ${colors.palette.black} !important`, borderRadius: 0,
        },
        input: { padding: '5px', fontSize: '14px' },
        notchedOutline: { border: 'none !important', top: 0, padding: '5px' }
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { color: `${colors.palette.gray.dark} !important` }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', maxWidth: 'unset !important',
          left: '-10px', top: '-10px', color: `${colors.palette.black} !important`,
          '&.Mui-focused': { color: `${colors.palette.orange.main} !important` }
        },
        shrink: {
          transform: 'translate(10px,2px) scale(0.75)',
          color: `${colors.palette.orange.main} !important`
        }
      }
    }
  }
})

export const searchInputTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&.Mui-focused': { backgroundColor: 'transparent' }
        },
        input: { fontSize: '15px', padding: 0, },
        notchedOutline: { border: 'none', }
      },
    },
  }
})

export const mainInputTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.palette.white, paddingRight: '5px',
          borderBottom: `1px solid ${colors.palette.gray.dark} !important`, borderRadius: 0,
        },
        input: { padding: '5px', fontSize: '14px' },
        notchedOutline: { border: 'none !important', top: 0, padding: '5px' }
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { color: `${colors.palette.gray.dark2} !important` }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px !important', maxWidth: 'unset !important',
          left: '-10px', top: '-9px', color: `${colors.palette.gray.dark2} !important`,
          '&.Mui-focused': { color: `${colors.palette.orange.main} !important` }
        },
        shrink: {
          transform: 'translate(10px,2px) scale(0.75)', top: '-11px',
          color: `${colors.palette.orange.main} !important`
        }
      }
    }
  }
})

export const tableTheme = createTheme({
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          width: '100%', overflowX: 'auto'
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // tableLayout: 'fixed',
          // wordBreak:'break-all'
          // overflowY: 'scroll',
          overflow: 'auto',
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          margin: '0 !important', borderSpacing: '15px', borderBottom: `1px solid ${colors.palette.gray.dark2}`,
          '&:nth-of-type(odd):not(.MuiTableRow-head)': {
            backgroundColor: colors.palette.gray.light,
          },
          '&:last-child td:not(.MuiTableCell-head), &:last-child th:not(.MuiTableCell-head), &:last-child tr': {
            borderBottom: `1px solid transparent`,
          },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 0', paddingRight: '15px', fontSize: '14px', userSelect: 'none',
        },
        head: {
          fontSize: '16px', fontWeight: 600,
          // '&:not(:last-of-type)': { paddingRight: '15px' }
        }
      }
    }
  }
})