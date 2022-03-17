import "./MintNft.css";
import home_background from "../../images/svg/home_background.svg";
import members_nft from "../../images/png/members_nft.png";
import logo from "../../images/png/logo.png";
import Purchase from "../Purchase/Purchase";
import { useState, useEffect } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import CandyMachine from "../CandyMachine";
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];
function MintNft(props) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [purchaseModal,setPurchaseModal] = useState(false);
  const [nftMinted,setNftMinted] = useState(false);
  let navigate = useNavigate();
  const checkWalletIsConnected = async () => {
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

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        // alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
   let firstNft = localStorage.getItem("firstNft");
   if(firstNft){
    setNftMinted(true);
   }
      checkWalletIsConnected();
  }, []);
  const renderNotConnectedContainer = () => (
    <button className="header_margin_member connect_wallet_button" onClick={checkWalletIsConnected}>
      Connect to Wallet
    </button>
  );

  const openModal = () =>{
    localStorage.setItem("nftKey","sdadasdasda");
    setPurchaseModal(true)
  }
  const playPoker = () =>{
    navigate("/Tables");
  }
  return (
    <div
    className="game_container"
    style={{ backgroundImage: `url(${home_background})` }}
  >
    <Header renderNotConnectedContainer={renderNotConnectedContainer} walletAddress={walletAddress}/>
    <div className="member_content">
      <div className="member_chimp_image_div">
        <img src={members_nft} className="member_chimp_image" alt="logo" />
        {/* <div className="membership_nft">Membership NFT</div> */}
      </div>
      <div className="connect_wallet_blockchain">
        To play with BadBeat you must hold a members NFT in your wallet. Click
        bellow to purchase your NFT!
      </div>
      {/* <div className="mint_button mt-5" onClick={() => openModal()}>Mint Members NFT</div> */}
      {!nftMinted && <CandyMachine walletkey={walletAddress} walletAddress={window.solana} />}
      {/* <div className="view_members mt-5">
        View member NFT’s in secondary market
      </div> */}
    </div>
    {purchaseModal && <Purchase nftMintFlag={true} playPoker={playPoker}/>}
    </div>
  );
}

export default MintNft;
