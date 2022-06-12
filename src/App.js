import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/components/Home";
import Layout from "./components/Layout";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import Information from "./components/Informations/Information";
function App() {
  //test cicd
  //testsssssss
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/information" element={<Information />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
