import {
    renderTasks,
    renderModal,
    buttonOpenModalElement,
    buttonCloseModalElement,
    formElement,
    todoListElement,
    contentElement,
} from './compositions.js';

import {
    handleClickButtonEditElement,
    handleClickButtonDeleteElement,
    handleClickButtonAddTask,
    handleChangeStatus,
    handleClickAddNewButton,
    handleClickCancelButton,
} from './handlers.js';

let users = []

async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await response.json();
    console.log(data)
   users = data.map(user => ({id: `${user.id}`, name: `${user.name}`}));

}

function addListeners() {
    buttonOpenModalElement.addEventListener('click', handleClickAddNewButton);
    buttonCloseModalElement.addEventListener('click', handleClickCancelButton)
    formElement.addEventListener('submit', handleClickButtonAddTask)
    todoListElement.addEventListener('click', handleClickButtonEditElement);
    todoListElement.addEventListener('click', handleClickButtonDeleteElement);
    contentElement.addEventListener('change', handleChangeStatus)

}

async function start() {
    await fetchUsers();
    renderTasks();
    renderModal();
    addListeners()
}

return start()

export {users}