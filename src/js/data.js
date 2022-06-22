const getFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
}

const updateLocalStorage = (name, tasks) => {
  localStorage.setItem(name, JSON.stringify(tasks));
}

let todos = getFromLocalStorage('todos') || [];
let todosInProgress = getFromLocalStorage('todosInProgress') || [];
let todosDone = getFromLocalStorage('todosDone') || [];

function setTodos (array) {
  todos = array;
}

function setTodosInProgress (array) {
  todosInProgress = array;
}

function setTodosDone (array) {
  todosDone = array;
}

let users = [];

async function fetchUsers () {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/');
  const data = await response.json();
  users = data.map(user => ({id: `${user.id}`, name: `${user.name}`}));
}

export {
  getFromLocalStorage,
  updateLocalStorage,
  todos,
  todosInProgress,
  todosDone,
  users,
  fetchUsers,
  setTodos,
  setTodosInProgress,
  setTodosDone
}
