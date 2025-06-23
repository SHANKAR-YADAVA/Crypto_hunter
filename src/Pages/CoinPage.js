import { Button, LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    // Destructure links and extract first non-empty homepage URL
    const {
      links: { homepage },
    } = data;

    const buyLink = homepage.find((link) => link !== "");

    // Add buyLink into the coin object
    setCoin({ ...data, buyLink });
  };

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          width: { md: "30%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: { md: "2px solid grey" },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            p: 3,
            pt: 0,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Box sx={{ alignSelf: "start", p: 3, pt: 1, width: "100%" }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" , mb: 1 }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ mb: 1 }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" , mb: 1 }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>
          {user && (
            <>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  height: 45,
                  backgroundColor: inWatchlist ? "#e63946" : "#ffd60a", // red or yellow
                  color: "#000",
                  fontWeight: "bold",
                  mb: 2, // margin bottom between buttons
                  "&:hover": {
                    backgroundColor: inWatchlist ? "#d62828" : "#f4c10f",
                  },
                }}
                onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              >
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>

              {coin.buyLink && (
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: 45,
                    backgroundColor: "#00b894", // teal green
                    color: "#000",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#00a884",
                    },
                  }}
                  onClick={() => window.open(coin.buyLink, "_blank")}
                >
                  Buy Now
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
