import './styles.css';
import React, { useState } from 'react';
import axios from 'axios';

// prop is faction ID
const BackendTable = (props) => {

    const [resources, setResources] = useState([]);

    const handleFactionChange = async (event) => {
        const selectedFaction = event.target.value;
        const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${selectedFaction}/resources`);
        setResources([...res.data]); 
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const convertType = (type) =>{
        var typeName="Others"; 
        switch(type){
            case 0: 
                typeName="Others";
                break;
            case 1: 
                typeName="Medicine";
                break;
            case 2:
                typeName="Meat";
                break; 
            case 3: 
                typeName="Plants"
                break;
            default:
                typeName="Others"; 
            }
        return typeName; 
        
    }

    return (
    <div class="container">
        <div class="row table-filter">
            <div class="col-2">
                <select 
                        id="faction-filter" 
                        class="form-select form-select-sm" 
                        aria-label=".form-select-sm example"
                        placeholder="Select faction" 
                        defaultValue=""
                        onChange={handleFactionChange}>
                        <option value="" disabled selected>Select faction</option>
                        <option value="1">Analyst</option>
                        <option value="2">Diplomat</option>
                        <option value="3">Explorer</option>
                        <option value="4">Sentinel</option>
                        <option value="5">Type A</option>
                </select>
        </div>
    </div>

    <div class="row backend-table">
    <table class="table table-hover">
    <thead>
        <tr>
        <th scope="col">Resource</th>
        <th scope="col">Quantity (Unit)</th>
        <th scope="col">Type</th>
        <th scope="col">Positive Rate</th>
        <th scope="col">Negative Rate</th>
        </tr>
    </thead>
    <tbody>
        {
        resources.sort(function(first,second) {
            return second.rsrcQty - first.rsrcQty})
        .map((resource) => {
            const resourceName = resource.rsrcName;
            const resourceQty = numberWithCommas(resource.rsrcQty);
            const resourceType = convertType(resource.rsrcType);
            const pos = resource.posRate;
            const neg = resource.negRate;
            return (
                <tr key={resourceName}>
                    <td>{resourceName}</td>
                    <td>{resourceQty}</td>
                    <td>{resourceType}</td>
                    <td>{pos}</td>
                    <td>{neg}</td>
                </tr>
            );})
        }
    </tbody>
    </table>
    </div>
    </div>
    );
  }

export {BackendTable};

