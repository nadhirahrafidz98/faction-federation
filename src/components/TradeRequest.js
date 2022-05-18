import React from 'react';
import './styles.css';
import $ from 'jquery';
import axios from 'axios';

// prop is faction ID
const TradeRequest = (props) => {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleReject = async() => {
        const button_id = '#accept'.concat(props.id)
        $(button_id).attr("disabled", true);
        try {
            const body = {
                id: props.id,
                status: -1
            }
            await axios.patch('https://faction-backend.herokuapp.com/trades/update', body).then((res) =>{
                if(res.status === 200){
                    console.log("Props id", props.id);
                    props.callback();
                }; 
            }).catch((error) => {
                console.log("Reject trade error", error)
            })
        } catch(e) {
            console.log(e);}
    }

    const handleAccept = async() => {
        const button_id = '#reject'.concat(props.id)
        $(button_id).attr("disabled", true);
        try {
            const body = {
                id: props.id,
                status: 1
            }
            const res = await axios.patch('https://faction-backend.herokuapp.com/trades/update', body);
            if(res.status === 200){
                console.log("Props id", props.id);
                props.callback();
            }
        } catch(e) {
            console.log(e);}
    }
    
    return (
        <div class="trade-alert-cont animate__animated animate__bounceIn" id={props.id}>
            <div class="alert alert-warning trade-alert" role="alert">
                <h5 class="spectral-font">Trade Request from <strong>{props.buyer}</strong></h5>
                <div class="spectral-font">
                <p class="quantity-p"><strong>Requesting for {props.sellerResource}</strong></p>
                <p>Quantity: {numberWithCommas(props.sellerQuantity)} units</p>
                <p class="quantity-p">Payment offered: <strong>{props.buyerPayment} Sols</strong></p>
                <button class="btn btn-sm btn-success" id={"accept".concat(props.id)} onClick={handleAccept}>Accept</button>
                <button class="btn btn-sm btn-danger" id={"reject".concat(props.id)} onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    );
  }

export {TradeRequest};

