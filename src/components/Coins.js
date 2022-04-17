import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

const Coins = (props) => {

    const [coin, setCoin] = useState(0); 

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const callCoin = async () => {
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.id}/`);
            setCoin(res.data.coins); 
        } catch(e) {
            console.log(e);
    }}

    useEffect(() => {
        callCoin();
        const intervalId = setInterval(callCoin, 60000);   
        return () => {
            console.log("Cleaning up Coin");
            clearInterval(intervalId);
        }
    }, []);

    return (
        <div id="coins-div">
            <h3 class={`component-font-${props.id}-style  title-font-${props.id}`}>Faction Treasury: <span class={`coin-font-style body-font-${props.id}`}>{numberWithCommas(coin)} Sols</span></h3>
        </div>
    );
  }

export {Coins};