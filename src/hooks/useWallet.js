// hooks/useWallet.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        const address = ethers.utils.getAddress(accounts[0]);
        setUserAddress(address);
      } else {
        setUserAddress(null);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connect = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const address = ethers.utils.getAddress(accounts[0]);
    setUserAddress(address);
  };

  return { provider, userAddress, connect };
}
