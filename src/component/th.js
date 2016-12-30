(function (global, angular, undefined) {
    
    let app;

    try {
        app = angular.module('ng-datatable');
    } catch (e) {
        app = angular.module('ng-datatable', []);
    }

    function Controller () {
        let self = this;

        this.status = {};

        // get template url

        this.getTemplateUrl = () => {
            let urls = this.root.templateUrls;

            return urls['th_' + this.col.field] || urls.th;
        };
        
        this.onFilterTrigger = () => {
            this.status.filterOpen = this.status.filterOpen ? false : true;
        };

        this.onFilterTrigger = this.onFilterTrigger.bind(this);

        this.onSort = () => {
            let obj = {};

            if (this.config.sortOptions.sortBy !== this.col.field) {
                obj = {
                    sortBy: this.col.field,
                    order: 'asc'
                };
            } else if (this.config.sortOptions.order === 'asc') {
                obj = {
                    sortBy: this.col.field,
                    order: 'desc'
                };
            } else {
                obj = this.config.sortDefaults;
            }

            this.root.onSort(obj);
        };

        this.$onInit = () => {
            this.root = this.ngDatatable;
            this.root.colViews[this.col.field] = this;
        };
        
    }

    app.component('ngDatatableTh', {
        bindings: {
            col: '<',
            config: '<'
        },
        require: {
            ngDatatable: '^'
        },
        template: '<ng-include src="vm.getTemplateUrl()"></ng-include>',
        controller: Controller,
        controllerAs: 'vm'
    });
}(window, window.angular));