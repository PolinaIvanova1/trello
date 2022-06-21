import {$} from './helpers'
import {
    renderTasks,
    renderModal,
    buttonOpenModalElement,
    buttonCloseModalElement,
    formElement,
    todoListElement,
    contentElement,
    todoInProgressElement,
    todoDoneElement,
} from './compositions.js';

import {
    handleClickButtonEditElement,
    handleClickButtonDeleteElement,
    handleClickButtonAddTask,
    handleChangeStatus,
    handleClickAddNewButton,
    handleClickCancelButton,
    handleClickButtonDeleteAll,
    handleClickWarningDeleteTasks
} from './handlers.js';

let users = []

async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await response.json();
    users = data.map(user => ({id: `${user.id}`, name: `${user.name}`}));
}

const todoDeleteAllElement = $('.trello__list__done__button')

function addListeners() {
    buttonOpenModalElement.addEventListener('click', handleClickAddNewButton);
    buttonCloseModalElement.addEventListener('click', handleClickCancelButton)
    formElement.addEventListener('submit', handleClickButtonAddTask)
    todoListElement.addEventListener('click', handleClickButtonEditElement);
    todoListElement.addEventListener('click', handleClickButtonDeleteElement);
    todoDoneElement.addEventListener('click', handleClickButtonDeleteElement);
    contentElement.addEventListener('change', handleChangeStatus)
    todoDeleteAllElement.addEventListener('click', handleClickWarningDeleteTasks)
}

async function start() {
    await fetchUsers();
    renderTasks();
    renderModal();
    addListeners()
}

return start()

export {users}