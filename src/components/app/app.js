import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        labelFilter: '',
        statusFilter: 'active' // all, active, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.getNextId()
        }
    };

    getNextId() {
        return this.maxId++;
    }

    getIndexById(id) {
        return this.state.todoData.findIndex(el => el.id === id);
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = this.getIndexById(id);

            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];

            return {
                todoData: newArray
            }
        });
    };

    addItem = (itemLabel) => {
        this.setState(({todoData}) => {
           const newItem = this.createTodoItem(itemLabel);

           const newArray = [
               ...todoData,
               newItem
           ];

           return {
               todoData: newArray
           };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = this.getIndexById(id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        const newArray = [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

        return newArray;
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onChangeSearchFilter = (value) => {
        this.setState({
            labelFilter: value
        });
    };

    onStatusFilterChange = (value) => {
        this.setState({
            statusFilter: value
        });
    }

    search(items, filterValue) {
        const lowerFilterValue = filterValue.toLowerCase();

        return items.filter(item => item.label.toLowerCase().includes(lowerFilterValue));
    }

    filter(items, filter) {
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

    render() {
        const {todoData, labelFilter, statusFilter} = this.state;
        const visibleItems = this.filter(this.search(todoData, labelFilter), statusFilter);

        const doneCount = todoData.filter(item => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onChange={this.onChangeSearchFilter}/>
                    <ItemStatusFilter statusFilter={statusFilter} onFilterChange={this.onStatusFilterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
};
