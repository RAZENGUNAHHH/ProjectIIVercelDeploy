import React, { useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
type Props = {}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Bar_chart_compo({}: Props) {



  const config_bar_memo = useMemo(()=>{
    const options : any = {
     indexAxis: 'y' as const,
       responsive: true,
       plugins: {
         legend: {
           position: 'bottom' as const,
         },
         title: {
           display: true,
           text: 'Member',
           position : 'bottom'
         },
       },
     };
     return options
   },[])


   const dataset_bar = useMemo(()=>{
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
     const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data:  [10,20,30,50,50,90,40],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      return data
      
              
           
    },[])


  return (
    <div className='w-full h-full'>
       <Bar  data={dataset_bar} options={config_bar_memo}/>
    </div>
  )
}