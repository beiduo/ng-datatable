import view from './view.html';

class Controller {
    constructor () {
        this.apiCallback = null;
        this.currentApi = null;
    }

    onApi (api, option) {
        this.apiCallback = this.gridApi[api](option);
        this.currentApi = api;
    }

    getView () {
        this.currentApi = 'getView';
        this.apiCallback = 'the callback has been printed in console';
        console.log('getView: ', this.gridApi.getView());
    };

    $onInit () {
        console.log(this);
    }
    
}

const apiComponent = {
    bindings: {
        gridApi: '<',
        newData: '<',
        apis: '<',
        newParams: '<',
        searchBy: '<'
    },
    controller: Controller,
    template: view
};

export default apiComponent;