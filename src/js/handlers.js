import {$} from "./helpers";
import {
    deleteTask,
    renderTasks,
    Todo,
    fillTodoForm,
    inputTitleElement,
    textareaDescriptionElement,
    selectUserElement,
} from "./compositions";
import {users} from './app'
import {todos, todosDone, todosInProgress, updateLocalStorage} from "./data";

const modalWindowElement = $('.trello__modal');
let currentTodo = undefined;

function handleClickButtonOpenModal(event) {
    modalWindowElement.style.display = 'block'
}

function handleClickButtonCloseModal(event) {
    modalWindowElement.style.display = 'none';
}

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

function handleClickButtonDeleteElement(event) {
    const target = event.target;
    const role = target.dataset.role;
    if (role === 'removeTodo') {
        const todoListElement = target.closest('.trello__list__dynamic__item');
        const id = todoListElement.id;
        deleteTask(id, todos, 'todos')
        deleteTask(id, todosInProgress, 'todosInProgress')
        deleteTask(id, todosDone, 'todosDone')
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
        const allTodos = [...todos, ...todosInProgress, ...todosDone]
        const task = allTodos.find(todo => todo.id.toString() === id.toString());
        task.status = value
        console.log(task.status)
        if (value === 'inProgress') {
            todosInProgress.push(task);
            deleteTask(id, todos, 'todos')
            deleteTask(id, todosDone, 'todosDone')
        }
        if (value === 'todos') {
            todos.push(task);
            deleteTask(id, todosInProgress, 'todosInProgress')
            deleteTask(id, todosDone, 'todosDone')
        }
        if (value === 'done') {
            todosDone.push(task);
            deleteTask(id, todosInProgress, 'todosInProgress')
            deleteTask(id, todos, 'todos')
        }
        updateLocalStorage('todos', todos)
        updateLocalStorage('todosInProgress', todosInProgress)
        updateLocalStorage('todosDone', todosDone)
        renderTasks();
    }
}

export {
    handleClickButtonOpenModal,
    handleClickButtonCloseModal,
    handleClickAddNewButton,
    handleClickCancelButton,
    handleClickButtonAddTask,
    handleClickButtonEditElement,
    handleClickButtonDeleteElement,
    handleChangeStatus
}