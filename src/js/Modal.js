export default class Modal {
  constructor(title) {
    this.title = title;
  }

  createModal() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'active');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-title');
    const title = document.createElement('h3');
    title.classList.add('title');
    title.innerHTML = `${this.title}`;
    const modalMain = document.createElement('div');
    modalMain.classList.add('modal-main');
    // const modalButton = document.createElement('div');
    // modalContent.classList.add('modalButton');

    modalTitle.append(title);
    modalContent.appendChild(modalTitle);
    modalContainer.appendChild(modalContent);
    modalContent.appendChild(modalMain);

    const container = document.querySelector('.container');
    container.append(modalContainer);
  }
}
