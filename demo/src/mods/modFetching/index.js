import view from './view.html';

class Controller {
    constructor (
        $http,
        $timeout
    ) {
        this.$http = $http;
        this.$timeout = $timeout;
    }

    $onInit () {

        this.isFetching = 'Grid data fetching starts in 2 seconds';

        this.$timeout(() => {
            this.isFetching = 'Grid data fetching';
            this.$http({
                method: 'GET',
                url: 'data/simple.json'
            }).then(res => {
                this.gridApi.setData(res.data);
                this.isFetching = null;
            });
        }, 2000);
        

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

Controller.$inject = [
    '$http',
    '$timeout'
];

const modFetching = {
    controller: Controller,
    template: view
};

export default modFetching;