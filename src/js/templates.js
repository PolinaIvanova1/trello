const createTemplateTodo = task => {

  let isInProgress = task.status === 'inProgress';
  let isDone = task.status === 'done';
  return `
     <div class="trello__list__dynamic__item 
     ${isInProgress ? `trello__list__dynamic__item__purple` : ''}  
     ${isDone ? `trello__list__dynamic__item__orange` : ''}" id="${task.id}">
        <div class="trello__list__dynamic__item__description">
        <div><b>${task.title}</b></div>
        <div>${task.description}</div>
        <div>${task.priority}</div>
        <div>estimate: ${task.estimate}h</div>
        <div>${task.user.name}</div>
        <div class="list__item__date">${task.createdAt}</div>
     </div>
        <div class="trello__list__dynamic__item__change">
           <select name="" class="form-select form-select-sm trello__list__dynamic__item__status" data-role="changeStatus" required>
              <option value="todos" ${task.status === 'todos' ? 'selected' : ''}>TO DO</option>
              <option value="inProgress" ${isInProgress ? 'selected' : ''}>IN PROGRESS</option>
              <option value="done" ${isDone ? 'selected' : ''}>DONE</option>
           </select>
           <button type="button" class="btn btn-outline-secondary btn-sm trello__list__dynamic__item__change__edit" data-role="editTodo"">Edit
           </button>
           <button type="button" class="btn btn-outline-secondary btn-sm trello__list__dynamic__item__change__delete 
           ${isInProgress ? `trello__list__dynamic__item__hide` : ''}" data-role="removeTodo">Delete
           </button>
        </div>
     </div>
`;
};

function createTemplateSelectUser (user) {
  return `<option value=${user.id}>${user.name}</option>`;
}

export { createTemplateTodo, createTemplateSelectUser };
