import Modal from './Modal';

export default class ModalQuestion extends Modal {
  constructor(title, message) {
    super(title);
    this.message = message;
    this.title = title;
  }

  createQuestion() {
    this.createModal();

    const modalMainForm = document.querySelector('.modal-main');

    const paragraph = document.createElement('p');
    paragraph.classList.add('paragraph');

    paragraph.innerHTML = `${this.message}`;

    const buttonTemplate = `<form action="" class="form">
                                    <div class="button-container">
                                      <button class="button cancel" type="button">Отмена</button>
                                      <button class="button ok" type="submit">Ок</button>
                                    </div>
                                  </form>`;

    modalMainForm.append(paragraph);
    modalMainForm.insertAdjacentHTML('beforeend', buttonTemplate);
  }
}
