Usage:

Import library

    import State from "states-manager";

Create state machine

    const status = new State();


Now we can add some `onReady` handlers:

    status.onReady(() => {
        console.log('message1');
    });

    status.onReady(() => {
        console.log('message2');
    });

At any time, we can forcefully change the status to 'ready' or 'wait':

    loaderState.ready();        //change state to 'ready' and call all onReady handlers

Or we can create ticker for autochange ready status

    status.ticker(3);           //set counter=3 and switch status to 'wait'
    status.tic();               //each time the tic() method is called, the counter will decrease
    status.tic();
    status.tic();               //When the counter reaches zero, the status will switch to `ready` and all `onReady` handlers will be called

