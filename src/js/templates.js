const createTemplateTodo = task => {
    return `
            <div class="trello__list__dynamic__item" id="${task.id}">
                    <div class="trello__list__dynamic__item__description">
                        <div>${task.title}</div>
                        <div>${task.description}</div>
                        <div>${task.user.name}</div>
                        <div class="list__item__date">${task.createdAt}</div>
                    </div>
                    <div>
                         <select name="" class="form-select trello__list__dynamic__item__status" data-role="changeStatus" required>
                            <option value="todos">TO DO</option>
                            <option value="inProgress">IN PROGRESS</option>
                            <option value="done">DONE</option>
                        </select>
                        <button type="button" class="btn btn-outline-secondary trello__list__dynamic__item__edit" data-role="editTodo"">Edit</button>
                        <button type="button" class="btn btn-outline-secondary trello__list__dynamic__item__delete" data-role="removeTodo">Delete</button>
                    </div>
            </div>
`;
}

function createTemplateSelectUser(user) {
    return `<option value=${user.id}>${user.name}</option>`
}

export {createTemplateTodo, createTemplateSelectUser}