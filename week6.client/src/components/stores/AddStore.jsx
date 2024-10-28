import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComponentRoutes } from '../ComponentRoutes';
import storeApiServices from '../../services/StoreServices';

//Task2: Add a new component to the store that will allow the user to enter a name of the store and post it
class AddStore extends Component {

    static displayName = AddStore.name;
    constructor(props) {
        super(props);

        this.state = {
            store: { id: 0, name: '', location: '' },
            error: '',
            successMsg: '',
            loading: false
        };
    }
    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            store: {
                ...prevState.store, // Spread the previous customer state
                [name]: value, // Update the specific field based on name
            },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        this.setState({ error: '' });
        this.setState({ successMsg: '' });

        try {
            const storeData = await storeApiServices.CreateStore(this.state.store);
            if (storeData.id != 0) {
                this.setState({ successMsg: "Store Added successfully" });
                this.setState({
                    store: { id: 0, name: '', location: '' },
                    error: '',
                    loading: false
                }); // Reset form fields

                //Task3: Extend the component to refresh the table with the new store after save
                //Calling parent StoreTable populateStoresData funciton
                this.props.onAddSuccess();
            }
        } catch (error) {
            this.setState({ error: 'Failed to add customer' });
        } finally {
            this.setState({ loading: false });
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
                {this.state.successMsg && <p style={{ color: 'green' }}>{this.state.successMsg}</p>}
                <form onSubmit={this.handleSubmit}>
                    <div disabled={this.state.loading} >
                        <label for="name" >Store Name:</label>
                        {//using prev to not change the other key values
                        }
                        <input id="name" type="text" name="name" value={this.state.store.name} onChange={this.handleInput} required />

                        <label for="loc" style={{ marginLeft: '15px' }}>Last Name:</label>
                        <input id="loc" type="text" name="location" value={this.state.store.location} onChange={this.handleInput} required />
                    
                        <button type="submit" disabled={this.state.loading} style={{ marginLeft: '15px' }}>
                        {this.state.loading ? 'Adding Store...' : 'Add Store'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}

export default AddStore;