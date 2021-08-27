class StateManager extends EventTarget {

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

}
