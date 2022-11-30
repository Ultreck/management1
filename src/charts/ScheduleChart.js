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


const ScheduleChart = () => {
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
          
          const labels = ['Sun', 'Mon',  'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          
           const data = {
            labels,
            datasets: [
              {
                label: 'Total Schedules',
                data:  [ 6, 14, 21, 12, 13, 28, 18],
                borderColor: 'rgb(20, 130, 229)',
                backgroundColor: 'rgba(20, 130, 229)',
              }
            ],
          };
  return (
       <div>
          <Line className='' options={options} data={data} />
    </div>
  )
}

export default ScheduleChart