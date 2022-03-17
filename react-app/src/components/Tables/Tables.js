import './Tables.css'
import home_background from "../../images/svg/home_background.svg";
import { useState, useEffect } from "react";
import fire_table from "../../images/png/fire_table.png";
import axios from "axios";
import Header from "../Header/Header";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];
function Tables(props) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tables, setTables] = useState([]);
  const [rewards, setRewards] = useState([]);
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
      checkWalletIsConnected();
  }, []);
  const renderNotConnectedContainer = () => (
    <button className="header_margin_member connect_wallet_button_table" onClick={checkWalletIsConnected}>
      Connect to Wallet
    </button>
  );
    // const tables = [{"name":"Table 1","type":"taxeas","players":3},{"name":"Table 2","type":"taxeas","players":3}];
    
    const getTableList = () => {
      // console.log("in table list");
        const baseUrl = process.env.REACT_APP_RESTAPI_URL;
            axios.get(baseUrl+'/api/tables')
            // axios.get('http://localhost:8111/api/tables')
              .then((response) => {
                // console.log("response",response);
                  if(response && response.data){
                    if(response.data.tableList && response.data.tableList.length > 0){
                      setTables(response.data.tableList);
                    }else{
                      setTables(response.data);
                    }
                    if(response.data.rewards && response.data.rewards.length > 0){
                      setRewards(response.data.rewards);
                    }
                  }
              }, (error) => {
                console.log(error);
              });
    }
    // const interval = setInterval(getTableList, 20000);
    useEffect(() => {
      setTimeout(() => {
         getTableList();
      },0)
      console.log(`initializing interval`);
      const interval = setInterval(() => {
        getTableList();
      }, 20000);
      return () => {
        console.log(`clearing interval`);
        clearInterval(interval);
      };
      }, []);

      const playPoker = (tableid) =>{
        const pokerUrl = process.env.REACT_APP_POKER_GAME_URL+"?guid="+walletAddress+"&tableid="+tableid;
        console.log("pokerUrl",pokerUrl)
        window.open(pokerUrl);
      }
    return (
      <div
      className="game_container"
      style={{ backgroundImage: `url(${home_background})` }}
    >
      <Header renderNotConnectedContainer={renderNotConnectedContainer} walletAddress={walletAddress}/>
        <div className='tables_content'>
            <div className='tables'>
            <div className='table_title'>Tables</div>
           <div className='table_background'>
               <div className='table_header'>
            <div className='table_header_div'>
            <div className='table_col'>Table Name</div>
      <div className='table_col'>Type</div>
      <div className='table_col'>Players</div>
      <div></div>
            </div>  
            </div>
            <div className={(tables.length < 5 ? "no_scroll" : "")+ ' table_body_div'}>{tables.map((data) => {
          return (<><div className='table_body_content '>
            <div className='table_col'>{data.name}</div>
            <div className='table_col'>Texas Hold’em</div>
            <div className='table_col'>{data.numPlayers}/{data.maxPlayers}</div>
            <div className='join_table_button' onClick={() =>playPoker(data._id)}>Join Table</div>
          </div>
          <div className='border_line'></div>
          </>)
      })} 
      </div>
      <div className='table_footer_content'>*New tables will be added when above are filled.</div>
           </div>
           </div>

           <div className='tables'>
            <div className='table_title'>Daily Leader Board</div>
           <div className='table_background'>
               <div className='table_header'>
            <div className='table_header_div'>
            <div className='table_col'>Rank</div>
      <div className='table_col'>Player Name</div>
      <div className='table_col'>Table Chips<i class="fa fa-info-circle pad_l5" aria-hidden="true"></i></div>
      <div className='table_col'>Multiplier</div>
      {/* <div className='table_col'>Total Score <i class="fa fa-info-circle pad_l5" aria-hidden="true"></i></div> */}
      <div className='table_col'>FIRE Winnings <i class="fa fa-info-circle pad_l5" aria-hidden="true"></i></div>
      <div className='table_col'>Daily Missions <i class="fa fa-info-circle pad_l5" aria-hidden="true"></i></div>
            </div>  
            </div>
            <div className={(rewards.length < 4 ? "no_scroll" : "")+ ' table_body_div'}>{rewards.map((data) => {
          return (<><div className='table_body_content '>
            <div className='table_col'>{data.rank}</div>
            <div className='table_col'>{data.guid}</div>
            <div className='table_col'>{data.profitLoss}</div>
            <div className='table_col'>{data.percentile}x</div>
            {/* <div className='table_col'>{data.maxPlayers}</div> */}
            <div className='table_col'>{data.fireWinning}<img src={fire_table} className="fire_table" alt="logo" /></div>
            <div className='table_col'>{data.dailyMission}</div>
          </div>
          <div className='border_line'></div>
          </>)
      })} 
      </div>
           </div>
           </div>
        </div>
        </div>
    );
}

export default Tables;
