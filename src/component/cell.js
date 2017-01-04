import app from '../module/index';

function Controller (
    $filter
) {
    let self = this;

    this.getTemplateUrl = () => {
        let urls = this.root.templateUrls;

        return urls['cell_' + this.col.field] || urls.cell;
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

app.component('ngDatatableCell', {
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