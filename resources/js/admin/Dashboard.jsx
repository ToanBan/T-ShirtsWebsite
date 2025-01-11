import React, { useEffect, useState } from "react"
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function Dashboard(){
    const [yvalues, setYvalues] = useState([]);

    const fetchTotalPrice = () => {
        fetch('/calculate-month')
            .then(response => response.json())
            .then(data => {
                const DataY = Array(12).fill(0);
                console.log(data);
                data.map((item) => {
                    const index = item.month - 1;
                    DataY[index] = item.total;
                })
                setYvalues(DataY);
            
            })
    }

    const data = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12],
        datasets: [
          {
            label: 'Doanh Số Theo Tháng',
            data: yvalues,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
    };

    useEffect(()=>{
        fetchTotalPrice();
    }, []);

    return (
        <>
            <div >
                <h3>Dashboard</h3>
                <div style={{width:"100%", height:"500px"}}>
                    <Line style={{padding:"10px 12px"}} data={data} options={options}/>
                </div>
            </div>
        </>
    )
}
