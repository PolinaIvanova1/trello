const createTemplate = task => {
    return `
            <div class="trello__list__dynamic__item">
                    <div class="trello__list__dynamic__item__description">
                        <div>${task.title}</div>
                        <div>${task.description}</div>
                        <div>${task.user.name}</div>
                        <div class="list__item__date">${task.createdAt}</div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-outline-secondary" data-role="editTodo">Edit</button>
                        <button type="button" class="btn btn-outline-secondary">---></button>
                        <button type="button" class="btn btn-outline-secondary" data-role="removeTodo">Delete</button>
                    </div>
            </div>
`;
}



export {createTemplate}