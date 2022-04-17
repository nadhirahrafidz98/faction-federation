import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


// prop is faction ID
const Warning = (props) => {

    const [population, setPopulation] = useState([]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const currentPopulation = async () => {
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/population/${props.id}/bal`);
            var population = res.data.population;
            setPopulation(population); 
        } catch(e) {
            console.log(e);
    }}
    
    useEffect(() => {
        currentPopulation();
    });

    const hungryCivs = (resources, population) => {
        var popHungry = population;
        if(resources.length === 0){
            return popHungry;
        }
        resources.forEach(resource => {
            var rate = resource.rsrcType === 2 ? 30 : 80; 
            var fed = Math.floor(resource.rsrcQty/rate); 
            popHungry = popHungry - fed; 
        });
        return popHungry; 
    }
    const popHungry = hungryCivs(props.resources, population);

    const sickCivs = (medicines, population) => {
        var popSick = population;
        if(medicines.length === 0){
            return popSick;
        }
        medicines.forEach(medicine => {
            var rate = 2; 
            var healed = Math.floor(medicine.rsrcQty/rate); 
            popSick = popSick - healed; 
        });
        return popSick; 
    }
    const popSick = sickCivs(props.medicine, population);

    return (       
        <div class="warning-margins">
          <div class="row">

                { popHungry <= 0 ? <div></div> :
                    <div class="col-sm">
                        <div class="alert alert-warning warning-cont" role="alert">
                            <i class="fa-solid fa-triangle-exclamation icon fa-fade"></i>
                            Hungry civilians: {numberWithCommas(popHungry)}
                        </div>
                    </div>  
                }
            { popSick <= 0 ? <div></div> : 
                <div class="col-sm">
                    <div class="alert alert-warning warning-cont" role="alert">
                        <i class="fa-solid fa-triangle-exclamation icon fa-fade"></i>
                        Sick civilians: {numberWithCommas(popSick)}
                    </div>
                </div> }  
          </div>
        </div>
    );
  }

export {Warning};

