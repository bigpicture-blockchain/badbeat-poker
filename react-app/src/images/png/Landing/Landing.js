import './Landing.css';
import home_background from '../../images/svg/home_background.svg';
import logo from '../../images/png/logo.png';
import discord from '../../images/png/discord.png';
import fire_home from '../../images/png/fire_home.png';
import arrow_up_right from '../../images/png/arrow_up_right.png';
import React, { useState, useEffect } from "react";
import axios from "axios";
function Landing() {
    const [email, setEmail] = useState("");
    const [solanaAdrress, setSolanaAdrress] = useState("");

    const twitterClicked = () =>{
        window.open("https://twitter.com/BB_PokerClub");
    }
    const discordClicked = () =>{
        window.open("https://discord.gg/QdSDn58n");
    }

    const sendEmail = () => {
        const baseUrl = process.env.REACT_APP_RESTAPI_URL;
        if(email && solanaAdrress){
            axios.post(baseUrl+'/api/saveEmail', {
                userEmail: email,
                userSolanaAdd: solanaAdrress
              })
              .then((response) => {
                  alert("Email added Successfully")
                console.log(response);
              }, (error) => {
                console.log(error);
              });
        }
    }
    return (
        <div className='home_container' style={{ backgroundImage: `url(${home_background})` }}>
            <div className='home_header'></div>
            <div className='home_header_content'>
                <img src={logo} className="home_logo" alt="logo" />
                 {/* <div className='home_docs'>Docs
                <img src={arrow_up_right} className="home_header_up_arrow" alt="logo" />
                </div>  */}
            </div>
            <div className='home_content'>
            <img src={fire_home} className="home_fire_logo" alt="logo" />
                <div className='home_coming_soon'>
                    Coming Soon
                </div>
                <div className='home_our_website'>
                    Enter your email address to keep up to date and your Solana address to be in with a chance of being added to our whitelist.
                </div>
                <div className='home_input_div'>
                        <div><input
                            type="text"
                            className="home_input"
                            value={email}
                            placeholder="Enter Email Address…"
                            data-e2e="transaction_fee"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="home_input home_input_ml"
                            value={solanaAdrress}
                            placeholder="Enter Solana Address…"
                            data-e2e="transaction_fee"
                            onChange={(e) => {
                                setSolanaAdrress(e.target.value);
                            }}
                        />
                        </div>
                    {/* <div className='home_notify_me'>
                        <div className='home_notify_me_div'>Notify me</div>
                    </div> */}
                </div>
                <div className='register_button' onClick={() => sendEmail()}>Register</div>
                <div className='home_border_bottom'></div>
                <div className='home_discord_twitter'>
                    <div className='home_discord home_discord_content' onClick={() => discordClicked()}>Join Our Discord! 
                    <img className='home_discord_icon' src={discord}  alt="logo" />
                    </div>
                    <div className='home_twitter home_discord_content' onClick={() => twitterClicked()}>Follow us on Twitter <i className="fa fa-twitter home_twitter_icon"></i></div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
