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
            enableSelection: true,
            enableSelectAll: true,
            isRowSelectable: function (row) {
                return row.entity.age < 20;
            },
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
            },
            {
                name: 'Lucy',
                country: 'Germany',
                age: 16
            },
            {
                name: 'Xiao Mei',
                country: 'China',
                age: 19
            }
        ];

        this.newData = [
            {
                name: 'Jimmy',
                country: 'USA',
                age: 18
            },
            {
                name: 'Jean Pierre',
                country: 'France',
                age: 32
            },
            {
                name: 'Andrew',
                country: 'UK',
                age: 21
            },
            {
                name: 'Daisy',
                country: 'Ireland',
                age: 14
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
            'disableGroupHeaderSelection',
            'enableGroupHeaderSelection',
            'disableSelectAll',
            'enableSelectAll'
        ];
    }
    
}

const modSelectAll = {
    controller: Controller,
    template: view
};

export default modSelectAll;