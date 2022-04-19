import './Faction.css';
import React, { useState } from 'react';
import { Population } from './components/Population';
import { Resources } from './components/Resources';
import { Coins } from './components/Coins';
import { TradeRequest } from './components/TradeRequest';
import axios from 'axios';

const Faction = (props) => {
  const [motto, setMotto] = useState()
  const [tradeReqs, setTradeReqs] = useState([]);

  const getMotto = async () => {
    try {
        const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.id}/`);
        setMotto(res.data.motto);
    } catch(e) {
        console.log(e);
      }}
  getMotto(); 

  const callRequests = async () => {
      try {
          console.log("Faction.js callRequest()")
          const res = await axios.get(`https://faction-backend.herokuapp.com/trades/${props.id}/`);
          var data = [...res.data];
          setTradeReqs(data);
          console.log("Faction.js tradeReqs", tradeReqs);
      } catch(e) {
          console.log(e);
  }}

  // useEffect(() => {
  //   callRequests()
  // }, [])

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

  callRequests()

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
              <div class="col-sm col-6 col-margin-right">
              <Resources id={props.id}/>
              </div>
              <div class="col-sm col-6 col-margin-left">
              <Population id={props.id}/>
              </div>
            </div>
            <div class="row">
            <Coins id={props.id}/>
            </div>
          </div>
          <div class="container flex trading-cont">
            <h4 class={`component-font-${props.id}-style  title-font-${props.id}`}>Trade Requests <span><button class="btn btn-req" onClick={callRequests}><i class="fa-solid fa-arrows-rotate"></i></button></span></h4> 
            {
              tradeReqs.length > 0 ? 
              tradeReqs.map((t, index) => {
                return(
                      <TradeRequest 
                      id={t._id}
                      trade_id={t._id}
                      buyer={getFactionName(t.buyer)} 
                      sellerResource={t.seller_resource}
                      sellerQuantity={t.seller_qty}
                      buyerPayment={t.buyer_payment}
                      callback = {callRequests}
                    />
                );})
              : ""
            }
          </div>
      </div>
    </div>
  );
}

export { Faction };
