const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('todos'));
}

const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export {getFromLocalStorage,updateLocalStorage}