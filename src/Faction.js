import './Faction.css';
import React, { useState, useEffect } from 'react';
import { Resources } from './components/Resources';
import { TradeRequest } from './components/TradeRequest';
import axios from 'axios';
import { io } from "socket.io-client";

const Faction = (props) => {
  const [motto, setMotto] = useState()
  const [tradeReqs, setTradeReqs] = useState([]);
  const [coin, setCoin] = useState(0); 

  const broadcast = () => {
    const factionSocket = io(`https://faction-backend.herokuapp.com/faction${props.id}`, { autoConnect: true });
    
    factionSocket.on("faction-handshake", (...args) => {
      console.log(args);
    });

    factionSocket.on("coin", (...args) => {
      console.log("Updated coins", args[1]);
      setCoin(args[1].coins); 
    });

    factionSocket.on('connect_error', ()=>{
      setTimeout(()=>factionSocket.connect(),5000)
    })
  }

  const getMottoCoins = async () => {
    try {
        const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.id}/`);
        setMotto(res.data.motto);
        setCoin(res.data.coins); 
    } catch(e) {
        console.log(e);
      }}

  const callRequests = async () => {
      try {
          const res = await axios.get(`https://faction-backend.herokuapp.com/trades/${props.id}/`);
          const res_coin = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.id}/`);
          var data = [...res.data];
          setTradeReqs(data);
          setCoin(res_coin.data.coins); 
      } catch(e) {
          console.log(e);
  }}

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    getMottoCoins(); 
    callRequests();
    broadcast();
  }, [])

  const getFactionName = (id) => {
    switch(id){
      case 1:
        return "Rivia";
      case 2: 
        return "Althea";
      case 3:
        return "Sudaria";
      case 4: 
        return "Redania";
      case 5:
        return "Aeri";
      default:
        return "";
    }}

  return (
    <div class={`main-cont main-bg-${props.id}`}>
      <div class="solo-page-cont">
        <div class="title-cont">
          <img class="logo_img" alt="Faction logo" src={"/logo/".concat(props.id).concat(".png")}/>
          <div>
            <div class="row">
              <h1 class={`title-font-${props.id}-style title-font-${props.id}`}>{props.name}</h1>
            </div>
            <div class="subtitle row">
              <h6 class={`subtitle-font-${props.id}`}>{motto}</h6>
            </div>
        </div>
        </div>

          <div class="container double-col-cont">
            <div class="row">
              <div class="col-sm col-5 col-margin-right">
              <Resources id={props.id}/>
              </div>
              <div class="col-sm col-7 col-margin-left">
                {/* <Population id={props.id}/> */}
                <div id="coins-div">
                  <h3 class={`component-font-${props.id}-style  title-font-${props.id}`}>Treasury: <span class={`coin-font-style body-font-${props.id}`}>{numberWithCommas(coin)} Sols</span></h3>
                </div>
                <div class="flex parent-trading-cont">
                <h4 class={`component-font-${props.id}-style  title-font-${props.id}`}>Trade Requests <span><button class="btn btn-req" onClick={callRequests}><i class="fa-solid fa-arrows-rotate"></i></button></span></h4>
                  <div class="trading-cont"> 
                  {
                    tradeReqs.length > 0 ? 
                    tradeReqs.map((t, index) => {
                      return(
                            <TradeRequest
                            key={t._id}
                            id={t._id}
                            trade_id={t._id}
                            buyer={getFactionName(t.buyer)} 
                            sellerResource={t.seller_resource}
                            sellerQuantity={t.seller_qty}
                            buyerPayment={t.buyer_payment}
                            callback = {callRequests}
                          />
                      );})
                    : <p>There are no incoming trade requests</p>
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export { Faction };
