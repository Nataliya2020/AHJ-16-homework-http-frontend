import ModalForm from './ModalForm';
import ModalQuestion from './ModalQuestion';
import Tooltip from './Tooltip';
import sendRequest from './sendRequest';

export default class TaskController {
  constructor(container) {
    this.container = container;
    this.target = null;
    this.createTask = this.createTask.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.sendEditTask = this.sendEditTask.bind(this);
  }

  createListTasks() {
    const listContainer = document.createElement('ul');
    listContainer.classList.add('list');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const buttonAdd = document.createElement('button');
    buttonAdd.classList.add('button', 'button-add');
    buttonAdd.textContent = 'Добавить тикет';

    buttonContainer.append(buttonAdd);

    this.container.append(buttonContainer);
    this.container.appendChild(listContainer);
  }

  getListTask() {
    this.container.querySelector('.list').innerHTML = '';
    sendRequest('GET', 'allTickets', null, {})
      .then((data) => {
        data.forEach((item) => {
          const {
            id, name, status, created,
          } = item;

          const liItem = document.createElement('li');
          liItem.classList.add('liItem');
          liItem.setAttribute('data-id', id);
          liItem.setAttribute('data-status', status);

          const checkBox = document.createElement('input');
          checkBox.classList.add('checkbox');
          checkBox.setAttribute('type', 'checkbox');

          const metaName = document.createElement('div');
          metaName.classList.add('meta-name');
          metaName.textContent = `${name}`;

          const metaTime = document.createElement('div');
          metaTime.classList.add('meta-time');
          metaTime.textContent = `${created}`;

          liItem.append(metaName);
          liItem.append(metaTime);

          const buttonCtrlContainer = document.createElement('div');
          buttonCtrlContainer.classList.add('button-ctrl-container');

          const buttonEdit = document.createElement('button');
          buttonEdit.classList.add('button-ctrl', 'button-edit');
          buttonEdit.textContent = '\u{270E}';

          const buttonDelete = document.createElement('button');
          buttonDelete.classList.add('button-ctrl', 'button-delete');
          buttonDelete.textContent = '\u{2716}';

          liItem.prepend(checkBox);

          buttonCtrlContainer.appendChild(buttonEdit);
          buttonCtrlContainer.appendChild(buttonDelete);

          liItem.appendChild(buttonCtrlContainer);

          const listContainer = document.querySelector('.list');
          listContainer.append(liItem);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  createTask(event) {
    event.preventDefault();

    const formName = document.querySelector('.task-name');
    const formDescription = document.querySelector('.task-description');

    if (formName.value !== '' && formDescription.value !== '') {
      const formData = new FormData(document.querySelector('.form'));
      const dataForm = {};
      for (const [key, prop] of formData) {
        dataForm[key] = prop;
      }
      sendRequest('POST', 'createTicket', null, dataForm)
        .then(() => {
          this.closeModal();
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      const tooltip = new Tooltip('Заполните оба поля');
      tooltip.createTooltip(event);

      event.target.closest('.form').querySelector('.task-name').addEventListener('input', () => {
        if (event.target.closest('.form').querySelector('.tooltip')
          && event.target.closest('.form').querySelector('.task-name').value) {
          event.target.closest('.form').querySelector('.tooltip').remove();
        }
      });

      event.target.closest('.form').querySelector('.task-description').addEventListener('input', () => {
        if (event.target.closest('.form').querySelector('.tooltip')
          && event.target.closest('.form').querySelector('.task-description').value) {
          event.target.closest('.form').querySelector('.tooltip').remove();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.remove();
    this.getListTask();
  }

  openModal(event) {
    event.preventDefault();
    new ModalForm('Добавить тикет').createForm();

    const buttonOK = document.querySelector('.ok');

    buttonOK.addEventListener('click', () => this.createTask(event));

    const buttonCancel = document.querySelector('.cancel');
    buttonCancel.addEventListener('click', () => {
      event.preventDefault();
      const modal = document.querySelector('.modal');
      modal.remove();
    });
  }

  getDescription(event) {
    this.target = event.target;
    const { id } = this.target.closest('.liItem').dataset;
    const liPrevSibling = event.target.closest('.liItem');
    const liNextSibling = document.createElement('li');
    liNextSibling.classList.add('li-accord');
    liNextSibling.textContent = '';

    sendRequest('GET', 'ticketById', id, {})
      .then((data) => {
        liNextSibling.textContent = data.description;
        if (event.target.closest('.liItem').nextElementSibling && event.target.closest('.liItem').nextElementSibling.classList.contains('li-accord')) {
          event.target.closest('.liItem').nextElementSibling.remove();
        } else {
          liPrevSibling.parentNode.insertBefore(liNextSibling, liPrevSibling.nextSibling);
        }
      }).catch((err) => {
        throw new Error(err);
      });
  }

  deleteTicket(event) {
    event.preventDefault();
    new ModalQuestion('Удалить', 'Вы точно хотите удалить тикет?').createQuestion();
    const { id } = event.target.closest('.liItem').dataset;

    const buttonOK = document.querySelector('.ok');

    buttonOK.addEventListener('click', () => {
      event.preventDefault();
      sendRequest('GET', 'deleteTicket', id, {})
        .then(() => {
          this.closeModal();
        }).catch((err) => {
          throw new Error(err);
        });
    });

    const buttonCancel = document.querySelector('.cancel');
    buttonCancel.addEventListener('click', () => {
      event.preventDefault();
      const modal = document.querySelector('.modal');
      modal.remove();
    });
  }

  sendEditTask(event, id) {
    event.preventDefault();

    const formName = document.querySelector('.task-name');
    const formDescription = document.querySelector('.task-description');

    if (formName.value !== '' && formDescription.value !== '') {
      const formData = new FormData(document.querySelector('.form'));
      const dataForm = {};
      for (const [key, prop] of formData) {
        dataForm[key] = prop;
      }
      dataForm.id = id;
      sendRequest('POST', 'createTicket', id, dataForm)
        .then(() => {
          this.closeModal();
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      const tooltip = new Tooltip('Заполните оба поля');
      tooltip.createTooltip(event);

      event.target.closest('.form').querySelector('.task-name').addEventListener('input', () => {
        if (event.target.closest('.form').querySelector('.tooltip')
          && event.target.closest('.form').querySelector('.task-name').value) {
          event.target.closest('.form').querySelector('.tooltip').remove();
        }
      });

      event.target.closest('.form').querySelector('.task-description').addEventListener('input', () => {
        if (event.target.closest('.form').querySelector('.tooltip')
          && event.target.closest('.form').querySelector('.task-description').value) {
          event.target.closest('.form').querySelector('.tooltip').remove();
        }
      });
    }
  }

  editTicket(event) {
    event.preventDefault();
    const { id } = event.target.closest('.liItem').dataset;
    sendRequest('GET', 'editTicket', id, {})
      .then((data) => {
        new ModalForm('Изменить тикет').createForm();
        const taskName = document.querySelector('.task-name');
        taskName.value = data.name;
        const taskDescription = document.querySelector('.task-description');
        taskDescription.value = data.description;

        const buttonOK = document.querySelector('.ok');

        buttonOK.addEventListener('click', () => this.sendEditTask(event, id));

        const buttonCancel = document.querySelector('.cancel');
        buttonCancel.addEventListener('click', () => {
          event.preventDefault();
          const modal = document.querySelector('.modal');
          modal.remove();
        });
      });
  }

  init() {
    this.createListTasks();
    this.getListTask();

    const buttonAdd = document.querySelector('.button-add');
    buttonAdd.addEventListener('click', this.openModal);

    const container = document.querySelector('.container');

    container.addEventListener('click', (event) => {
      if (event.target.classList.contains('meta-name')) {
        this.getDescription(event);
      }

      if (event.target.classList.contains('button-delete')) {
        this.deleteTicket(event);
      }

      if (event.target.classList.contains('button-edit')) {
        this.editTicket(event);
      }
    });
  }
}
