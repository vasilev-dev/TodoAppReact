import React, {useEffect, useState} from 'react';
import ApiService from "../../services/api-service";

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from "../item-add-form/item-add-form";

import './app.css';

const App = () => {
    const [todoData, setTodoData] = useState([]);
    const [labelFilter, setLabelFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('active'); // all, active, done

    const apiService = new ApiService();

    useEffect(() => {
       async function fetchData() {
           const items = await apiService.getItems();
           setTodoData(items);
       }
       fetchData().then();
    }, []);

    const getIndexById = (id) => {
        return todoData.findIndex(item => item.id === id);
    };

    const onCreateTodoItem = async (label) => {
        const item = {
            label: label,
            checked: false,
            important: false
        };

        const newTask = await apiService.createItem(item);

        setTodoData([...todoData, newTask]);
    };

    const onDeleteItem = async (id) => {
        await apiService.deleteItem(id);

        const index = getIndexById(id);

        const newArray = [
            ...todoData.slice(0, index),
            ...todoData.slice(index + 1)
        ];

        setTodoData(newArray);
    };

    const onUpdateItem = async (item) => {
        await apiService.updateItem(item);

        const idx = getIndexById(item.id);

        const newArray = [
            ...todoData.slice(0, idx),
            item,
            ...todoData.slice(idx + 1)
        ];

        setTodoData(newArray);
    }

    const onToggleImportant = async (item) => {
        await onUpdateItem({...item, important: !item.important});
    };

    const onToggleDone = async (item) => {
        await onUpdateItem({...item, done: !item.done});
    };

    const onChangeSearchFilter = (value) => {
        setLabelFilter(value);
    };

    const onStatusFilterChange = (value) => {
        setStatusFilter(value);
    }

    const search = (items, filterValue) => {
        const lowerFilterValue = filterValue.toLowerCase();

        return items.filter(item => item.label.toLowerCase().includes(lowerFilterValue));
    }

    const filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter(item => !item.done)
            case 'done':
                return items.filter(item => item.done)
            default:
                return items;
        }
    };

    const visibleItems = filter(search(todoData, labelFilter), statusFilter);
    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount}/>
            <div className="top-panel d-flex">
                <SearchPanel onChange={onChangeSearchFilter}/>
                <ItemStatusFilter statusFilter={statusFilter} onFilterChange={onStatusFilterChange}/>
            </div>

            <TodoList
                todos={visibleItems}
                onDeleted={onDeleteItem}
                onToggleImportant={onToggleImportant}
                onToggleDone={onToggleDone}
            />

            <ItemAddForm onItemAdded={onCreateTodoItem}/>
        </div>
    );
};

export default App;
