export default class PlantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const plantId = parseInt(this.getAttribute('data-plant-id'), 10);
    const plantData = window.plantList.find((plant) => plant.id === plantId);

    if (plantData) {
      this.render(plantData);
      this.addEventListener('click', () => this.openModal(plantData));
    } else {
      console.error(`Plant with ID ${plantId} not found.`);
    }
  }

  openModal(plantData) {
    let modal = document.querySelector('plant-modal');
    if (!modal) {
      modal = document.createElement('plant-modal');
      document.body.appendChild(modal);
    }
    modal.open(plantData);
  }

  render(plantData) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          min-height: 10rem;
          border-radius: 10px;
          background-color: #9effa3;
          width: calc(25% - 1rem);
          margin: .5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .plant-info {
          padding: .5rem;
        }
        .image {
          max-width: 100%;
          height: auto;
        }
        .common-name {
          font-weight: bold;
        }
        .latin-name {
          font-style: italic;
        }
        @media only screen and (max-width: 768px) {
          :host {
            width: 100%;
          }
        }
      </style>
      <img class="image" src="img/small/${plantData.img}" alt="${plantData.commonName}">
      <div class="plant-info">
        <div class="common-name">${plantData.commonName}</div>
        <div class="latin-name">${plantData.latinName}</div>
      </div>
    `;
  }
}

customElements.define('plant-card', PlantCard);
