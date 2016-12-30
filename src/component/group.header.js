(function (global, angular, undefined) {
    
    let app;

    try {
        app = angular.module('ng-datatable');
    } catch (e) {
        app = angular.module('ng-datatable', []);
    }

    function Controller () {
        let self = this;
        // this.$onInit = () => {
        //     this.ngDatatableGroup.childViews.groupHeader = this;
        // };
    }

    app.component('ngDatatableGroupHeader', {
        bindings: {
            receive: '<',
            root: '<'
        },
        require: {
            ngDatatableGroup: '^'
        },
        template: '<ng-include src="vm.root.templateUrls[\'groupHeader\']"></ng-include>',
        controller: Controller,
        controllerAs: 'vm'
    });
}(window, window.angular));