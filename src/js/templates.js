const createTemplateTodo = task => {

    let isInProgress = task.status === "inProgress";
    let isDone =task.status === "done"
    return `
            <div class="trello__list__dynamic__item 
                ${isInProgress ? `trello__list__dynamic__item__purple` : ''}  
                ${isDone ? `trello__list__dynamic__item__orange` : ''}" id="${task.id}">
                    <div class="trello__list__dynamic__item__description">
                        <div>${task.title}</div>
                        <div>${task.description}</div>
                        <div>${task.user.name}</div>
                        <div class="list__item__date">${task.createdAt}</div>
                    </div>
                    <div>
                         <select name="" class="form-select trello__list__dynamic__item__status" data-role="changeStatus" required>
                            <option value="todos" ${task.status === "todos" ? "selected" : ""}>TO DO</option>
                            <option value="inProgress" ${isInProgress ? "selected" : ""}>IN PROGRESS</option>
                            <option value="done" ${isDone ? "selected" : ""}>DONE</option>
                        </select>
                        <button type="button" class="btn btn-outline-secondary trello__list__dynamic__item__edit ${isInProgress || isDone ? `trello__list__dynamic__item__hide` : ''}" data-role="editTodo"">Edit</button>
                        <button type="button" class="btn btn-outline-secondary trello__list__dynamic__item__delete ${isInProgress ? `trello__list__dynamic__item__hide` : ''}" data-role="removeTodo">Delete</button>
                    </div>
            </div>
`;
}

function createTemplateSelectUser(user) {
    return `<option value=${user.id}>${user.name}</option>`
}

export {createTemplateTodo, createTemplateSelectUser}