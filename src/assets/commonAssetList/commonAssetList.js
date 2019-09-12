import  React from 'react'
import {Button, Table} from 'react-bootstrap'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './commonAssetList.css'
import { FaSort } from 'react-icons/fa';
import {BootstrapTable,  TableHeaderColumn} from 'react-bootstrap-table';


export default class commonAssetList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                data: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('common_assets')){
            var data = JSON.parse(localStorage.getItem('common_assets'))
            this.setState({data: data})
        }
       
    }

    numericSortFunc = (a, b, order) => {
        if (order === 'desc') {
          return Number(b.price) - Number(a.price);
        } else {
          return Number(a.price) - Number(b.price);
        }
    }

    render() {
        console.log(this.state.data)
        return(
            <div >
                {this.state.data ? 
                <div>
                    <BootstrapTable className="table" data={this.state.data} headerStyle={ { color: 'red' } } search pagination exportCSV>
                        <TableHeaderColumn style={{color:'red'}} isKey dataField='name' dataSort={ true }>
                            Name<FaSort style={{float:"right",marginTop:'5px'}}/>
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='desc' dataSort={ true }>
                            Description<FaSort style={{float:"right",marginTop:'5px'}}/>
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='category' dataSort={ true }>
                            Category<FaSort style={{float:"right",marginTop:'5px'}}/>
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='model_number'>
                            Model Number
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='serial_number'>
                            Serial Number
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='unit_price' dataSort={ true } sortFunc = {this.numericSortFunc}>
                            Unit Price<FaSort style={{float:"right",marginTop:'5px'}}/>
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
                :<p>No data to display</p>}
            </div>
        )
    }
}