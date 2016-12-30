(function (global, angular, undefined) {
    
    let app;

    try {
        app = angular.module('ng-datatable');
    } catch (e) {
        app = angular.module('ng-datatable', []);
    }

    function Controller () {
        let self = this;

        // this.childViews = {
        //     rows: []
        // };

        this.status = {
            groupOpen: true
        };

        this.onGroupOpen = () => {
            this.status.groupOpen = this.status.groupOpen ? false : true;
        };

        this.onGroupOpen = this.onGroupOpen.bind(this);

        this.onGroupSelect = () => {
            let isRowSelectable = this.root.config.isRowSelectable;

            if (!this.group.isSelected) {
                this.root.allSelected = false;

                this.group.children.forEach(child => {
                    if (typeof isRowSelectable !== 'function' || isRowSelectable(child)) {
                        child.isSelected = false;
                    }
                });
            } else {
                this.group.children.forEach(child => {
                    if (typeof isRowSelectable !== 'function' || isRowSelectable(child)) {
                        child.isSelected = true;
                    }
                });
            }
        };

        this.$onInit = () => {
            // this.ngDatatable.childViews.groups.push(this);
            this.root = this.ngDatatable;
        };
    }

    app.directive('ngDatatableGroup', function () {
        return {
            restrict: 'EA',
            templateUrl: 'ng-datatable-group.html',
            scope: {
                group: '='
            },
            require: {
                ngDatatable: '^'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };
    });
}(window, window.angular));