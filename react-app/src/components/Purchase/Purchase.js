import { Modal } from 'react-bootstrap';
import './Purchase.css'
// import BBLogo from '../../images/png/BBLogo.png';
import fire_home from '../../images/png/fire_home.png';
import { useState, useEffect } from "react";
function Purchase(props) {
    const [modalData, setModalData] = useState(null);
    const welcomeData = {
        "title":"Welcome!",
        "desc":"To play with BadBeat you must hold a members NFT in your wallet.",
        "button":"Get Membership"
    }
    const welcomeBackData = {
        "title":"Welcome back!",
        "desc":"You have your members pass in your wallet, click bellow to hit the tables!",
        "button":"Play Poker"
    }
    const nftMintedData = {
        "title":"NFT Minted!",
        "desc":"You have minted your members pass, click below to hit the tables!",
        "button":"Play Poker"
    }
    useEffect(() => {
        console.log("data",props);
        if(props.purchaseFlag){
            setModalData(welcomeData)
        }else if(props.nftMintFlag){
            setModalData(nftMintedData)
        }else{
            setModalData(welcomeBackData)
        }
      }, []);
    return (
        <div>
            <style>
              {"\
                .modal-content{\
                    background-color: #2E2E2E;\
                    border-radius: 10px;\
                }\
                "}
                </style>
            <Modal show={true} className="purchase_modal">
                <Modal.Body className="purchase_modal_body">
                    <img src={fire_home} className="purchase_logo" alt="logo" />
                    <div className='purchasd_welcome_back mt-3'>{modalData && modalData.title}</div>
                    <div className='purchase_content mt-3'>{modalData && modalData.desc}</div>
                    <div className='modal_button' onClick={() => props.playPoker()}>
                        <div className='modal_button_content'>{modalData && modalData.button}</div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Purchase;
