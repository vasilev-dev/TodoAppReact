import API from "../utils/API";

export default class ApiService {
    getItems = async () => {
        const response = await API.get('/task');
        return response.data;
    };

    createItem = async (item) => {
        const response = await API.post('/task', item);
        return response.data;
    };

    deleteItem = async (id) => {
        await API.delete(`/task/${id}`);
    }

    updateItem = async (item) => {
        await API.put(`/task/${item.id}`, item);
    }
}
