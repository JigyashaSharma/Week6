import { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomerApiServices from '../../services/CustomerServices';
import AddCustomer from './AddCustomer';
import { ComponentRoutes } from '../ComponentRoutes';

//Task1: Customer Controller Using class component
class CustomerTable extends Component {
    static displayName = CustomerTable.name;
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
            <div>]
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', padding: '20px' }}>
                    <h1 id="tableLabel">Customers</h1>
                    <Link to='/add-customer' style={{ verticalAlign: 'middle', marginLeft:'20px', fontSize: '14px', } }>AddCustomer</Link>
                </div>
                {contents}
            </div>
        );
    }

    async addCustomer() {
        this.populateCustomersData();
    }

    async PopulateCustomerData() {
        try {
            ////Haven't coded the pagination logic yet so passing bigger values
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