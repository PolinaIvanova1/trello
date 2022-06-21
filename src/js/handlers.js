import {$} from "./helpers";
import {
    deleteTask,
    renderTasks,
    Todo,
    fillTodoForm,
    inputTitleElement,
    textareaDescriptionElement,
    selectUserElement,
    cleanList
} from "./compositions";
import {users} from './app'
import {todos, todosDone, todosInProgress, updateLocalStorage} from "./data";
import {} from "./templates";


let currentTodo;

// show and hide modal form

const modalWindowElement = $('.trello__modal');

function handleClickButtonOpenModal(event) {
    modalWindowElement.style.display = 'block'
}

function handleClickButtonCloseModal(event) {
    modalWindowElement.style.display = 'none';
}

// show and hide modal warning, if you try to delete all done tasks

const modalWarningDeleteElement = $('.trello__warningDelete');

function showWarning() {
    modalWarningDeleteElement.style.display = 'block'
}

function hideWarning() {
    modalWarningDeleteElement.style.display = 'none'
}

function handleClickWarningDeleteTasks(event) {
    showWarning()
    const formWarningElement = $('#formWarning')
    const cancelDeleteElement = $('#cancel')
    formWarningElement.addEventListener('submit', (e) => {
        e.preventDefault()
        cleanList()
        hideWarning()
    })
    cancelDeleteElement.addEventListener('click', () => {
        hideWarning()
    })
}

function handleClickAddNewButton() {
    fillTodoForm();
    handleClickButtonOpenModal();
}

function handleClickCancelButton() {
    currentTodo = undefined;
    handleClickButtonCloseModal();
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
        currentTodo = task;
        fillTodoForm(task);
        handleClickButtonOpenModal();
        renderTasks();
    }
}

function handleClickButtonDeleteElement(event) {
    const target = event.target;
    const role = target.dataset.role;
    if (role === 'removeTodo') {
        const todoListElement = target.closest('.trello__list__dynamic__item');
        const id = todoListElement.id;
        deleteTask(id, todosDone, 'todosDone')
        deleteTask(id, todos, 'todos')
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
        if (!task) return
        task.status = value
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
    handleChangeStatus,

    handleClickWarningDeleteTasks
}