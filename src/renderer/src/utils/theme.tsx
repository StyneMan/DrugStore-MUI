import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#356CAA",
      light: "#CCE4F2",
      dark: '#0B1841'
    },
    secondary: {
      main: "#bbb",
      light: "#f5f5f8",
    },
    info: {
      main: "#07B4B4",
    },
    success: {
      main: '#42AEA3',
      dark: '#1F655E',
      light: '#E8FFFE',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            border: "none", // Remove the border
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "95%",
          maxWidth: "94%",
        },
        disableGutters: true,
      },
    },
    MuiAvatar: {
      styleOverrides: {
        circular: {
          ":root": {
            border: "2px solid",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "PublicSans, serif",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          border: "none",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          disableUnderline: true,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        },
      },
    },
   MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'capitalize',
        
      }
    }
   }
  },
});

export default theme;