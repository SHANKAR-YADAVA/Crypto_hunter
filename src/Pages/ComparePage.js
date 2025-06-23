import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { CoinList, HistoricalChart, SingleCoin } from "../config/api";
import { chartDays } from "../config/data";
import SelectButton from "../components/SelectButton";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const CompareCoinsPage = () => {
  const [coins, setCoins] = useState([]);
  const [coin1, setCoin1] = useState("");
  const [coin2, setCoin2] = useState("");
  const [coinData1, setCoinData1] = useState();
  const [coinData2, setCoinData2] = useState();
  const [historicData1, setHistoricData1] = useState([]);
  const [historicData2, setHistoricData2] = useState([]);
  const [marketCap1, setMarketCap1] = useState([]);
  const [marketCap2, setMarketCap2] = useState([]);
  const [volume1, setVolume1] = useState([]);
  const [volume2, setVolume2] = useState([]);
  const [days, setDays] = useState(1);
  const [metric, setMetric] = useState("price");
  const [loading, setLoading] = useState(true);

  const { currency, symbol } = CryptoState();

  const fetchCoinsList = async () => {
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins list", error);
    }
  };

  const fetchCoinData = async (id, setter) => {
    if (!id) return;
    const { data } = await axios.get(SingleCoin(id));
    setter(data);
  };

  const fetchHistoricData = async (id, setPrice, setMarketCap, setVolume) => {
    if (!id) return;
    try {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setPrice(data.prices);
      setMarketCap(data.market_caps);
      setVolume(data.total_volumes);
    } catch (error) {
      console.error("Error fetching historical data", error);
    }
  };

  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  useEffect(() => {
    fetchCoinData(coin1, setCoinData1);
    fetchCoinData(coin2, setCoinData2);
    fetchHistoricData(coin1, setHistoricData1, setMarketCap1, setVolume1);
    fetchHistoricData(coin2, setHistoricData2, setMarketCap2, setVolume2);
  }, [coin1, coin2, days, currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ backgroundColor: "#0d1117", minHeight: "100vh", px: 3, py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", mb: 4, textAlign: "center" }}>
          Select Two Coins to Compare
        </Typography>

        <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" }, mb: 2, maxWidth: "800px", mx: "auto" }}>
          {[{ label: "Coin 1", value: coin1, setter: setCoin1 }, { label: "Coin 2", value: coin2, setter: setCoin2 }].map(({ label, value, setter }) => (
            <FormControl fullWidth key={label}>
              <InputLabel sx={{ color: "white" }}>{label}</InputLabel>
              <Select value={value} onChange={(e) => setter(e.target.value)} sx={{ color: "white" }}>
                {coins.map((coin) => (
                  <MenuItem key={coin.id} value={coin.id}>
                    <img src={coin.image} alt={coin.name} height="20" style={{ marginRight: 10 }} />
                    {coin.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>

        {coinData1 && coinData2 ? (
          <>
            <Box sx={{ width: "90%", mx: "auto", mt: 5, backgroundColor: "#1e1e1e", p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ color: "#fff", mb: 2, textAlign: "center" }}>
                Comparison (Past {days} Day{days > 1 ? "s" : ""}) in {currency}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {chartDays.map((day) => (
                  <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
                    {day.label}
                  </SelectButton>
                ))}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                {["price", "market_cap", "volume"].map((type) => (
                  <SelectButton key={type} onClick={() => setMetric(type)} selected={metric === type}>
                    {type === "price" ? "Price" : type === "market_cap" ? "Market Cap" : "Volume"}
                  </SelectButton>
                ))}
              </Box>

              {(() => {
                const dataMap = {
                  price: [historicData1, historicData2],
                  market_cap: [marketCap1, marketCap2],
                  volume: [volume1, volume2],
                };
                const colors = {
                  price: ["#FFD700", "#00BFFF"],
                  market_cap: ["#FFA500", "#87CEFA"],
                  volume: ["#32CD32", "#FF69B4"],
                };
                const labels = {
                  price: "Price",
                  market_cap: "Market Cap",
                  volume: "Volume (24h)",
                };

                const [data1, data2] = dataMap[metric];
                const [color1, color2] = colors[metric];

                return !data1.length || !data2.length ? (
                  <CircularProgress sx={{ color: "gold" }} />
                ) : (
                  <Line
  data={{
    labels: data1.map((entry) => {
      const date = new Date(entry[0]);
      return days === 1 ? `${date.getHours()}:${date.getMinutes()}` : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: data1.map((entry) => entry[1]),
        label: `${coinData1.name} ${labels[metric]}`,
        borderColor: color1,
        fill: false,
        yAxisID: "y1",
      },
      {
        data: data2.map((entry) => entry[1]),
        label: `${coinData2.name} ${labels[metric]}`,
        borderColor: color2,
        fill: false,
        yAxisID: "y2",
      },
    ],
  }}
  options={{
    elements: { point: { radius: 1 } },
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } },
      tooltip: {
        callbacks: {
          label: function (context) {
            const val = context.raw;
            if (val >= 1_000_000_000_000) return `${(val / 1_000_000_000_000).toFixed(2)}T`;
            if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`;
            if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`;
            if (val >= 1_000) return `${(val / 1_000).toFixed(2)}K`;
            return val;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
      },
      y1: {
        type: "linear",
        position: "left",
        ticks: { color: color1 },
        title: {
          display: true,
          text: `${coinData1.name} ${labels[metric]}`,
          color: color1,
        },
      },
      y2: {
        type: "linear",
        position: "right",
        ticks: { color: color2 },
        title: {
          display: true,
          text: `${coinData2.name} ${labels[metric]}`,
          color: color2,
        },
        grid: {
          drawOnChartArea: false, // prevents overlapping grid lines
        },
      },
    },
  }}
/>
                );
              })()}
            </Box>
          </>
        ) : (
          loading && <LinearProgress sx={{ backgroundColor: "gold", mt: 4 }} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CompareCoinsPage;
