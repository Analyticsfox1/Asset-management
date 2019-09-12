import  React from 'react'
import {Button, Table, ButtonGroup} from 'react-bootstrap'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {RadioButton} from 'primereact/radiobutton';
import 'primeicons/primeicons.css';
import { FaSort } from 'react-icons/fa';
import './assetlist.css'
import { CSVLink } from "react-csv";
import {BootstrapTable,  TableHeaderColumn} from 'react-bootstrap-table';


export default class AssetList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hardwares: [],
            softwares: [],
            option: 'Hardwares'
        }
    }

    componentDidMount() {
        if(localStorage.getItem('New_hardware_assets')){
            var hardware_assets = JSON.parse(localStorage.getItem('New_hardware_assets'))
            this.setState({hardwares: hardware_assets})
        }
        if(localStorage.getItem('New_software_assets')){
            var software_assets = JSON.parse(localStorage.getItem('New_software_assets'))
            this.setState({softwares: software_assets})
        }
    }

    _onOptionChange=(option)=> {
        this.setState({
            option: option
        });
    }

    numericSortFunc = (a, b, order) => {
        if (order === 'desc') {
          return Number(b.cost) - Number(a.cost);
        } else {
          return Number(a.cost) - Number(b.cost);
        }
    }

    render() {
        console.log(this.state.hardwares, this.state.softwares)
        return(
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <label> List all : &nbsp;</label>
                    <div className="p-col-12">
                        <RadioButton value="Hardwares" name="city" onChange={(e) => this.setState({option: e.value})} checked={this.state.option === 'Hardwares'} />
                            <label htmlFor="rb1" className="p-radiobutton-label">Hardwares</label>
                    </div>
                    <div className="p-col-12" style={{marginLeft:'30px'}}>
                    <RadioButton value="Softwares" name="city" onChange={(e) => this.setState({option: e.value})} checked={this.state.option === 'Softwares'} />
                        <label htmlFor="rb3" className="p-radiobutton-label">Softwares</label>
                    </div>
                </div>
                  
                    {
                        this.state.option === 'Hardwares'?
                        <div >
                            <BootstrapTable className="table" data={this.state.hardwares} search pagination exportCSV>
                                <TableHeaderColumn style={{color:'red'}} isKey dataField='hardware_name' dataSort={ true }>
                                    Name<FaSort style={{float:"right",marginTop:'5px'}}/>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='desc' dataSort={ true }>
                                    Description<FaSort style={{float:"right",marginTop:'5px'}}/>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='model_no'>
                                    Model Number
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='serial_no'>
                                    Serial Number
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                        :
                        <div>
                            <BootstrapTable className="table" data={this.state.softwares} search pagination exportCSV>
                                <TableHeaderColumn style={{color:'red'}} isKey dataField='software_name' dataSort={ true }>
                                    Software Name<FaSort style={{float:"right",marginTop:'5px'}}/>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='license_name' dataSort={ true }>
                                    License Name<FaSort style={{float:"right",marginTop:'5px'}}/>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='license_identification_number'>
                                License Identification Number </TableHeaderColumn>
                                <TableHeaderColumn dataField='software_category' dataSort={true}>
                                    Software Category<FaSort style={{float:"right",marginTop:'5px'}}/>
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='cost' dataSort={ true } sortFunc = {this.numericSortFunc}>
                                   Cost<FaSort style={{float:"right",marginTop:'5px'}}/>
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    }
            </div>
        )
    }
}