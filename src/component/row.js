import app from '../module/index';

function Controller () {
    var self = this;

    // this.childViews = {};

    this.onRowSelect = () => {
        if (!this.row.isSelected) {
            this.root.allSelected = false;
            this.group.isSelected = false;
        }

        if (typeof this.root.config.onRowSelectionChange === 'function') {
            this.root.config.onRowSelectionChange(this.row);
        }
    };

    this.getTdClass = (col) => {
        let arr = [];
        if (col.alignRight) {
            arr.push('align-right');
        }
        arr.push('col-' + col.field + '-td');
        return arr.join(' ');
    };
    
    // this.$onInit = function () {
    //     this.ngDatatableGroup.childViews.rows.push(this);
    // };
}

app.directive('ngDatatableRow', function () {
    return {
        restrict: 'EA',
        templateUrl: 'ng-datatable-row.html',
        scope: {
            row: '=',
            group: '=',
            root: '='
        },
        require: {
            ngDatatableGroup: '^'
        },
        controller: Controller,
        controllerAs: 'vm',
        bindToController: true
    };
});