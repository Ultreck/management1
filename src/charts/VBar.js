import { Bar  } from "react-chartjs-2";
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const VBar = ({docMon, docTue, docWed, docThu, docFri, docSat, docSun, docMonp, docTuep, docWedp, docThup, docFrip, docSatp, docSunp}) => {

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
let label
const data = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  // label,
  datasets: [{
    label: "Dorctor's",
    data: [docSun.length, docMon.length, docTue.length, docWed.length, docThu.length, docFri.length, docSat.length],
    backgroundColor: 'orange'
  }, 
  {
    label: "Patient's",
    data: [docSunp.length, docMonp.length, docTuep.length, docWedp.length, docThup.length, docFrip.length, docSatp.length],
    backgroundColor: 'blue'
  }
]}

  return (
    <div>
        <div className=''>
      <Bar data={data}/>
      {/* <h1>Hello World</h1> */}
    </div>
    </div>
  )
}

export default VBar
