import React, { useState, useMemo, createContext, useContext } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Calendar from "./components/Calendar";

const ThemeToggleContext = createContext();
const useThemeToggle = () => useContext(ThemeToggleContext);

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const [events, setEvents] = useState({});

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
        },
        typography: {
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider
      value={() => setMode((m) => (m === "light" ? "dark" : "light"))}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header mode={mode} />
          <Calendar events={events} setEvents={setEvents} />
        </Container>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

const Header = ({ mode }) => {
  const toggleTheme = useThemeToggle();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mt={3}
      mb={2}
    >
      <Typography variant="h4">📅 Interactive Calendar</Typography>
      <IconButton onClick={toggleTheme}>
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Box>
  );
};

export default App;
