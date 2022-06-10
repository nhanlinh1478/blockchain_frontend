import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import register from "../assets/images.jpg";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Image = styled.img({
  padding: "10px",
  marginLeft: "120px",
});

function Register() {
  const [privateKey, setPrivateKey] = useState("");
  const handleChange = (e) => {
    setPrivateKey(e.target.value);
  };
  const onLogin = () => {};
  console.log("change:", privateKey);
  return (
    <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mt: 20 }}>
          <Typography sx={{ ml: 35 }} variant="h4" color>
            Access my wallet
          </Typography>

          <Typography sx={{ ml: 43 }}>Enter your private key</Typography>
          <Grid item xs={7} sx={{ ml: 30 }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={privateKey}
              onChange={handleChange}
            />
            <Button variant="outlined" sx={{ mt: 4, ml: 16 }} onClick={onLogin}>
              Log in
            </Button>
          </Grid>
          <Grid item xs={5} sx={{ mt: 20 }}></Grid>
        </Grid>
        <Grid item xs={6} sx={{ mt: 14 }}>
          <Image src={register}></Image>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Register;
