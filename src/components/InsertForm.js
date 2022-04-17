import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const InsertForm = (props) => {

    const [errorMessage, setErrorMessage] = useState(""); 

    let schema = yup.object().shape({
        factionId: yup.number().required(),
        rsrcName: yup.string().matches(/[A-Z][a-z]+/).required(),
        rsrcQty: yup.number().required().positive().integer(),
        rsrcType: yup.number().min(0).max(3).required(),
        posRate: yup.number().min(0).required(),
        negRate: yup.number().min(0).required()
      });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = e.target[0].value; 
        const resourceType = e.target[1].value; 
        const resourceName = e.target[2].value; 
        const resourceQty = e.target[3].value; 
        const pos = e.target[4].value; 
        const neg = e.target[5].value; 

        var updateObject = {
            factionId: id, 
            rsrcName:resourceName,
            rsrcQty: resourceQty, 
            rsrcType: resourceType, 
            posRate: pos, 
            negRate: neg
        }; 

        schema.isValid(updateObject).then((valid) =>{
            if(!valid){
                setErrorMessage("Invalid insert doc");
                return; }
            console.log("valid");
        })

        const ifExists = await axios.get(`https://faction-backend.herokuapp.com/factions/${id}/${resourceName}`);
        if(ifExists.data !== ""){
            setErrorMessage("Resource already exists");
            e.target.reset();
            return; 
        }

        const res = await axios.post(`https://faction-backend.herokuapp.com/factions/resources`, updateObject);
        if(res.status === 200){
            console.log(res.data);
            setErrorMessage(""); 
            alert("Update done"); 
        }
        else setErrorMessage("Insert API error: Insert terminated");
        e.target.reset();     
    }

    return (
        <form  onSubmit={handleSubmit} class="form-margins">
            <div class="container">
            <div class="row">
                <h4 class="form-title">Insert Resource</h4>    
                {
                    errorMessage !== "" ? <p>{errorMessage}</p> : ""
                }                   
            </div>
            <div class="row">
                <div class="col">
                    <label for="faction-select" class="form-label">Faction</label>
                    <select 
                        id="faction-select" 
                        class="form-select form-select-sm" 
                        aria-label=".form-select-sm example"
                        placeholder="Select faction" 
                        defaultValue="">
                        <option value="" disabled selected>Select faction</option>
                        <option value="1">Analyst</option>
                        <option value="2">Diplomat</option>
                        <option value="3">Explorer</option>
                        <option value="4">Sentinel</option>
                        <option value="5">Type A</option>
                    </select>
                </div>
                <div class="col">
                    <label for="resource-type" class="form-label">Resource Type</label>
                    <select 
                        id="resource-type" 
                        class="form-select form-select-sm" 
                        aria-label=".form-select-sm example"
                        placeholder="Select faction" 
                        defaultValue="">
                        <option value="" disabled selected>Select type</option>
                        <option value="1">Medicine</option>
                        <option value="2">Meat</option>
                        <option value="3">Plan</option>
                        <option value="0">Others</option>
                    </select>
                </div>
                <div class="col">
                    <label for="resource-name" class="form-label">Resource Name</label> 
                        <input type="text" class="form-control" id="resource-name"></input>
                </div>
                </div>

                <div class="row" id="insert-row-2">

                <div class="col">
                    <label for="posInput" class="form-label">Resource Qty</label>     
                        <input type="number" class="form-control" id="posInput" min="0"></input>
                </div>

                <div class="col">
                    <label for="posInput" class="form-label">Positive Rate</label>     
                        <input type="number" class="form-control" id="posInput" min="0"></input>
                </div>

                <div class="col">     
                    <label for="negInput" class="form-label">Negative Rate</label>    
                        <input type="number" class="form-control" id="negInput" min="0"></input>
                </div>
                </div>
                    <button type="submit" class="btn btn-outline-warning btn-sm button-margin">Insert</button>
                </div>
        </form>
    );
  }

export {InsertForm};