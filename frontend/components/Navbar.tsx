import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/videre-logo.png";
import { IoMdAdd } from "react-icons/io";
import { MetaMaskSDK } from '@metamask/sdk';


const Navbar = () => {
   const [currentAccount, setCurrentAccount] = useState("");

   const options = {
     dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
     injectProvider: true
   };
 
   const MMSDK = new MetaMaskSDK(options);
   const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
 
   const connectWallet = async () => {
     try {
       // Request user accounts from MetaMask
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
 
       // Update the current account state variable
       setCurrentAccount(accounts[0]);
     } catch (error) {
       console.error("Error connecting wallet:", error);
     }
   };
 
   useEffect(() => {
     const checkMetaMask = async () => {
       if (ethereum && ethereum.isConnected()) {
         // Request the current accounts from MetaMask
         const accounts = await ethereum.request({ method: 'eth_accounts' });
 
         // Update the current account state variable
         setCurrentAccount(accounts[0]);
       }
     };
 
     checkMetaMask();
   }, []);

   
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[50px] md:w-[65px]">
          <Image className="cursor-pointer" src={Logo} alt="Videre" />
        </div>
      </Link>

      <div className="flex items-center space-x-2">
      {!currentAccount ? (
        <button className=" border-2 px-2 md:px-6 py-2 md:py-3 bg-blue-400 text-white text-md font-semibold flex items-center gap-2 rounded-full hover:scale-110 hover:bg-blue-500 hover:text-white transition-all duration-200" 
        onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected Account: {currentAccount}</p>
      )
      
      }
      </div>
      </div>)}

      {/* <Link href="/upload">
        <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
          <IoMdAdd className="text-xl" />{" "}
          <span className="hidden md:block">Upload</span>
        </button>
      </Link> */}

export default Navbar;
