import React, {useState} from 'react';
import { TradeTable } from './components/TradeTable'
import axios from 'axios';
import $ from 'jquery';

const Trading = () => {

  const [resources, setResource] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState("")
  const [showAlert, setShowAlert] = useState(false);
  const [alertFaction, setAlertFaction] = useState("");

  const factions = [["Rivia",1], ["Althea",2], ["Elirea",3], ["Redania",4], ["Panea",5]];

  const marketValue = (resource) =>{
    var market_val = 0; 
    switch(resource) {
      case "Rice":
        market_val = 12; 
        break;
      case "Meat":
        market_val = 20; 
        break;
      case "Vegetables":
        market_val = 16; 
        break;
      case "Medicine":
        market_val = 25; 
        break;
      case "Timber":
        market_val = 70; 
        break;
      case "Glass":
          market_val = 50; 
          break;
      case "Copper":
          market_val = 250; 
          break;
      case "Iron":
        market_val = 150; 
        break;
      case "Cotton":
        market_val = 14; 
        break;
      case "Wool":
        market_val = 17; 
        break;
      case "Tools":
        market_val = 300; 
        break;
      default:
        market_val = 0 
    }
    return market_val; 
  }

  const callResource = async (id) => {
    try {
        const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${id}/resources/`);
        var data = [...res.data];
        setResource(data); 
    } catch(e) {
        console.log(e);}}

  const handleClick = async (event) => {
    const id = await event.target.value; 
    setSelectedFaction(id); 
    callResource(id);
    $('.trade-nav-btn').on('click', function(){
      $('.trade-nav-btn').removeClass('selected');
      $(this).addClass('selected');
  });
  }

  const callbackAlert = (show, receiver) => {
    if(show){
      const faction = factions.filter((faction) => {
        return faction[1] === parseInt(receiver);
      })
      setAlertFaction(faction[0][0]); 
      setShowAlert(true);
      setTimeout(() => {setShowAlert(false)}, 6000);
    }
  }
  
  return (
    <div class="trade-cont-parent">
      <div class="title-cont">
        <h1 class="title-font-trade title-font-trade-style">The Marketplace</h1>
      </div>

      <div class="container trade-cont">
        <div class="nav-cont body-font-trade">{
            factions.map((faction) => {
              return(
                  <button class="btn btn-lg btn-outline-secondary trade-nav-btn" onClick={handleClick} value={faction[1]}>{faction[0]}</button>
              )})}
          </div>
          
          { showAlert ? 
              <div class="alert alert alert-success alert-dismissible fade show" role="alert">
                <strong>Trade request sent to {alertFaction}!</strong> Awaiting request approval. 
              </div>
            : "" }

          <div class="rsrc-grid trade-body">
            {
              resources
              .filter((r) => {
                return parseInt(r.rsrcQty) > 0; 
              })
              .map((r)=>{
                return(
                  <TradeTable resource={r.rsrcName} faction={selectedFaction} quantity={r.rsrcQty} market_val={marketValue(r.rsrcName)} callback={callbackAlert}/>
                )
              })
            }
          </div>
      </div>
    </div>
  );
}

export { Trading };
