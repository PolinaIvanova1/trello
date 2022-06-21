import {$} from "./helpers";
import {
    todos,
    todosDone,
    todosInProgress,
    updateLocalStorage
} from "./data";
import {
    createTemplateSelectUser,
    createTemplateTodo
} from "./templates";
import {users} from './app.js'

const counterTodosElement = $('#counter');
const counterInProgressElement = $('#counterInProgress');
const counterDoneElement = $('#counterDone');

const inputTitleElement = $('.trello__modal__content__title');
const textareaDescriptionElement = $('.trello__modal__content__description');
const selectUserElement = $('.trello__modal__content__user');

const contentElement = $('.trello__list');

const todoListElement = $('.trello__list__dynamic');
const todoInProgressElement = $('.trello__list__progress__task')
const todoDoneElement = $('.trello__list__done__task')

const buttonOpenModalElement = $('.trello__list__todo__button');

const formElement = $('.trello__modal__content')

const buttonCloseModalElement = $('.trello__modal__content__handle__close');

function Todo(title, description, user) {
    this.title = title;
    this.description = description;
    this.user = user;
    this.createdAt = getDate();
    this.id = new Date().getTime();
    this.status = 'todos';
}

function getDate() {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 10) hour = '0' + hour;
    let min = today.getMinutes();
    if (min < 10) min = '0' + min;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = today.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    const yyyy = today.getFullYear();
    today = `${hour}:${min} ${dd}.${mm}.${yyyy}`;
    return today;
}

function showCurrentTime() {
    const timeElement = $('.trello__main__time');
    const dateElement = $('.trello__main__date');
    const date = new Date();
    const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const weekDay = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    timeElement.innerText = `${hours}:${minutes}:${seconds}`;
    dateElement.innerHTML = `${month} ${day}, ${year}<br>${weekDay}`;
}

setInterval(showCurrentTime, 1000)

const deleteTask = (id, array, name) => {
    const index = array.findIndex(task => task.id.toString() === id.toString());
    if (index < 0) return
    array.splice(index, 1);
    updateLocalStorage(name, array);
}

function countTodos(array, element) {
    if (!array || array === []) {
        element.innerText = `0`
    } else {
        element.innerText = array.length
    }
}

function fillTodoForm(task) {
    inputTitleElement.value = task?.title || ''
    textareaDescriptionElement.value = task?.description || ''
    selectUserElement.value = task?.user.id || ''
}

function renderModal() {
    users.forEach(user => {
        selectUserElement.innerHTML += createTemplateSelectUser(user);
    })
}

function renderTasks() {
    countTodos(todos, counterTodosElement)
    countTodos(todosInProgress, counterInProgressElement)
    countTodos(todosDone, counterDoneElement)
    todoListElement.innerHTML = '';
    todoInProgressElement.innerHTML = '';
    todoDoneElement.innerHTML = '';
    todos.forEach((item, index) => {
        todoListElement.innerHTML += createTemplateTodo(item, index);
    })
    todosInProgress.forEach((item, index) => {
        todoInProgressElement.innerHTML += createTemplateTodo(item, index);
    })
    todosDone.forEach((item, index) => {
        todoDoneElement.innerHTML += createTemplateTodo(item, index);
    })
}

function cleanList() {
    todosDone.length = 0
    updateLocalStorage('todosDone', todosDone)
    renderTasks()
}

export {
    users,
    getDate,
    showCurrentTime,
    Todo,
    countTodos,
    deleteTask,
    renderTasks,
    renderModal,
    fillTodoForm,
    todoListElement,
    todoDoneElement,
    todoInProgressElement,
    contentElement,
    buttonOpenModalElement,
    formElement,
    buttonCloseModalElement,
    inputTitleElement,
    textareaDescriptionElement,
    selectUserElement,
    cleanList
}