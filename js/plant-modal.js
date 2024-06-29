export default class PlantModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', (event) => {
      const closeButton = this.shadowRoot.querySelector('.close-button');
      if (
        !event
          .composedPath()
          .includes(this.shadowRoot.querySelector('.modal-content')) &&
        event.target !== closeButton &&
        !closeButton.contains(event.target)
      ) {
        this.close();
      }
    });
  }

  open(plantData) {
    this.render(plantData);
    this.style.display = 'flex';
    document.body.classList.add('no-scroll');
  }

  close() {
    this.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  render(plantData = {}) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: none;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: #fff;
          border-radius: 10px;
          max-width: 60rem;
          max-height: 80vh;
          padding: 1rem;
          margin: 1rem;
          overflow-y: auto;
          position: relative;
        }
        .close-button {
          position: fixed;
          top: 1rem;
          right: 1.5rem;
          cursor: pointer;
          font-size: 1.5rem;
          width: 2rem;
          height: 2rem;
          background-color: #ececec;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .plant-info-container {
          display: flex;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .image {
          border-radius: 10px;
          overflow: hidden;
          width: 49%;
        }
        .info {
          width: 49%;
          padding: 0 1rem;
        }
        .common-name {
          font-weight: bold;
          font-size: 1.25rem;
        }
        .latin-name {
          font-style: italic;
          margin-bottom: 1rem;
        }
        .subtitle {
          font-weight: bold;
          line-height: 1.5rem;
          width: 100%;
        }
        .description,
        .care-notes,
        .attributes {
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .attributes {
          display: flex;
          flex-wrap: wrap;
        }
        .attributes .subtitle {
          margin-bottom: .25rem;
        }
        .pill {
          border-radius: 5px;
          padding: .25rem .5rem;
          width: fit-content;
          margin: 0 .25rem .25rem 0;
          font-size: .8rem;
          background-color: #ececec;
        }
        .link {
            text-decoration: none;
            font-size: .9rem;
            background-color: #9effa3;
            padding: .25rem .5rem;
            color: #000;
            border-radius: 5px;
        }
        .link:hover {
            background-color: #8ff794;
        }
        @media only screen and (max-width: 768px) {
          .image,
          .info {
            width: 100%;
          }
          .info {
            padding: 0;
            margin-top: 1rem;
          }
          .plant-info-container {
            flex-direction: column;
          }
        }
      </style>
      <div class="modal-content">
        <div class="close-button">&times;</div>
        <div class="plant-info-container">
          <div class="image">
            <img src="img/big/${plantData.img}" alt="${plantData.commonName}">
          </div>
          <div class="info">
            <div class="common-name">${plantData.commonName || ''}</div>
            <div class="latin-name">${plantData.latinName || ''}</div>
            <div class="description">
              <div class="subtitle">Description</div>
              ${plantData.description || ''}
            </div>
            <div class="care-notes">
              <div class="subtitle">Care Notes</div>
              ${plantData.careNotes || ''}
            </div>
            <div class="attributes">
              <div class="subtitle">Attributes</div>
              ${this.renderAttributes(plantData)}
            </div>
            <div class="attributes">
              <div class="subtitle">Links</div>
              <a 
                href="${plantData.shopUrl || ''}" 
                target="_blank"
                class="link"
              >
                Shop
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const closeButton = this.shadowRoot.querySelector('.close-button');
    closeButton.addEventListener('click', () => this.close());
  }

  renderAttributes(plantData) {
    const attributes = [
      { className: 'pill', label: 'Position', value: plantData.position },
      {
        className: 'pill',
        label: 'Flowers',
        value: plantData.floweringPeriod,
      },
      {
        className: 'pill',
        label: 'Growth Rate',
        value: plantData.rateOfGrowth,
      },
      {
        className: 'pill',
        label: 'Height',
        value: plantData.maxHeight,
      },
      {
        className: 'pill',
        label: 'Spread',
        value: plantData.maxSpread,
      },
      {
        className: 'pill',
        label: 'Season',
        value: plantData.season,
      },
      {
        className: 'pill',
        label: 'Flavour',
        value: plantData.flavour,
      },
      {
        className: 'pill',
        label: 'Date Planted',
        value: plantData.datePlanted,
      },
    ];

    return attributes
      .filter((attr) => attr.value)
      .map(
        (attr) =>
          `<div class="${attr.className}">${attr.label}: ${attr.value}</div>`
      )
      .join('');
  }
}

customElements.define('plant-modal', PlantModal);
