const StoreEndpoint = "stores";

const storeApiServices = {
    async fetchStores() {
        const response = await fetch(StoreEndpoint);
        if (!response.ok) {
            throw new Error('Http Error! status: ${response.status}');
        }
        const data = await response.json();
        return data;
    }
}

export default storeApiServices;
