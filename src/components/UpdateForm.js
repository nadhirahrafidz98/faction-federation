import './styles.css';
import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = (props) => {
    const [resources, setResources] = useState([]);
    const [posCheck, setPosCheck] = useState(false);
    const [negCheck, setNegCheck] = useState(false);

    const [posRate, setPosRate] = useState(null);
    const [negRate, setNegRate] = useState(null);

    const handleFactionChange = async (event) => {
        const selectedFaction = event.target.value;
        const res = await axios.get(`https://faction-backend.herokuapp.com/factions/${selectedFaction}/resources`);
        setResources([...res.data]); 
    }

    const handleCheck = (event) => {
        if(event.target.id === "posCheck"){
            setPosCheck(!posCheck);
        }else{
            setNegCheck(!negCheck)
        }
    }

    const handleBlur = (event) => {
        if(event.target.id === "posInput"){
            setPosRate(event.target.value);
        }else{
            setNegRate(event.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const factionId = e.target[0].value; 
        const resourceName = e.target[1].value; 
        var updateObject = {}; 
        if(posCheck && posRate !== "") updateObject["posRate"] = posRate; 
        if(negCheck && negRate !== "") updateObject["negRate"] = negRate;
        if(Object.keys(updateObject).length === 0){
            console.log("Empty update: Patch API not called")
            return; 
        } 
        const res = await axios.patch(`https://faction-backend.herokuapp.com/factions/${factionId}/${resourceName}/rate`, updateObject);
        if(res.status === 200){
            console.log(res.data);
            alert("Update done"); 
        }
        else alert("Update error");
        e.target.reset();
        setResources([]);
        posCheck ? setPosCheck(!posCheck) : setPosCheck(posCheck);
        negCheck ? setPosCheck(!negCheck) : setPosCheck(negCheck);
    }

    return (
        <form  onSubmit={handleSubmit} class="form-margins">
            <div class="container">
            <div class="row">
                    <h4 class="form-title">Update Resource</h4>                     
            </div>
            <div class="row">
                <div class="col">
                    <label for="faction-select" class="form-label">Faction</label>
                    <select 
                        id="faction-select" 
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
                <div class="col">
                    <label for="resource-select" class="form-label">Faction's Resources</label>
                    <select id="resource-select" class="form-select form-select-sm" aria-label=".form-select-sm example">
                        {
                        resources.length === 0 ? <option></option> :
                        resources.map((resource) => {
                            return(
                                <option value={resource.rsrcName} key={resource.rsrcName}>{resource.rsrcName}</option>
                            )})}
                    </select>
                </div>

                <div class="col">
                    <label for="posInput">Positive Rate</label>
                        <div class="input-group mb-3">       
                            <div class="input-group-text">
                                <input class="form-check-input mt-0" id="posCheck" type="checkbox" onChange={handleCheck} defaultChecked={posCheck}></input>
                            </div>
                                <input type="number" class="form-control" id="posInput" min="0" onBlur={handleBlur} disabled={posCheck ? undefined : 'disabled'}></input>
                        </div>
                </div>

                <div class="col">     
                    <label for="negInput">Negative Rate</label>
                        <div class="input-group mb-3">       
                            <div class="input-group-text">
                                <input class="form-check-input mt-0" type="checkbox" id="negCheck" onChange={handleCheck}></input>
                            </div>
                                <input type="number" class="form-control" id="negInput" min="0" onBlur={handleBlur} disabled={negCheck ? undefined : 'disabled'}></input>
                        </div>
                </div>
                </div>
                        <button type="submit" class="btn btn-outline-success btn-sm">Update</button>
                </div>
        </form>
    );
  }

export {UpdateForm};