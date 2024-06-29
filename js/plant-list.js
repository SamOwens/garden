import PlantModal from './plant-modal.js';
import PlantCard from './plant-card.js';

export default class PlantList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.fetchData();
    this.renderPlants();
  }

  async fetchData() {
    try {
      const category = this.getAttribute('data-title');
      const response = await fetch('data/plants.json');
      const data = await response.json();
      this.data = data[category];
      window.plantList = this.data;
    } catch (error) {
      console.error('Error fetching plant data:', error);
    }
  }

  renderPlants() {
    this.shadowRoot.innerHTML = '';

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = this.getAttribute('data-title');
    this.shadowRoot.appendChild(sectionTitle);

    this.data.forEach((plant) => {
      const plantCard = document.createElement('plant-card');
      plantCard.setAttribute('data-plant-id', plant.id);
      this.shadowRoot.appendChild(plantCard);
    });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 2rem;
      }
      h2 {
        display: block;
        width: 100%;
        margin: .5rem;
        text-transform: capitalize;
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define('plant-list', PlantList);
