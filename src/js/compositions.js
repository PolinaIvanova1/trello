import { $ } from './helpers';

import {
  todos,
  todosDone,
  todosInProgress,
  updateLocalStorage,
  users
} from './data';

import {
  createTemplateSelectUser,
  createTemplateTodo
} from './templates';

import { getDate } from './time';

const counterTodosElement = $('#counter');
const counterInProgressElement = $('#counterInProgress');
const counterDoneElement = $('#counterDone');

const inputTitleElement = $('.trello__modal__content__title');
const textareaDescriptionElement = $('.trello__modal__content__description');
const selectUserElement = $('.trello__modal__content__user');
const priorityElement = $('.trello__modal__content__priority');
const estimateElement = $('.trello__modal__content__estimate');
const contentElement = $('.trello__list');

const todoListElement = $('.trello__list__dynamic');
const todoInProgressElement = $('.trello__list__progress__task');
const todoDoneElement = $('.trello__list__done__task');

const formElement = $('.trello__modal__content');

const buttonCloseModalElement = $('.trello__modal__content__handle__close');

function Todo (title, description, user, priority, estimate) {
  this.title = title;
  this.description = description;
  this.user = user;
  this.createdAt = getDate();
  this.id = new Date().getTime();
  this.status = 'todos';
  this.priority = priority;
  this.estimate = estimate
}

const deleteTask = (id, array, name) => {
  const index = array.findIndex(task => task.id.toString() === id.toString());
  if (index < 0) return;
  array.splice(index, 1);
  updateLocalStorage(name, array);
}

function countTodos (array, element) {
  if (!array || array === []) {
    element.innerText = `0`;
  } else {
    element.innerText = array.length;
  }
}

function fillTodoForm (task) {
  inputTitleElement.value = task?.title || '';
  textareaDescriptionElement.value = task?.description || '';
  selectUserElement.value = task?.user.id || '';
  priorityElement.value = task?.priority || '';
  estimateElement.value = task?.estimate || '';
}

function renderModal () {
  users.forEach(user => {
    selectUserElement.innerHTML += createTemplateSelectUser(user);
  });
}

const modalWarningInProgress = $('.trello__warningTasks');

function showWarningInProgress () {
  modalWarningInProgress.style.display = 'block';

  modalWarningInProgress.addEventListener('submit', (event) => {
    event.preventDefault();
    hideWarningInProgress();
  });
}

function hideWarningInProgress () {
  modalWarningInProgress.style.display = 'none';
}

function renderTasks () {
  countTodos(todos, counterTodosElement);
  countTodos(todosInProgress, counterInProgressElement);
  countTodos(todosDone, counterDoneElement);
  todoListElement.innerHTML = '';
  todoInProgressElement.innerHTML = '';
  todoDoneElement.innerHTML = '';
  todos.forEach((item, index) => {
    todoListElement.innerHTML += createTemplateTodo(item, index);
  });
  todosInProgress.forEach((item, index) => {
    todoInProgressElement.innerHTML += createTemplateTodo(item, index);
  });
  todosDone.forEach((item, index) => {
    todoDoneElement.innerHTML += createTemplateTodo(item, index);
  });
}

function cleanList () {
  todosDone.length = 0;
  updateLocalStorage('todosDone', todosDone);
  renderTasks();
}

export {
  users,
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
  formElement,
  buttonCloseModalElement,
  inputTitleElement,
  textareaDescriptionElement,
  selectUserElement,
  priorityElement,
  estimateElement,
  cleanList,
  showWarningInProgress
}
