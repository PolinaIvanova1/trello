import {$} from './helpers.js';
import {createTemplate} from './templates.js';
import {getDate, showCurrentTime} from './compositions.js';
import {updateLocalStorage, getFromLocalStorage} from './data.js';

const todoListElement = $('.trello__list__dynamic');

const modalWindowElement = $('.trello__modal');
const buttonOpenModalElement = $('.trello__list__todo__button');

const inputTitleElement = $('.trello__modal__content__title');
const textareaDescriptionElement = $('.trello__modal__content__description');
const selectUserElement = $('.trello__modal__content__user');

const buttonCloseModalElement = $('.trello__modal__content__handle__close');

const buttonAddElement = $('.trello__modal__content__handle__submit');

buttonOpenModalElement.addEventListener('click', handleClickButtonOpenModal);

let todos = [];
let todosInProgress = [];
let todosDone = [];
let users = [];

async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await response.json();
    users = data.map(user => ({id: `${user.id}`, name: `${user.name}`}));
}

function render() {
    users.forEach(user => {
        selectUserElement.innerHTML += `<option value=${user.id}>${user.name}</option>`;
    })
    todoListElement.innerHTML = '';
    todos.forEach((item, index) => {
        todoListElement.innerHTML += createTemplate(item, index);
    })
}

buttonAddElement.addEventListener('click', handleClickButtonAddTask)


function handleClickButtonOpenModal(event) {
    event.preventDefault();
    modalWindowElement.style.display = 'block'
}

buttonCloseModalElement.addEventListener('click', handleClickButtonCloseModal)

function handleClickButtonCloseModal(event) {
    event?.preventDefault();
    modalWindowElement.style.display = 'none';
}

function handleClickButtonAddTask(event) {
    let user = users.find(user => user.id === selectUserElement.value);
    todos.push(new Todo(inputTitleElement.value, textareaDescriptionElement.value, user));

    updateLocalStorage(todos);

    render()

    inputTitleElement.value = ''
    textareaDescriptionElement.value = ''
    selectUserElement.value = ''
    handleClickButtonCloseModal()
}


function Todo(title, description, user) {
    this.title = title;
    this.description = description;
    this.user = user;
    this.createdAt = getDate();
    this.id = new Date().getTime();
    this.isCompleted = false;

}

async function start() {
    await fetchUsers();
    render();
}

start()