import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import spaceman from "../assets/big-spaceman.png";
function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, mt: 2, ml: 2, mr: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ mt: 20 }}>
            <div className="Home-intro">
              <div className="Home-intro-text">
                <div>
                  <label className="Home-intro-text-title">
                    MyCoin's Original Wallet
                  </label>
                </div>
                <div>
                  <label className="Home-intro-text-content">
                    MyEtherWallet (our friends call us MEW) is a free,
                    client-side interface helping you interact with the Ethereum
                    blockchain. Our easy-to-use, open-source platform allows you
                    to generate wallets, interact with smart contracts, and so
                    much more.
                  </label>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="Home-intro-image">
              <img
                className="Home-image-spaceman"
                src={spaceman}
                alt="spaceman"
              ></img>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={1} sx={{ display: "flex" }}>
          <Grid item xs={2.5}></Grid>
          <Grid item xs={3.5}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to="/register">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://znews-photo.zingcdn.me/w660/Uploaded/ofh_jgmzfuqz/2017_12_26/Screenshot_1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Create a new wallet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Generate and create your own wallet. Receive a public
                    address, enter private key to access,smart contracts
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={3.5}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to="/login">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://academy-public.coinmarketcap.com/optimized-uploads/b21647953b004d87bf0f8d778cabdd9e.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Create a new wallet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connect to the blockchain using the wallet. Send & receive
                    coins, see transaction history, mining coins
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2.5}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
