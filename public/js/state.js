class StateManager extends EventTarget {

  constructor() {

    super();

    this.addEventListener('statechange', () => this.save());

  }

  #selectedHub = null;
  #data = {};

  addHub(name) {

    const id = StateManager.generateId();

    this.#data[id] = {
      id,
      name: name.trim(),
      date: Date.now(),
      posts: {}
    };

    this.dispatchEvent(new Event('hubschange'));
    this.dispatchEvent(new Event('statechange'));

  }

  getHubsList() {

    return Object.values(this.#data)
    .sort((a, b) => b.date - a.date)
    .map(hub => ({ id: hub.id, name: hub.name, date: hub.date }));

  }

  selectHub(id) {

    this.#selectedHub = id;

    this.dispatchEvent(new Event('hubselectionchange'));

  }

  get selectedHub() {

    return this.#selectedHub;

  }

  getHub(id) {

    return this.#data[id];

  }

  static generateId() {

    const charset = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    let id = '';

    for ( let i = 0; i < 10; i++ )
      id += charset[Math.floor(Math.random() * charset.length)];

    return id;

  }

  save() {

    localStorage.setItem('ch-state', JSON.stringify(this.#data));

  }

  load() {

    const stored = localStorage.getItem('ch-state');

    try {

      this.#data = JSON.parse(stored) || {};
      this.dispatchEvent(new Event('stateloaded'));

    }
    catch (error) {

      console.error(error);

    }

  }

}
