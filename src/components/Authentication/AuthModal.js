import { useState } from "react";
import { Box, Button, Tab, Tabs, AppBar, Modal, Backdrop, Fade } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => setValue(newValue);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: "success",
      });
      console.log("Alert state:", alert);
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ width: 85, height: 40, ml: 2, backgroundColor: "#EEBC1D" }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              color: "white",
              borderRadius: 2,
              p: 3,
              boxShadow: 24,
            }}
          >
            <AppBar
              position="static"
              sx={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderRadius: 2 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
                
              />
              
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
