import "./Header.css";
import logo from '../../images/png/logo.png';
import arrow_up_right from '../../images/png/arrow_up_right.png';
import { useNavigate } from 'react-router-dom';
function Header(props) {
  let navigate = useNavigate();
  
  const redirectNftMint = () =>{
    navigate("/MintNft");
  }

  const openDocs = () =>{
    window.open("https://pokerdocs.badbeat.com/");
  }
  return (
      <div>
        <div className='home_header'></div>
            <div className='home_header_content'>
                <img src={logo} className="home_logo" alt="logo" />
                 {/* <div className='home_docs'>Docs
                  <img src={arrow_up_right} className="home_header_up_arrow" alt="logo" onClick={() => openDocs()}/>
                </div>  */}
                
                <div></div>
                <div className='header_member_link' onClick={() => openDocs()}>Docs
                  <img src={arrow_up_right} className="home_header_up_arrow" alt="logo"/>
                </div> 
                {props.tableFlag && <div className="header_member_link" onClick={() => redirectNftMint()}>MEMBERSHIP NFT’s</div>}
                {!props.walletAddress && props.renderNotConnectedContainer()}
                {props.walletAddress && <div className={ "header_margin_member header_wallet"}>
                    {/* <i class="fa fa-angle-down header_wallet_icon" aria-hidden="true"></i> */}
                    { props.walletAddress.substring(0, 5) +
              '...' +
              props.walletAddress.substring(
                props.walletAddress.length - 5,
                props.walletAddress.length
              )}
                </div>}
            </div>
      </div>
  );
}

export default Header;
