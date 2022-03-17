import { Modal } from 'react-bootstrap';
import './ConnectPhantom.css'
import phantom from '../../images/png/phantom.png';
function ConnectPhantom(props) {
    const downloadPhantom = () =>{
        props.setPhantomFlag(false);
        // props.setPurchaseFlag(true);
        window.open("https://phantom.app/");
    }
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
            <Modal show={true} className="phantom_modal">
                <Modal.Body className="phantom_modal_body">
                    <img src={phantom} className="phantom_logo" alt="logo" />
                    <div className='connect_phantom_wallet_button mt-4' onClick={() => props.connectWallet()}>
                        <div className='connect_phantom_wallet'>Connect Phantom Wallet</div>
                    </div>
                    <div className='or_download_here' onClick={() => downloadPhantom()}>Or download here</div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ConnectPhantom;
