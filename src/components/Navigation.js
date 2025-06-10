import { useWallet } from "../hooks/useWallet";

const Navigation = () => {
  const { userAddress, connect } = useWallet();

  return (
    <nav>
      <div className="nav__brand">
        <h1>tokenmaster</h1>

        <input
          className="nav__search"
          type="text"
          placeholder="Find millions of experiences"
        />

        <ul className="nav__links">
          <li>
            <a href="/">Concerts</a>
          </li>
          <li>
            <a href="/">Sports</a>
          </li>
          <li>
            <a href="/">Arts & Theater</a>
          </li>
          <li>
            <a href="/">More</a>
          </li>
        </ul>
      </div>

      {userAddress ? (
        <button type="button" className="nav__connect">
          {userAddress.slice(0, 6) + "..." + userAddress.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connect}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
