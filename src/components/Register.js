import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import register from "../assets/images.jpg";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { ec } from "elliptic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Image = styled.img({
  padding: "10px",
  marginLeft: "120px",
});

function Register() {
  const [privateKey, setPrivateKey] = useState("please input private key");
  const SERVER_ENDPOINT = "http://localhost:" + process.env.REACT_APP_HTTP_PORT;

  const navigate = useNavigate();
  useEffect(() => {
    const EC = new ec("secp256k1");
    const keyPair = EC.genKeyPair();
    setPrivateKey(keyPair.getPrivate().toString());
  }, []);
  const handleClickDirect = () => {
    axios
      .post(SERVER_ENDPOINT + "/initWallet", {
        privateKey: privateKey,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/information");
        } else {
          Swal.fire({
            icon: "error",
            text: "Something went wrong",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
        });
        console.log(error);
      });
  };
  return (
    <Box sx={{ flexGrow: 1, ml: 2, mr: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mt: 20 }}>
          <Typography sx={{ ml: 35 }} variant="h4" color>
            Register my wallet
          </Typography>
          <Typography sx={{ ml: 30 }}>
            Copy this private key, this is your access to the wallet
          </Typography>
          <Typography sx={{ ml: 30 }}>
            Keep this carefully because this cannot be retrieved
          </Typography>
          <Grid item xs={7} sx={{ ml: 30 }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={privateKey}
              disabled={true}
            />
          </Grid>
          <Grid item xs={5} sx={{ ml: 40, mt: 3 }}>
            <Button variant="outlined" onClick={handleClickDirect}>
              Access your wallet
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ mt: 14 }}>
          <Image src={register}></Image>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Register;
