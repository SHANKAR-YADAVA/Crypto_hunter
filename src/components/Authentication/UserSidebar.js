import React, { useState } from "react";
import { Drawer, Avatar, Button, Box, Typography, useTheme } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const theme = useTheme();
  const [state, setState] = useState(false);
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState(open);
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful!",
    });
    setState(false);
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
      setAlert({ open: true, message: `${coin.name} Removed from Watchlist!`, type: "success" });
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" });
    }
  };

  return (
    <div>
      <Avatar
        onClick={toggleDrawer(true)}
        sx={{ height: 38, width: 38, ml: 2, cursor: "pointer", bgcolor: "#EEBC1D" }}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 350, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 100, height: 100, cursor: "pointer", bgcolor: "#EEBC1D" }}
              src={user.photoURL} alt={user.displayName || user.email} />
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
              {user.displayName || user.email}
            </Typography>
            <Box sx={{ width: "100%", bgcolor: "grey", borderRadius: 2, p: 2, overflowY: "auto" }}>
            <Typography variant="body1" sx={{ textAlign: "center", fontWeight: "bold" }}>Watchlist</Typography>
{coins
  .filter((coin) => watchlist.includes(coin.id)) // Only show coins in the user's watchlist
  .map((coin) => (
    <Box key={coin.id} sx={{ p: 1, borderRadius: 1, bgcolor: "#EEBC1D", display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
      <Typography>{coin.name}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>{symbol} {numberWithCommas(coin.current_price.toFixed(2))}</Typography>
        <AiFillDelete style={{ cursor: "pointer" }} onClick={() => removeFromWatchlist(coin)} />
      </Box>
    </Box>
  ))}

            </Box>
          </Box>
          <Button variant="contained" sx={{ bgcolor: "#EEBC1D", mt: 2 }} onClick={logOut}>
            Log Out
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
