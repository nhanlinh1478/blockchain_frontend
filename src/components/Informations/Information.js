import React, { cloneElement, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
} from "@mui/material";
import addressImage from "../../assets/account.svg";
import balanceImage from "../../assets/wallet.svg";
import networkImage from "../../assets/network.svg";
import Axios from "axios";
import Swalert from "sweetalert2";
import LatestBlock from "./LatestBlock";
import TransactionInfo from "./TranSactionInfo";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const TextAddress = styled.div`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: small;
  color: black;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
`;

const TextAddressTransaction = styled.div`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: small;
  color: black;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-left: "30px";
`;

const SERVER_ENDPOINT = "http://localhost:" + process.env.REACT_APP_HTTP_PORT;
const SUPER_NODE_ENDPOINT =
  "http://localhost:" + process.env.REACT_APP_SUPER_NODE_PORT;
const UI_SOCKET_ENDPOINT =
  "http://localhost:" + process.env.REACT_APP_UI_SOCKET_PORT;

function Information() {
  const [address, setAddress] = useState("public key");
  const [coin, setCoin] = useState(-5);
  const [transactionPool, setTransactionPool] = useState([]);
  const [blockchain, setBlockchain] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const [transactionAddress, setTransactionAddress] = useState("");
  const [transactionCoin, setTransactionCoin] = useState(0);
  const getTransactionHistory = async () => {
    await Axios.get(SERVER_ENDPOINT + "/getTransactionHistory")
      .then((res) => {
        if (res.status === 200) {
          console.log("Transaction history");
          console.log(res.data);
          setTransactionHistory(res.data.reverse());
        } else {
          console.log("Fail to get transaction history");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addPeer = async (endpoint) => {
    if (endpoint === SERVER_ENDPOINT) {
      console.log("Duplicate");
      return;
    }

    await Axios.post(endpoint + "/addPeer", {
      peer: process.env.REACT_APP_P2P_PORT,
      httpPort: process.env.REACT_APP_HTTP_PORT,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Add peer");
          console.log(res.data);
        } else {
          console.log("Fail to add peers");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTransactionPool = async () => {
    Axios.get(SERVER_ENDPOINT + "/transactionPool")
      .then((response) => {
        console.log("Get transaction pool");

        setTransactionPool(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAddress = async () => {
    Axios.get(SERVER_ENDPOINT + "/address")
      .then((response) => {
        console.log("Get address");
        setAddress(response.data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getBlockchain = async () => {
    await Axios.get(SERVER_ENDPOINT + "/blocks")
      .then((response) => {
        console.log("Get blockchain");
        console.log(response);

        // setTransactionPool(response.data);
        setBlockchain(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBalance = async () => {
    Axios.get(SERVER_ENDPOINT + "/balance")
      .then((response) => {
        // console.log(JSON.stringify(response))
        console.log("Get balance");
        setCoin(response.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getPeerFromSuperNode = async () => {
      await Axios.get(SUPER_NODE_ENDPOINT + "/peers")
        .then((res) => {
          if (res.status === 200) {
            console.log("Connecting to peers");
            console.log(res.data);
            // setP2pAddress(res.data);
            console.log(res.data.length);
            for (let i = 0; i < res.data.length; ++i) {
              addPeer(res.data[i]);
            }
          } else {
            console.log("Fail to connect to peers");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const UIMessageTypeEnum = {
      ADD_BLOCK_TO_CHAIN: 0,
      UPDATE_TRANSACTION_POOL: 1,
      UPDATE_BALANCE: 2,
    };

    const newSocket = io(UI_SOCKET_ENDPOINT, {
      timeout: 20000,
    });
    newSocket.on("message", (data) => {
      console.log("data:", data);
      let message = JSON.parse(data);
      console.log("Message: " + message);
      switch (message.type) {
        case UIMessageTypeEnum.ADD_BLOCK_TO_CHAIN:
          getBlockchain();
          getBalance();
          getTransactionHistory();
          break;
        case UIMessageTypeEnum.UPDATE_TRANSACTION_POOL:
          getTransactionPool();
          getTransactionHistory();
          break;
        case UIMessageTypeEnum.UPDATE_BALANCE:
          getBalance();
          break;
        default:
          console.log("Wrong UI message type");
      }
    });

    const init = async () => {
      await getBalance();
      await getAddress();
      await getTransactionPool();
      await getBlockchain();
    };

    init();
  }, []);
  const handleClickMineBlock = async () => {
    await Axios.post(SERVER_ENDPOINT + "/mineBlock").then((res) => {
      if (res.status === 400) {
        Swalert.fire({
          icon: "error",
          text: "Unable to mine",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.status === 200) {
        // console.log("Success");
        getBlockchain();
        getBalance();
        getTransactionPool();

        Swalert.fire({
          position: "top-end",
          icon: "success",
          text: "Mine success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleTransactionAddress = (e) => {
    setTransactionAddress(e.target.value);
    console.log("address:", transactionAddress);
  };

  const handleTransactionCoin = (e) => {
    setTransactionCoin(e.target.value);
    console.log("transactionCoin:", transactionCoin);
  };

  const onSendTransaction = async () => {
    console.log("Address = " + transactionAddress);
    console.log("Amount = " + transactionCoin);
    await Axios.post(SERVER_ENDPOINT + "/sendTransaction", {
      address: transactionAddress,
      amount: parseFloat(transactionCoin),
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);

        Swalert.fire({
          icon: "success",
          text: "Transaction has been sent to transaction pool",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log(res.data);
        Swalert.fire({
          icon: "error",
          text: res.data,
        });
      }
    });
  };
  const getDifficulty = () => {
    if (blockchain.length === 0) {
      return 0;
    }
    return blockchain[0].difficulty;
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={3}>
            <Card sx={{ display: "flex", mt: 3, color: "#5A78EE" }}>
              <CardMedia
                component="img"
                sx={{ width: 130 }}
                image={addressImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    Address
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={3.5}>
                      <TextAddress>{address}</TextAddress>
                    </Grid>
                    <Grid item xs={8.5}></Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ display: "flex", mt: 3, color: "#5A78EE" }}>
              <CardMedia
                component="img"
                sx={{ width: 130 }}
                image={balanceImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    Balance
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={3.5}>
                      <Typography>COIN:{coin}</Typography>
                    </Grid>
                    <Grid item xs={8.5}></Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ display: "flex", mt: 3, color: "#5A78EE" }}>
              <CardMedia
                component="img"
                sx={{ width: 130 }}
                image={networkImage}
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    Network
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={11.5}>
                      <Typography>
                        current block:#{blockchain.length}
                      </Typography>
                      <Typography>Difficulty:{getDifficulty()}</Typography>
                    </Grid>
                    <Grid item xs={0.5}></Grid>
                  </Grid>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={6}>
            <Typography variant="h4">Send transaction</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography sx={{ mt: 4 }}>Amount</Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    sx={{ mt: 2, mr: 3 }}
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    onChange={handleTransactionCoin}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography sx={{ mt: 4 }}>To address</Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    sx={{ mt: 2, mr: 3 }}
                    id="outlined-basic"
                    label="To address"
                    variant="outlined"
                    fullWidth
                    onChange={handleTransactionAddress}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" onClick={onSendTransaction}>
                    Send transaction
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" onClick={handleClickMineBlock}>
                    Mine Block
                  </Button>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4">History Transaction</Typography>
                  <TextAddressTransaction>
                    {transactionHistory.slice(0, 10).map((e) => {
                      if (e.index !== 0) {
                        return cloneElement(<TransactionInfo txInfo={e} />);
                      } else {
                        return <div />;
                      }
                    })}
                  </TextAddressTransaction>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h4">Latest block</Typography>
            {blockchain.slice(0, 10).map((e) => {
              if (e.index !== 0) {
                return cloneElement(<LatestBlock timeMineBlock={e} />);
              } else {
                return <div />;
              }
            })}
          </Grid>

          <Grid item xs={1.5}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Information;
