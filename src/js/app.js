import {$} from './helpers.js';
import {createTemplateTodo, createTemplateSelectUser} from './templates.js';
import {getDate, showCurrentTime, Todo, countTodos, deleteTask} from './compositions.js';
import {updateLocalStorage, getFromLocalStorage, todos, todosInProgress, todosDone} from './data.js';
import {handleClickButtonOpenModal, handleClickButtonCloseModal} from './handlers.js';

const todoListElement = $('.trello__list__dynamic');
const todoInProgressElement = $('.trello__list__progress__task')
const todoDoneElement = $('.trello__list__done__task')
const buttonOpenModalElement = $('.trello__list__todo__button');

const formElement = $('.trello__modal__content')
const inputTitleElement = $('.trello__modal__content__title');
const textareaDescriptionElement = $('.trello__modal__content__description');
const selectUserElement = $('.trello__modal__content__user');
const buttonCloseModalElement = $('.trello__modal__content__handle__close');

const counterTodosElement = $('#counter');
const counterInProgressElement = $('#counterInProgress');
const counterDoneElement = $('#counterDone');

let currentTodo = undefined;

let users = []

function handleClickAddNewButton() {
    fillTodoForm();
    handleClickButtonOpenModal()
}

function handleClickCancelButton() {
    currentTodo = undefined
    handleClickButtonCloseModal()
    inputTitleElement.classList.remove('is-invalid')
    textareaDescriptionElement.classList.remove('is-invalid')
    selectUserElement.classList.remove('is-invalid')
}

function handleClickButtonAddTask(event) {
    event.preventDefault()
    let user = users.find(user => user.id === selectUserElement.value);

    if (currentTodo) {
        // update existing todo
        const todo = todos.find(todo => todo.id.toString() === currentTodo.id.toString());
        todo.title = inputTitleElement.value
        todo.description = textareaDescriptionElement.value
        todo.user = user
    } else {
        // create new todo
        todos.push(new Todo(inputTitleElement.value, textareaDescriptionElement.value, user));
    }

    currentTodo = undefined;
    updateLocalStorage('todos', todos);
    renderTasks()
    handleClickButtonCloseModal()
}

function fillTodoForm(task) {
    inputTitleElement.value = task?.title || ''
    textareaDescriptionElement.value = task?.description || ''
    selectUserElement.value = task?.user.id || ''
}


function handleClickButtonEditElement(event) {

    const target = event.target;
    const role = target.dataset.role;

    if (role === 'editTodo') {
        const todoListElement = target.closest('.trello__list__dynamic__item');
        const id = todoListElement.id;
        const task = todos.find(todo => todo.id.toString() === id.toString());
        if (!task) return;
        console.log(task)
        currentTodo = task;
        fillTodoForm(task)
        handleClickButtonOpenModal()
        renderTasks();
    }
}

function handleChangeStatus(event) {

    const target = event.target;
    const role = target.dataset.role;
    const value = target.value;

    if (role === 'changeStatus') {
        const taskElement = target.closest('.trello__list__dynamic__item');
        const id = taskElement.id;
        // const task = todos.find(todo => todo.id.toString() === id.toString());
        // console.log(value)
        // if (value === 'inProgress') {
        //     todosInProgress.push(task);
        //     deleteTask(id, todos)
        //     deleteTask(id, todosDone)
        // }
        // const inProgress = todosInProgress.find(todo => todo.id.toString() === id.toString());
        //
        // if (!task) return;

        updateLocalStorage('todos', todos)
        updateLocalStorage('todosInProgress', todosInProgress)
        updateLocalStorage('todosDone', todosDone)
        renderTasks();
    }
}

function handleClickButtonDeleteElement(event) {
    const target = event.target;
    const role = target.dataset.role;
    if (role === 'removeTodo') {
        const todoListElement = target.closest('.trello__list__dynamic__item');
        const id = todoListElement.id;
        deleteTask(id)
        renderTasks();
    }
}

async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await response.json();
    users = data.map(user => ({id: `${user.id}`, name: `${user.name}`}));
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

function renderModal() {
    users.forEach(user => {
        selectUserElement.innerHTML += createTemplateSelectUser(user);
    })
}

function addListeners() {
    buttonOpenModalElement.addEventListener('click', handleClickAddNewButton);
    buttonCloseModalElement.addEventListener('click', handleClickCancelButton)
    formElement.addEventListener('submit', handleClickButtonAddTask)
    todoListElement.addEventListener('click', handleClickButtonEditElement);
    todoListElement.addEventListener('click', handleClickButtonDeleteElement);
    todoListElement.addEventListener('change', handleChangeStatus)

}


async function start() {
    await fetchUsers();
    renderTasks();
    renderModal();
    addListeners()
}

return start()