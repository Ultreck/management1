import React from 'react'
import faker from 'faker/package.json'
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
// import faker from 'faker';


const PatLineChart = ({docMonp, docTuep, docWedp, docThup, docFrip, docSatp, docSunp}) => {
      
  ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
    
   const options = {
      responsive: true,
      plugins: {
        legend: {
        },
  
      },
    };
    
    const labels =['Sun', 'Mon',  'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
     const data = {
      labels,
      datasets: [
        {
          label: 'Total Patients',
          data:  [docSunp.length, docMonp.length, docTuep.length, docWedp.length, docThup.length, docFrip.length, docSatp.length],
          borderColor: 'rgb(245, 87, 2)',
          backgroundColor: 'rgba(245, 87, 29)',
        }
      ],
    };
  return (
    <div>
          <Line className='' options={options} data={data} />
    </div>
  )
}

export default PatLineChart
