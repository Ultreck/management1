import React, { useState, useEffect } from 'react';

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

const DocLineChart = ({docMon, docTue, docWed, docThu, docFri, docSat, docSun}) => {

  // const [totalMonTime, settotalTime] = useState()
  // settotalTime(docMon.length)
  // console.log(docMon);
  // console.log(docTue);
  // console.log(docWed);
  

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
  // const day = [
  //   {x: Date.parse('2022-11-24'), y: 18},
  //   {x: Date.parse('2022-11-25'), y: 12},
  //   {x: Date.parse('2022-11-26'), y: 6},
  //   {x: Date.parse('2022-11-27'), y: 9},
  //   {x: Date.parse('2022-11-28'), y: 3},
  //   {x: Date.parse('2022-11-29'), y: 12},
  //   {x: Date.parse('2022-11-30'), y: 10}
  // ]
  
   const data = {
    labels,
    datasets: [
      {
        label: "Doctor's Chart",
        data: [docSun.length, docMon.length, docTue.length, docWed.length, docThu.length, docFri.length, docSat.length],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <div>
        <Line className='' options={options} data={data} />
    </div>
  )
}

export default DocLineChart


