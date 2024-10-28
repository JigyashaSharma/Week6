import { Component } from 'react';
import storeApiServices from '../../services/StoreServices.jsx';
import { Link } from 'react-router-dom';
import AddStore from './AddStore.jsx';
export class StoreTable extends Component {

    static displayName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true};
        //this.addStores = this.addCustomer.bind(this);
    }

    componentDidMount() {
        this.populateStoresData();
    }

    static renderStoresTable(stores) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td><button>Update Store</button></td>
                            <td><button>Delete Store</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StoreTable.renderStoresTable(this.state.stores);
        return (
            <div>
                
                    <h1 id="tableLabel">Stores</h1>
                {
                    //Task3: Extend the component to refresh the table with the new store after save
                    //passing the refreshStoredata as prop to the AddStore
                }
                <div style={{ display: 'flex' }}>
                    <AddStore onAddSuccess={this.refreshStoredata} />
                </div>
                {contents}
            </div>
        );
    }

    async addStores() {
        const data = await fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: 'UK, London'
            })
        }).then((data) => data.json());

        

        this.populateStoresData();
    }

    //Task3: Extend the component to refresh the table with the new store after save
    //creating this function to encapsulate populateStoresData
    refreshStoredata = async () => {
        try {
            await this.populateStoresData(); // Await the async call
        } catch (error) {
            console.error('Error refreshing stores data:', error);
        }
    }

    async populateStoresData() {
        try {
            const data = await storeApiServices.fetchStores();
            this.setState({ stores: data , loading: false });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            this.setState({ loading: false });
        }
    }
}