import view from './view.html';

class Controller {
    constructor () {}

    $onInit () {
        console.log(this);
    }
    
}

const modStart = {
    controller: Controller,
    template: view
};

export default modStart;