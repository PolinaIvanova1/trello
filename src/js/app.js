import { $ } from './helpers'

import {
  renderTasks,
  renderModal,
  buttonCloseModalElement,
  formElement,
  todoListElement,
  contentElement,
  todoInProgressElement,
  todoDoneElement
} from './compositions.js';

import {
  handleClickButtonEditElement,
  handleClickButtonDeleteElement,
  handleClickButtonAddTask,
  handleChangeStatus,
  handleClickButtonAddNew,
  handleClickButtonCancel,
  handleClickWarningDelete,
  handleSubmitFormFilter
} from './handlers.js'

import { fetchUsers } from './data';

const todoDeleteAllElement = $('.trello__list__done__button');

const buttonOpenModalElement = $('.trello__list__todo__button');

const formFilterElement = $('#filter');
const formFilterInProgressElement = $('#filterInProgress');
const formFilterDoneElement = $('#filterDone');

function addListeners () {
  buttonOpenModalElement.addEventListener('click', handleClickButtonAddNew);
  buttonCloseModalElement.addEventListener('click', handleClickButtonCancel);
  formElement.addEventListener('submit', handleClickButtonAddTask);
  todoListElement.addEventListener('click', handleClickButtonEditElement);
  todoInProgressElement.addEventListener('click', handleClickButtonEditElement);
  todoDoneElement.addEventListener('click', handleClickButtonEditElement);
  todoListElement.addEventListener('click', handleClickButtonDeleteElement);
  todoDoneElement.addEventListener('click', handleClickButtonDeleteElement);
  contentElement.addEventListener('change', handleChangeStatus);
  todoDeleteAllElement.addEventListener('click', handleClickWarningDelete);
  formFilterElement.addEventListener('change', handleSubmitFormFilter);
  formFilterInProgressElement.addEventListener('change', handleSubmitFormFilter);
  formFilterDoneElement.addEventListener('change', handleSubmitFormFilter);
}

async function start () {
  await fetchUsers();
  renderTasks();
  renderModal();
  addListeners();
}

start();
