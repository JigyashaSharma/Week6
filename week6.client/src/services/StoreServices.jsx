import axios from "../../node_modules/axios/index";

const StoreEndpoint = "stores";

const storeApiServices = {
    async fetchStores() {
        try {
            const response = await fetch(StoreEndpoint);
            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("fetch store failed!! ", error);
            throw error;
        }
        
    },

    //Task2: Using axios
    async CreateStore(newStore) {
        /*const response = await fetch(
            StoreEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStore)
        });*/
        try {
            const response = await axios.post(StoreEndpoint, newStore);
            return response.data;
        } catch (error) {
            console.error("create store failed!! ", error);
            throw error;
        }
        
    }
}

export default storeApiServices;
