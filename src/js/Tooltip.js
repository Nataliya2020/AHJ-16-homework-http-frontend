export default class Tooltip {
  constructor(message) {
    this.message = message;
  }

  createTooltip(event) {
    let tooltip = event.target.closest('.form').querySelector('.tooltip');

    if (tooltip) {
      tooltip.remove();
    } else {
      tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerHTML = this.message;

      event.target.closest('.form').querySelector('.ok').appendChild(tooltip);
    }
  }
}
