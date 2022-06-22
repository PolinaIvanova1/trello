import { $ } from './helpers';

import {
  deleteTask,
  renderTasks,
  Todo,
  fillTodoForm,
  inputTitleElement,
  textareaDescriptionElement,
  selectUserElement,
  priorityElement,
  estimateElement,
  cleanList,
  showWarningInProgress
} from './compositions';

import {
  todos,
  todosDone,
  todosInProgress,
  users,
  updateLocalStorage,
  setTodos,
  getFromLocalStorage, setTodosInProgress, setTodosDone
} from './data';

// create undefined task

let currentTodo;

// show and hide modal form

const modalWindowElement = $('.trello__modal');

function handleClickButtonOpenModal (event) {
  modalWindowElement.style.display = 'block';
}

function handleClickButtonCloseModal (event) {
  modalWindowElement.style.display = 'none';
}

// show and hide modal warning, if you click to delete all done tasks

const modalWarningDeleteElement = $('.trello__warningDelete');

function showWarningDelete () {
  modalWarningDeleteElement.style.display = 'block';
}

function hideWarningDelete () {
  modalWarningDeleteElement.style.display = 'none';
}

function handleClickWarningDelete (event) {
  if (!todosDone || todosDone.length === 0) return;
  showWarningDelete();
  const formWarningElement = $('#formWarning');
  const cancelDeleteElement = $('#cancel');
  formWarningElement.addEventListener('submit', (e) => {
    e.preventDefault();
    cleanList();
    hideWarningDelete();
  });
  cancelDeleteElement.addEventListener('click', () => {
    hideWarningDelete();
  });
}

function handleClickButtonAddNew () {
  fillTodoForm();
  handleClickButtonOpenModal();
}

function handleClickButtonCancel () {
  currentTodo = undefined;
  handleClickButtonCloseModal();
}

function handleClickButtonAddTask (event) {
  event.preventDefault();
  let user = users.find(user => user.id === selectUserElement.value);
  const allTasks = [...todos, ...todosDone, ...todosInProgress];
  if (currentTodo) {
    // update existing task
    const todo = allTasks.find(todo => todo.id.toString() === currentTodo.id.toString());
    todo.title = inputTitleElement.value;
    todo.description = textareaDescriptionElement.value;
    todo.user = user;
    todo.priority = priorityElement.value;
    todo.estimate = estimateElement.value;
  } else {
    // create new task
    todos.push(new Todo(inputTitleElement.value, textareaDescriptionElement.value, user, priorityElement.value, estimateElement.value));
  }

  currentTodo = undefined;
  updateLocalStorage('todos', todos);
  renderTasks();
  handleClickButtonCloseModal();
}

function handleClickButtonEditElement (event) {
  const target = event.target;
  const role = target.dataset.role;

  if (role === 'editTodo') {
    const todoListElement = target.closest('.trello__list__dynamic__item');
    const id = todoListElement.id;
    const allTasks = [...todos, ...todosDone, ...todosInProgress];
    const task = allTasks.find(todo => todo.id.toString() === id.toString());
    if (!task) return;
    currentTodo = task;
    fillTodoForm(task);
    handleClickButtonOpenModal();
    renderTasks();
  }
}

function handleClickButtonDeleteElement (event) {
  const target = event.target;
  const role = target.dataset.role;
  if (role === 'removeTodo') {
    const todoListElement = target.closest('.trello__list__dynamic__item');
    const id = todoListElement.id;
    deleteTask(id, todosDone, 'todosDone');
    deleteTask(id, todos, 'todos');
    renderTasks();
  }
}

function handleChangeStatus (event) {
  const target = event.target;
  const role = target.dataset.role;
  let value = target.value;

  if (role === 'changeStatus') {
    const taskElement = target.closest('.trello__list__dynamic__item');
    const id = taskElement.id;
    const allTodos = [...todos, ...todosInProgress, ...todosDone];
    const task = allTodos.find(todo => todo.id.toString() === id.toString());
    if (!task) return;

    if (value === 'inProgress') {
      if (todosInProgress.length < 6) {
        task.status = value;
        todosInProgress.push(task);
        deleteTask(id, todos, 'todos');
        deleteTask(id, todosDone, 'todosDone');
      } else {
        showWarningInProgress();
      }
    }

    if (value === 'todos') {
      task.status = value;
      todos.push(task);
      deleteTask(id, todosInProgress, 'todosInProgress');
      deleteTask(id, todosDone, 'todosDone');
    }
    if (value === 'done') {
      task.status = value;
      todosDone.push(task);
      deleteTask(id, todosInProgress, 'todosInProgress');
      deleteTask(id, todos, 'todos');
    }
    updateLocalStorage('todos', todos);
    updateLocalStorage('todosInProgress', todosInProgress);
    updateLocalStorage('todosDone', todosDone);
    renderTasks();
  }
}

function handleSubmitFormFilter (event) {
  event.preventDefault();

  const inputSearchElement = $('#search');
  const inputSearchInProgressElement = $('#searchInProgress');
  const inputSearchDoneElement = $('#searchDone');

  const sortElement = $('#sortTodos');
  const sortInProgressElement = $('#sortTodosInProgress');
  const sortDoneElement = $('#sortTodosDone');

  let resultsSearchTodos = getFromLocalStorage('todos').filter((item) => item.title.includes(inputSearchElement.value));
  let resultsSearchInProgress = getFromLocalStorage('todosInProgress').filter((item) => item.title.includes(inputSearchInProgressElement.value));
  let resultsSearchDone = getFromLocalStorage('todosDone').filter((item) => item.title.includes(inputSearchDoneElement.value));

  if (sortElement.value === 'task') {
    resultsSearchTodos = resultsSearchTodos.sort((prev, next) => prev.title.localeCompare(next.title));
  }
  if (sortInProgressElement.value === 'task') {
    resultsSearchInProgress = resultsSearchInProgress.sort((prev, next) => prev.title.localeCompare(next.title));
  }
  if (sortDoneElement.value === 'task') {
    resultsSearchDone = resultsSearchDone.sort((prev, next) => prev.title.localeCompare(next.title));
  }

  if (sortElement.value === 'createdAt') {
    resultsSearchTodos = resultsSearchTodos.sort((prev, next) => {
      const prevTime = new Date(prev.createdAt).getTime();
      const nextTime = new Date(next.createdAt).getTime();
      return nextTime - prevTime;
    });
  }
  if (sortInProgressElement.value === 'createdAt') {
    resultsSearchInProgress = resultsSearchInProgress.sort((prev, next) => {
      const prevTime = new Date(prev.createdAt).getTime();
      const nextTime = new Date(next.createdAt).getTime();
      return nextTime - prevTime;
    });
  }
  if (sortDoneElement.value === 'createdAt') {
    resultsSearchDone = resultsSearchDone.sort((prev, next) => {
      const prevTime = new Date(prev.createdAt).getTime();
      const nextTime = new Date(next.createdAt).getTime();
      return nextTime - prevTime;
    });
  }
  if (sortElement.value === 'priority') {
    resultsSearchTodos = resultsSearchTodos.sort((prev, next) => next.priority.length - prev.priority.length);
  }
  if (sortInProgressElement.value === 'priority') {
    resultsSearchInProgress = resultsSearchInProgress.sort((prev, next) => next.priority.length - prev.priority.length);
  }
  if (sortDoneElement.value === 'priority') {
    resultsSearchDone = resultsSearchDone.sort((prev, next) => next.priority.length - prev.priority.length);
  }

  setTodos(resultsSearchTodos);
  setTodosInProgress(resultsSearchInProgress);
  setTodosDone(resultsSearchDone);
  renderTasks();
}

export {
  handleClickButtonOpenModal,
  handleClickButtonCloseModal,
  handleClickButtonAddNew,
  handleClickButtonCancel,
  handleClickButtonAddTask,
  handleClickButtonEditElement,
  handleClickButtonDeleteElement,
  handleChangeStatus,
  handleClickWarningDelete,
  handleSubmitFormFilter
}
