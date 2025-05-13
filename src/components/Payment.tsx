import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Payment() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePayment = () => {
    alert("Payment submitted!");
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ backgroundColor: "gray", marginLeft: 15 }}
      >
        Make a Payment
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" style={{ textAlign: "center" }}>
            <img src={"/creditcard.png"} style={{ width: "80px" }} />

            <h3> Make a Payment</h3>
          </Typography>

          <Stack>
            <h4>How much would you like to pay?</h4>
            <TextField
              label="Please enter an amount ($)"
              fullWidth
              type="number"
              style={{ marginBottom: 25 }}
            />
          </Stack>

          <h4>Please enter your card details:</h4>
          <Stack spacing={2} mt={2}>
            <TextField label="Cardholder Name" fullWidth />
            <TextField label="Card Number" fullWidth />
            <TextField label="Expiry Date (MM/YY)" fullWidth />
            <TextField label="CVV" fullWidth type="password" />
            <Button variant="contained" color="primary" onClick={handlePayment}>
              Submit Payment
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
