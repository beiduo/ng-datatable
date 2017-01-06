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
            enableGrouping: true,
            groupBy: 'gender',
            groupIn: 'people',
            apiRegister: function (api) {
                this.gridApi = api;
            }
        };

        this.gridConfig.apiRegister = this.gridConfig.apiRegister.bind(this);

        this.gridData = [
            {
                gender: 'male',
                people: [
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
                ]
            },
            {
                gender: 'female',
                people: [
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
                ]
            }
        ];

        this.newData = [
            {
                gender: 'male',
                people: [
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
                    }
                ]
            },
            {
                gender: 'female',
                people: [
                    {
                        name: 'Daisy',
                        country: 'Ireland',
                        age: 14
                    }
                ]
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

const modGrouping = {
    controller: Controller,
    template: view
};

export default modGrouping;