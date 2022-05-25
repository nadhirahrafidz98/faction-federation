import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import './styles.css';

// prop is faction ID
const Resources = (props) => {

    const [loading, setLoading] = useState(true);
    const [resources, setResource] = useState([]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const broadcast = (resources) => {
        const factionSocket = io(`https://faction-backend.herokuapp.com/faction${props.id}`, { autoConnect: true });
    
        factionSocket.on("resource", (args) => {
            setLoading(true);
            setResource([...args]); 
            setLoading(false);
        });
    
        factionSocket.on('connect_error', ()=>{
          setTimeout(()=>factionSocket.connect(),5000)
        })
    }
    
    const callResource = async () => {
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${props.id}/resources/`);
            var data = [...res.data];
            setResource(data); 
            setLoading(false);
        } catch(e) {
            console.log(e);
    }}

    useEffect(() => {
        callResource(); 
        broadcast(resources); 
    }, [])

    return (
    <div class={`table-responsive body-font-${props.id}`}>
        <h4 class={`component-font-${props.id}-style  title-font-${props.id}`}>Resource List</h4>
    {
    loading ? <p>Loading...</p> :
    <table class="table table-hover resource-table">
    <thead>
        <tr>
        <th scope="col">Resource</th>
        <th scope="col">Quantity (Unit)</th>
        </tr>
    </thead>
    <tbody> 
        {   
        resources.filter((resource) => parseInt(String(resource.rsrcQty)))
        .sort(function(first,second) {
            return second.rsrcQty - first.rsrcQty})
        .map((resource) => {
            const resourceName = resource.rsrcName;
            const resourceQty = numberWithCommas(resource.rsrcQty);
            return (
                <tr key={resourceName}>
                    <td>{resourceName}</td>
                    <td>{resourceQty}</td>
                </tr>
            );})
        }
    </tbody>
    </table>
    }
    </div>
    );
  }

export {Resources};