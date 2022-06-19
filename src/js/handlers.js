import {$} from "./helpers";
import {deleteTask} from "./compositions";

const modalWindowElement = $('.trello__modal');

function handleClickButtonOpenModal(event) {
    modalWindowElement.style.display = 'block'
}

function handleClickButtonCloseModal(event) {
    modalWindowElement.style.display = 'none';
}

export {handleClickButtonOpenModal, handleClickButtonCloseModal}