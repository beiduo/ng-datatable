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
                    displayName: 'Age',
                    enableSort: true
                },
                {
                    field: 'score',
                    displayName: 'Score',
                    enableSort: true
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
                age: 18,
                score: 9
            },
            {
                name: 'Andrew',
                country: 'UK',
                age: 21,
                score: 3
            },
            {
                name: 'Jean Pierre',
                country: 'France',
                age: 32,
                score: 8
            },
            {
                name: 'Daisy',
                country: 'Ireland',
                age: 14,
                score: 6
            }
        ];

        this.newData = [
            {
                name: 'Lucy',
                country: 'Germany',
                age: 16,
                score: 6
            },
            {
                name: 'Yojima',
                country: 'Japan',
                age: 20,
                score: 10
            },
            {
                name: 'Xiao Mei',
                country: 'China',
                age: 19,
                score: 7
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

const modSort = {
    controller: Controller,
    template: view
};

export default modSort;