import React from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';


export default class UserList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user_details : []
        }
    }

    componentDidMount(){
        var user_data = JSON.parse(localStorage.getItem("user_data"))
        this.setState({user_details:user_data})
        console.log(this.state.user_details)
        let userDetails = {}
        userDetails = this.state.user_details
        // this.state.user_details = []
        this.state.user_details.push(userDetails)




        // console.log('Before', this.state.user_details)
       
        // console.log(user_data)
        // this.state.user_details.push(user_data)
        // console.log('Before', this.state.user_details)
       
        var hardwareAssets =  JSON.parse(localStorage.getItem("hardware_assets"))
        console.log(hardwareAssets)

    }

    render(){
        const cols = [
            {field: 'fname', header: 'Name'}, {field: 'email', header: 'Email'}, {field:'role', header:'Role'}, {field:'status', header:'Status'}
        ]
        var header = <div className="p-clearfix" style={{'lineHeight':'1.87em'}}>List of Employees</div>;
        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });
        return(
            <div>
            <DataTable value={this.state.user_details} header={header} paginator={true} rows={10} filter={true}>
               {dynamicColumns}
            </DataTable>
            </div>
        )
    }
}