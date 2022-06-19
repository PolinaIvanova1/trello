const getFromLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
}

const updateLocalStorage = (name, tasks) => {
    localStorage.setItem(name, JSON.stringify(tasks));
}

let todos = getFromLocalStorage('todos') || [];
let todosInProgress = getFromLocalStorage('todosInProgress') || [];
let todosDone = getFromLocalStorage('todosDone') || [];

export {getFromLocalStorage, updateLocalStorage, todos, todosInProgress, todosDone}