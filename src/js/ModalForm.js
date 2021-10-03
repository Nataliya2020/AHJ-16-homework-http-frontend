import Modal from './Modal';

export default class ModalForm extends Modal {
  createForm() {
    this.createModal();
    const modalMainForm = document.querySelector('.modal-main');
    modalMainForm.innerHTML = `<form action="" class="form">
                                 <label>
                                   <span class="name">Краткое описание</span>
                                   <input class="task-name" name="name"  required>
                                 </label>
                                 <label>
                                   <span class="description">Подробное описание</span>
                                   <textarea class="task-description" name="description" required></textarea>
                                 </label>
                                 <div class="button-container">
                                   <button class="button cancel" type="button">Отмена</button>
                                   <button class="button ok" type="submit">Ок</button>
                                 </div>
                               </form>`;
  }
}
