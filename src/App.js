import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import "./App.css";
import { Box } from "@mui/material";
import Alert from "./components/Alert";

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Box>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
