(function (global, angular, undefined) {
    
    let app;

    try {
        app = angular.module('ng-datatable');
    } catch (e) {
        app = angular.module('ng-datatable', []);
    }

    function Controller (
        $filter
    ) {
        let self = this;

        this.getTemplateUrl = () => {
            let urls = this.root.templateUrls;

            return urls['ceil_' + this.col.field] || urls.ceil;
        };

        this.applyFilter = (model, filter) => {
            if(filter){
                let pieces = filter.split(':');
                let filterName = pieces[0];
                let params = [model];

                if(pieces.length > 1){
                    params = params.concat(pieces.slice(1));
                }
                return $filter(filterName).apply(this,params);
            }else{
                return model;
            }
        };

        // this.$onInit = function () {
        //     this.ngDatatableRow.childViews[this.field] = this;
        // };

        
    }

    Controller.$inject = [
        '$filter'
    ];

    app.component('ngDatatableCeil', {
        bindings: {
            row: '<',
            field: '<',
            col: '<',
            root: '<'
        },
        require: {
            ngDatatableRow: '^'
        },
        template: '<ng-include src="vm.getTemplateUrl()"></ng-include>',
        controller: Controller,
        controllerAs: 'vm'
    });
}(window, window.angular));