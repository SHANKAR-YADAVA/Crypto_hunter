import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

// eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "uppercase",
          color: "white",
          textDecoration: "none",
          minWidth: 120,
          width: "100%",
          maxWidth: 150,
          padding: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="70"
          style={{
            marginBottom: 8,
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
        <Typography
          variant="subtitle1"
          style={{
            textAlign: "center",
            whiteSpace: "nowrap",
            fontSize: "14px",
          }}
        >
          {coin?.symbol.toUpperCase()}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit ? `+${coin?.price_change_percentage_24h?.toFixed(2)}%` : `${coin?.price_change_percentage_24h?.toFixed(2)}%`}
          </span>
        </Typography>
        <Typography
          variant="h6"
          fontWeight={500}
          style={{
            textAlign: "center",
            whiteSpace: "nowrap",
            fontSize: "18px",
          }}
        >
          {symbol} {numberWithCommas(Number(coin?.current_price).toFixed(0))}
        </Typography>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box
      sx={{
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Box>
  );
};

export default Carousel;
