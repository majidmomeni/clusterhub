const state = new StateManager();

function updateHubsMenu() {
  {

    const menu = document.querySelector('main nav ul');
    const hubs = state.getHubsList();
    
    while (menu.firstChild)
      menu.removeChild(menu.firstChild);
  
    for (const hub of hubs) {
      const el = document.createElement('li');
  
      el.innerText = hub.name;
      el.setAttribute("data-id", hub.id);
      el.addEventListener('click', () => state.selectHub(hub.id));
      menu.append(el);
  
    }
    
  }
}

state.addEventListener('hubschange', updateHubsMenu);

state.addEventListener('hubselectionchange', () => {
  
  const selectedHub = state.getHub(state.selectedhub);
  
  for (const li of document.querySelectorAll('main nav li') ) {
    
    if (li.getAttribute('data-id') !== selectedHub.id ) 
      li.classList.remove('selected');
    else
      li.classList.add('selected');   
    

  }

})

state.addEventListener('stateloaded', updateHubsMenu)

window.addEventListener('load', () => state.load());
