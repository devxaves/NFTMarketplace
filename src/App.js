//import "./style.css";
import Navbar from "./components/Navbar";
import HomeComponent from "./components/HomeComponent";
import FooterComponent from "./components/FooterComponent";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProjectComponent from "./components/CreateProjectComponent";
import ConnectWallet from "./components/ConnectWallet";
import DiscoverComponent from "./components/DiscoverComponent";
import ProjectComponent from "./components/ProjectComponent";
import ProfileComponent from "./components/ProfileComponent";
import { useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi";
import AOS from 'aos';
import 'aos/dist/aos.css';






const CONTRACT_ADDRESS = "0x10EB151dDE347C7bb9D481fabAc413e51C7eB2b7";

function App() {
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();
  let provider, signer, add;

  async function changeNetwork() {
    // switch network 
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xe705" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xe705",
                chainName: "lineasepolia",
                nativeCurrency: {
                  name: "lineasepolia",
                  symbol: "LineaETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.linea.build"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in adding network");
        }
      }
    }
  }

  // Connects to Metamask and sets the myContract state with a new instance of the contract
  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      add = await signer.getAddress();
      setAddress(add);

      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

  // Helps open Metamask
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }
  const checkConnected = (component) => {
    return !myContract ? (
      <ConnectWallet connectMetamask={connect} />
    ) : (
      component
    );
  };
  return (
    <>
    
    <div className="app w-full min-h-full">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      {myContract? <Navbar address={address} isConnected={true}/> : <Navbar/>}
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <Routes>
            <Route
              path="/"
              element={checkConnected(<HomeComponent contract={myContract} />)}
            />
            <Route
              path="create_project"
              element={checkConnected(
                <CreateProjectComponent contract={myContract} />
              )}
            />
            <Route
              path="discover"
              element={checkConnected(
                <DiscoverComponent contract={myContract} />
              )}
            />
            <Route
              path="profile"
              element={checkConnected(
                <ProfileComponent contract={myContract} userAddress={address} />
              )}
            />
            <Route
              path="project"
              element={checkConnected(
                <ProjectComponent contract={myContract} userAddress={address} />
              )}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
    </>
  );
}


export default App;
