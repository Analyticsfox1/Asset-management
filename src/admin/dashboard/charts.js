import React from 'react';
import { Chart } from 'primereact/chart';

export default class Charts extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
       
    }
    render(){
        var hardwares = JSON.parse(localStorage.getItem('New_hardware_assets'))
        var softwares = JSON.parse(localStorage.getItem('New_software_assets'))
        var common_assets = JSON.parse(localStorage.getItem('common_assets'))
       
        const data = {
            labels: ['Hardwares','Softwares','Common Assets'],
            datasets: [
                {
                    data: [hardwares.length, softwares.length, common_assets.length],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };
        return(
            
                   <div style={{height: '90vh'}}>
                    <Chart type="doughnut" data={data} style={{height:'50%', width:'50%'}}/>
                </div>
            
        )
    }
}