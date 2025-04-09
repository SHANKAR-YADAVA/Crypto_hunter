import { styled } from "@mui/material/styles";

const SelectButton = ({ children, selected, onClick }) => {
  const StyledButton = styled("span")(({ theme }) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px 20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    textAlign: "center",
  }));

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default SelectButton;