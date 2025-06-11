// hooks/useWallet.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) return;

      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(_provider);

      const accounts = await _provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setUserAddress(ethers.utils.getAddress(accounts[0]));
      }

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setUserAddress(ethers.utils.getAddress(accounts[0]));
        } else {
          setUserAddress(null);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    };

    init();
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
