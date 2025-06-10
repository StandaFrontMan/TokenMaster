import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";

// ABIs
import TokenMasterABI from "./abis/TokenMaster.json";

// Config
import config from "./config.json";
import { useWallet } from "./hooks/useWallet";

function App() {
  const { provider, userAddress } = useWallet();
  const [tokenMaster, setTokenMaster] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      if (!provider) return;

      const network = await provider.getNetwork();
      const contractAddress = config[network.chainId]?.TokenMaster?.address;

      if (!contractAddress) {
        console.error(
          "TokenMaster address not found for network:",
          network.chainId
        );
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        TokenMasterABI,
        provider
      );

      setTokenMaster(contract);
    };

    loadContract();
  }, [provider]);

  return (
    <div>
      <header>
        <Navigation />

        <h2 className="header__title">
          <strong>Event</strong> Tickets
        </h2>
      </header>

      {/* <Sort />

      <div className='cards'>
        {occasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            tokenMaster={tokenMaster}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )} */}
    </div>
  );
}

export default App;
