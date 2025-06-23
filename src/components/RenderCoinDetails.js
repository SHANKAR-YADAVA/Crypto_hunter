import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "./CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinDetailsCard = ({ coin }) => {
  const { currency, symbol } = CryptoState();

  if (!coin) return null;

  const profit = coin?.market_data?.price_change_percentage_24h > 0;

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#1a1a1a",
        borderRadius: 3,
        px: 3,
        py: 2,
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Left Section: Image, Name, Description */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 250 }}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="60"
          style={{ borderRadius: "50%", background: "#fff", padding: 4 }}
        />
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: "Montserrat", color: "white" }}
          >
            {coin?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Montserrat",
              color: "#aaa",
              maxWidth: 300,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {parse(coin?.description?.en?.split(". ")[0])}.
          </Typography>
        </Box>
      </Box>

      {/* Right Section: Table Info */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#2b2b2b",
          borderRadius: 2,
          overflow: "hidden",
          width: { xs: "100%", sm: "auto" },
          minWidth: 300,
        }}
      >
        <Table size="small">
          <TableBody>
            <TableRow hover>
              <TableCell
                sx={{ fontWeight: 700, fontFamily: "Montserrat", color: "white" }}
              >
                Rank
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat", color: "white" }}>
                {numberWithCommas(coin?.market_cap_rank)}
              </TableCell>
            </TableRow>

            <TableRow hover>
              <TableCell
                sx={{ fontWeight: 700, fontFamily: "Montserrat", color: "white" }}
              >
                Current Price
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat", color: "white" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data?.current_price[currency.toLowerCase()].toFixed(2)
                )}
              </TableCell>
            </TableRow>

            <TableRow hover>
              <TableCell
                sx={{ fontWeight: 700, fontFamily: "Montserrat", color: "white" }}
              >
                24h Change
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  color: profit ? "rgb(14, 203, 129)" : "red",
                }}
              >
                {profit && "+"}
                {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>
            </TableRow>

            <TableRow hover>
              <TableCell
                sx={{ fontWeight: 700, fontFamily: "Montserrat", color: "white" }}
              >
                Market Cap
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat", color: "white" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data?.market_cap[currency.toLowerCase()]
                    ?.toString()
                    ?.slice(0, -6)
                )}
                M
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CoinDetailsCard;
