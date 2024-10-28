import { Component } from 'react';
//import { useNavigate } from 'react-router-dom';
import CustomerApiServices from '../../services/CustomerServices';
import AddCustomer from './AddCustomer';
class CustomerTable extends Component {
    static displayName = CustomerTable.name;
    /*handletoAddCustomer = () => {
        this.props.navigate = '/add-customer';
    };*/
    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true, showAddCustomer: false };
    }

    componentDidMount() {
        this.PopulateCustomerData();
    }

    static renderCustomersTable(customers) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.age}</td>
                            <td><button>Update Customer</button></td>
                            <td><button>Delete Customer</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CustomerTable.renderCustomersTable(this.state.customers);

        return (
            <div>
                <div style={{ display: this.state.showAddCustomer ? 'none' : 'block' }}>
                    <div style={{ display: 'flex' }}>
                        <h1 id="tableLabel">Customers</h1>
                        <button onClick={() => this.setState({ showAddCustomer: true })} style={{ marginLeft: '15px', alignSelf: 'center' }}>Add Customer</button>
                        {
                            //<button onClick={this.handletoAddCustomer} style={{ marginLeft: '15px', alignSelf: 'center' }} >AddCustomer</button>
                        }
                    </div>
                    {contents}
                </div>
                <div style={{ display: this.state.showAddCustomer ? 'block' : 'none' }}>
                    <AddCustomer />
                </div>
            </div>


        );
    }

    async addCustomer() {
        this.populateCustomersData();
    }

    async PopulateCustomerData() {
        try {
            const customerData = await CustomerApiServices.GetCustomers(1, 100);
            this.setState({ customers: customerData.dtos, loading: false });
            console.log("Customer state updated:", this.state.customers);
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({ loading: false });
        }
    }
}

export default CustomerTable;