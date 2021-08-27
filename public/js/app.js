const state = new StateManager();

state.addEventListener('hubschange', () => {

  const menu = document.querySelector('main nav ul');
  const hubs = state.getHubsList();

  while ( menu.firstChild )
    menu.removeChild(menu.firstChild);

  for ( const hub of hubs ) {

    const el = document.createElement('li');

    el.innerText = hub.name;
    el.setAttribute('data-id', hub.id);
    el.addEventListener('click', () => state.selectHub(hub.id));

    menu.append(el);

  }

});

state.addEventListener('hubselectionchange', () => {

  const selectedHub = state.getHub(state.selectedHub);

  for ( const li of document.querySelectorAll('main ul li') ) {

    if ( li.getAttribute('data-id') !== selectedHub.id )
      li.classList.remove('selected');
    else
      li.classList.add('selected');

  }

});
