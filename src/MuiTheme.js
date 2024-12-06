import { createTheme } from "@mui/material/styles";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#502c65",
    },
    secondary: {
      main: "#e7e1fd",
    },
    muicomponent: {
      700: "#212121",
      600: "#2f2f2f",
      500: "#424242",
      400: "#322C2B",
    },
    textPrimary: {
      700: "#28293d",
      600: "#5A5A5A",
      500: "#9d9d9d",
    },
    black: {
      200: "#E9E9F0",
      300: "#D8D9E4",
      400: "#C7C9D9",
      500: "#8F90A6",
      600: "#555770",
      700: "#28293D",
    },
    white700: {
      main: "#FFFFFF",
    },
    white: {
      200: "#EAEF1",
      300: "#ECECF2",
      400: "#F1F1F5",
      500: "#F5F6F8",
      600: "#FAFBFB",
      700: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "40px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "32px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "24px",
      fontWeight: 700,
    },
    h5: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h6: {
      fontSize: "20px",
      fontWeight: 600,
    },
    body1medium: {
      fontSize: "20px",
      fontWeight: 500,
    },
    body1normal: {
      fontSize: "20px",
      fontWeight: 400,
    },
    body2bold: {
      fontSize: "16px",
      fontWeight: 600,
    },
    body2medium: {
      fontSize: "16px",
      fontWeight: 500,
    },
    body2normal: {
      fontSize: "16px",
      fontWeight: 400,
    },
    body3bold: {
      fontSize: "15px",
      fontWeight: 600,
    },
    body3medium: {
      fontSize: "15px",
      fontWeight: 500,
    },
    body3normal: {
      fontSize: "15px",
      fontWeight: 400,
    },
    body4bold: {
      fontSize: "14px",
      fontWeight: 600,
    },
    body4medium: {
      fontSize: "14px",
      fontWeight: 500,
    },
    body4normal: {
      fontSize: "14px",
      fontWeight: 400,
    },
    small1bold: {
      fontSize: "13px",
      fontWeight: 600,
    },
    small1medium: {
      fontSize: "13px",
      fontWeight: 500,
    },
    small1normal: {
      fontSize: "13px",
      fontWeight: 400,
    },
    small2bold: {
      fontSize: "12px",
      fontWeight: 600,
    },
    small2medium: {
      fontSize: "12px",
      fontWeight: 500,
    },
    small2normal: {
      fontSize: "12px",
      fontWeight: 400,
    },
    small3bold: {
      fontSize: "10px",
      fontWeight: 600,
    },
    small3medium: {
      fontSize: "10px",
      fontWeight: 500,
    },
    small3normal: {
      fontSize: "10px",
      fontWeight: 400,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#502c65',   // Default color for Typography components
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#7350a0',
          '&:hover': {           // Example: style for icon hover state
            color: '#4d2c65', // Color on hover
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#fff", // Change the text color
          fontSize: "13px", // Change the font size
          borderRadius: "4px", // Custom border radius
          padding: "7px", // Custom padding
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontWeight: 500,
            fontSize: "15px",
            color: "#424242",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Apply styles to the root of the Button
          borderRadius: "10px", // Change border radius
          padding: "7px 16px", // Custom padding
          textTransform: "none", // Disable uppercase transformation
          fontSize: "14px", // Custom font size
        },
        
        outlinedPrimary: {
          background: "white",
        },
        
        iconButton: {
          padding: "9px 11px",
          color: "#DFD6F9",
          minWidth: "40px",
          borderRadius: "12px",
          border: "0.3px solid #B9B9B9",
        },
      },
    },
  },
});

