import { Container, Typography, Box, Button, Stack } from "@mui/material";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: "url(./banner2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          pt: 3,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              mb: 3,
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>

          {/* ✅ Buttons Stack */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFD700",
                color: "#000",
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                borderRadius: 20,
                '&:hover': {
                  backgroundColor: "#e6c200",
                },
              }}
              onClick={() => navigate("/compare")}
            >
              Compare Coins
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#FFD700",
                color: "#FFD700",
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                borderRadius: 20,
                '&:hover': {
                  backgroundColor: "#FFD700",
                  color: "#000",
                },
              }}
              onClick={() => navigate("/ask-ai")}
            >
              Ask Crypto AI
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            height: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Carousel />
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
