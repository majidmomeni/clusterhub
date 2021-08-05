

class StateManger {

  #data = {};

  addhub(name) {
    
    const id = StateManger.generateId();
    
    this.#data[id] = {
      id,
      name: name.trim(),
      date: Date.now(),
      posts: {}
    };
  }

  getHubslist() {

    return Object.values(this.#data)
    .sort((a , b) => b.date - a.date)
    .map(hub => {
      ({ id: hub.id, name: hub.name, date: hub.date})
    });
  }


  static generateId() {
  

    const charset = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
    let id = '';
  
    for (let i = 0; i < 10; i++) 
      id += charset[Math.floor(Math.random() * charset.length)]
  
   return id
  }
}


