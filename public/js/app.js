const state = new StateManager();

state.addEventListener('statechange', () => console.log('State has changed', state.getHubsList()) );
