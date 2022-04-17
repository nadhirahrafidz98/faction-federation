
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Warning } from './Warning';
import './styles.css';

// prop is faction ID
const Resources = (props) => {

    const [loading, setLoading] = useState(true);
    // const [timestamp, settimestamp] = useState("");
    const [resources, setResource] = useState([]);

    const callResource = async () => {
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.id}/resources/`);
            var data = [...res.data];
            setResource(data); 
            // var timestamp = new Date();
            // settimestamp(timestamp.toString());
            setLoading(false);
        } catch(e) {
            console.log(e);
    }}

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    callResource();

    /* For Warning Components */
    // const food = resources.filter((resource) => {
    //     return resource.rsrcType > 1});
    // const meds = resources.filter((resource) => {
    //     return resource.rsrcType === 1});

    /* For Updating Table every minute */
    // useEffect(() => {
    //     callResource();
    //     const intervalId = setInterval(callResource, 60000);   
    //     return () => {
    //         console.log("Cleaning up");
    //         clearInterval(intervalId);
    //     }
    // }, []);
    
    return (
    <div class={`table-responsive body-font-${props.id}`}>
        <h4 class={`component-font-${props.id}-style  title-font-${props.id}`}>Resource List</h4>
    <table class="table table-hover resource-table">
    <thead>
        <tr>
        <th scope="col">Resource</th>
        <th scope="col">Quantity (Unit)</th>
        {/* <th scope="col" ></th> */}
        </tr>
    </thead>
    <tbody>
        {     
        loading ? <p>Loading...</p> :
        resources.filter((resource) => parseInt(String(resource.rsrcQty)))
        .sort(function(first,second) {
            return second.rsrcQty - first.rsrcQty})
        .map((resource) => {
            const resourceName = resource.rsrcName;
            const resourceQty = numberWithCommas(resource.rsrcQty);
            const net = resource.posRate - resource.negRate; 
            var icon = ""; 
            net >= 0 ? icon = "/up-arrow.png" : icon = "/down-arrow.png"

            return (
                <tr key={resourceName}>
                    <td>{resourceName}</td>
                    <td>{resourceQty}</td>
                    {/* <td> <img src={icon} alt="resource rate" height="12%" width="12%"></img> </td> */}
                </tr>
            );})
        }
    </tbody>
    </table>
    {/* <p class="timestamp-font">Last updated on <span class="timestamp-font">{timestamp}</span></p> */}
    {/* <Warning resources={food} id={props.id} medicine={meds}/> */}
    </div>
    );
  }

export {Resources};

