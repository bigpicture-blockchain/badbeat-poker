import "./Home.css";
import home_background from "../../images/svg/home_background.svg";
import Purchase from "../Purchase/Purchase";
import Header from "../Header/Header";
import Tables from "../Tables/Tables";
import MintNft from '../MintNft/MintNft'
import ConnectPhantom from '../ConnectPhantom/ConnectPhantom'
import members_nft from "../../images/png/members_nft.png";
import logo from '../../images/png/logo.png';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import arrow_up_right from '../../images/png/arrow_up_right.png';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import ProgressBar from "../ProgressBar/ProgressBar"
import { propTypes } from "react-bootstrap/esm/Image";
const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];

function Home(props) {
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [purchaseFlag, setPurchaseFlag] = useState(false);
  const [buyMemberFlag, setBuyMemberFlag] = useState(false);
  const [phantomFlag, setPhantomFlag] = useState(false);
  const [nftMintFlag,setNftMintFlag] = useState(false);
  let navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setPurchaseModal(true);
          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      if (solana.isPhantom) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      if(response && response.publicKey){
        if(localStorage.getItem("walletConnected")){
          setPurchaseFlag(false);
        }else{
          setPurchaseFlag(true);
          localStorage.setItem("walletConnected",true);
        }
        setPurchaseModal(true);
      }
      
      setWalletAddress(response.publicKey.toString());
    }else{
      console.log("no phantom");
      window.location.reload();
    }
    }else{
      setPhantomFlag(true);
    }
  };

  

  const renderNotConnectedContainer = () => (
    <button className="header_margin_member connect_wallet_button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  const playPoker = () =>{
    let firstNft = localStorage.getItem("firstNft");
      if(firstNft){
        navigate('/Tables');
      }else{
        setBuyMemberFlag(true)
      }
      setPurchaseModal(false);
  }
  useEffect(() => {
    if(buyMemberFlag){
      navigate('/MintNft');
    }
  }, [buyMemberFlag]);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div
      className="game_container"
      style={{ backgroundImage: `url(${home_background})` }}
    >
      <Header renderNotConnectedContainer={renderNotConnectedContainer} walletAddress={walletAddress}/>
        <div className="connect_wallet_content">
          <div className="new_era"> A New Era of Poker</div>
          <div className="connect_wallet_blockchain mt-4 mb-5">
            Blockchain technologies have opened a new frontier for online
            gaming, connect your wallet to get started on your new poker
            journey!
          </div>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
      {purchaseModal && <Purchase purchaseFlag={purchaseFlag} playPoker={playPoker}/>}
      {phantomFlag && <ConnectPhantom setPurchaseFlag={setPurchaseFlag} setPhantomFlag={setPhantomFlag} connectWallet={connectWallet}/>}
      {/* <ProgressBar /> */}
    </div>
  );
}

export default Home;
