import React, { useState, useEffect } from 'react';
import './styles.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2'; 
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Population = (props) => {
    const [population, setPopulation] = useState([]);

    const callPopulation = async () => {
        try {
            const res = await axios.get(`https://faction-backend.herokuapp.com/population/${props.id}/`);
            var data = [...res.data].map(({population})=>population); 
            setPopulation(data); 
        } catch(e) {
            console.log(e);
    }}

    useEffect(() => {
        callPopulation();
        const intervalId = setInterval(callPopulation, 60000);   
        return () => {
            console.log("Cleaning up population");
            clearInterval(intervalId);
        }
    }, []);

    const data = {
        labels: [...Array(population.length).keys()],
        datasets: [
        {
            label: "Population",
            data: population,
            fill: true,
            backgroundColor: "#CAA6DB",
        }
        ]
    }
    const options = {
        plugins: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
        }}};

    return (
        <div>
            <h4 class={`component-font-${props.id}-style  title-font-${props.id}`}>Population size</h4>
        <div>
            <Line data={data} options={options} height={140}/>
        </div>
        </div>
    );
  }

export {Population};