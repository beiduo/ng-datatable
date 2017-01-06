import view from './view.html';

class Controller {
    constructor () {}

    $onInit () {
        this.gridConfig = {
            cols: [
                {
                    field: 'name',
                    displayName: 'Name'
                },
                {
                    field: 'country',
                    displayName: 'Country'
                },
                {
                    field: 'age',
                    displayName: 'Age'
                }
            ],
            apiRegister: function (api) {
                this.gridApi = api;
            }
        };

        this.gridConfig.apiRegister = this.gridConfig.apiRegister.bind(this);

        this.gridData = [
            {
                name: 'Jack',
                country: 'USA',
                age: 18
            },
            {
                name: 'Andrew',
                country: 'UK',
                age: 21
            }
        ];

        this.newData = [
            {
                name: 'Lucy',
                country: 'Germany',
                age: 16
            },
            {
                name: 'Yojima',
                country: 'Japan',
                age: 20
            },
            {
                name: 'Xiao Mei',
                country: 'China',
                age: 19
            }
        ];

        this.apis = [
            'getSelections',
            'getRows',
            'getParams',
            'getView',
            'setData',
            'selectAllRows',
            'unselectAllRows',
            'disableSelection',
            'enableSelection',
            'toggleSelection',
            'disableSelectAll',
            'enableSelectAll'
        ];
    }
    
}

const modSimple = {
    controller: Controller,
    template: view
};

export default modSimple;