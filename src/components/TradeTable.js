import React, {useState, useEffect} from 'react';
import './styles.css';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';


// prop is faction ID
const TradeTable = (props) => {

    const [show, setShow] = useState(false);
    // BUYER
    const [senderFaction, setSenderFaction] = useState(0);
    const [senderResources, setSenderResources] = useState([]);
    const [senderResourceQty,setSenderResourceQty] = useState(0); 

    // Current quantity of resourced being requested
    const [desiredResourceQty,setDesiredResourceQty] = useState(0); 
    // 0 for unchecked, 1 for true match, -1 for false match
    const [keyMatch, setKeyMatch] = useState(0);

    const factions = [["", 0], ["Rivia",1], ["Althea",2], ["Sudaria",3], ["Redania",4], ["Aeri",5]];
    var modalTitle = "Trade request to ".concat(factions[parseInt(props.faction)][0]); 

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const callResource = async (id) => {
        if(id === 0) setSenderResources([]); 
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${id}/resources/`);
            var data = [...res.data];
            setSenderResources(data); 
        } catch(e) {
            console.log(e);}
        }
    
    
    const handleSelectFaction = (event) => {
        setSenderFaction(event.target.value);
    }

    useEffect(() => {
        callResource(senderFaction);
    }, [senderFaction])

    const handleButtonTrade = async() => {
        setShow(true)
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.faction}/${props.resource}`);
            setDesiredResourceQty(res.data.rsrcQty);
        } catch(e) {
            console.log(e);
    }}

    const validateKey = async (event) => {
        const key = event.target.value;
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${senderFaction}/`);
            const realKey = res.data.tradeKey; 
            if(realKey !== key){
                setKeyMatch(-1);
                return;
            } 
            setKeyMatch(1); 
        } catch(e) {
            console.log(e);
        }}
    
    const submitTrade = async (event) => {
        event.preventDefault();
        if(keyMatch === 1)
        {
            const body = {
                buyer: senderFaction,

                seller: props.faction,
                seller_resource: props.resource,
                seller_qty: event.target[3].value,

                buyer_payment: event.target[2].value}
            try {
                const req = await axios.post('https://faction-backend.herokuapp.com/submittrade', body).then((res) =>{
                if(res.status === 200){
                    setShow(false);
                    props.callback(true, props.faction);
                    return
                }});
            } catch(e){
                console.log(e);}
        }
        else
        {
            $('label').addClass(['animate__animated', 'animate__headShake']);
            setTimeout(()=> {
                $('label').removeClass(['animate__animated', 'animate__headShake']);
            }, 700)
        }};

    useEffect(() => {
        setKeyMatch(0);
        setSenderResourceQty(0); 
        setDesiredResourceQty(0);
        setSenderFaction(0);
    }, [show])

    return (
        <div>
        <div class="card card-cont">
            <LazyLoadImage
            effect="blur"
            alt={"Image of ".concat(props.resource)}
            height={200}
            width={295}
            src={"/trade/".concat(props.resource).concat("-min.jpeg")}>
            </LazyLoadImage>
            {/* <img class="card-img-top" src={"/trade/".concat(props.resource).concat("-min.jpeg")} alt={"Image of ".concat(props.resource)}/> */}
            <div class="card-body">
                <h5 class="card-title im-fell-font font-25">{props.resource}</h5>
                <h6 class="spectral-font">{`Selling: ${numberWithCommas(props.quantity)} units`}</h6>
                <h6 class="spectral-font">{`Market Value per Unit: ${numberWithCommas(props.market_val)} Sols`}</h6>
                <div class="row spectral-font">
                    <button class="btn btn-warning btn-block button-trade" onClick={handleButtonTrade}><strong>Buy</strong></button>
                </div>
            </div>
        </div>

        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="trade-modal-title"
            size="lg"
            class="animate__animated animate__fadeInDown"
            >
        <Modal.Header closeButton>
          <Modal.Title>
              <h3 id="trade-modal-title" class="im-fell-font">{modalTitle} <i class="fa-solid fa-handshake-simple"></i></h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form class="spectral-font" onSubmit={submitTrade}>

                <div class="form-group row">

                    <div class="col-6 padding-alignment" id="trade-requester-div">
                    <label htmlFor="trade-from-select" id="request-label">Buyer</label>
                        <select class="form-control"  onChange={handleSelectFaction}>{
                                factions.filter((faction) => {
                                    return faction[1] !== parseInt(props.faction)
                                }).map((faction) => {
                                    return(<option value={faction[1]}>{faction[0]}</option>)
                                })}
                        </select>
                    </div>

                    <div class="col-6 padding-alignment" id="trade-sender-div">
                    <label htmlFor="trade-key-input">Buyer's Trade Key:</label>
                        <input class="form-control padding-alignment" id="trade-key-input" onBlur={validateKey} type='password'></input>{
                            keyMatch === -1 ? <p id="false-key"><i>Incorrect Trade Key</i></p> : ""
                        }
                    </div>
                </div>

                <div class="form-group row" id="resource-section-form">

                    <div class="col trade-form-border trade-form-resources">
                        <h6><strong>Your Offer</strong></h6>
                        <div class="side-units-div">
                            <input class="form-control" id="trade-request-qty"></input>
                            <h6>Sols</h6>
                        </div>  
                    </div>

                    <div class="col trade-form-resources">
                        <h6><strong>Desired Resource: {props.resource}</strong></h6>              
                        <div class="side-units-div">
                            <input class="form-control" id="trade-sender-qty" type="number" min="0" placeholder={String(desiredResourceQty) + " tradeable units"}></input>
                            <h6>units</h6>
                        </div>  
                    </div>
                </div>
                <div id="submit-trade-button-div">
                    <button type="submit" class="btn btn-outline-success">Submit Trade Request</button>
                </div>
            </form>
        </Modal.Body>
      </Modal>
    </div>
    );
  }

export {TradeTable};

