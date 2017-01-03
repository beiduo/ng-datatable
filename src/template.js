(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-cell.html',
    '<div class="cell">{{vm.applyFilter(vm.row.entity[vm.field], vm.col.filter) || \'-\'}}</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-group-header.html',
    '<div class="cell"><div class="group-caption">{{vm.receive.name}}</div><a href="javascript:;" class="triangle group-trigger" ng-class="{\'group-trigger-open\': vm.ngDatatableGroup.status.groupOpen}">收起</a></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-group.html',
    '<tr class="group-header" ng-if="vm.group.parent"><td class="select-cell" ng-if="vm.root.config.enableSelection"><div class="cell" ng-if="vm.root.config.enableGroupHeaderSelection"><label class="ng-datatable-check"><input type="checkbox" ng-model="vm.group.isSelected" ng-click="vm.onGroupSelect()"> <span class="text"></span></label></div></td><td colspan="{{vm.root.config.cols.length}}"><ng-datatable-group-header ng-click="vm.onGroupOpen()" receive="vm.group.parent" root="vm.root"></ng-datatable-group-header></td></tr><tr ng-datatable-row="" ng-repeat="el in vm.group.children" row="el" group="vm.group" ng-show="vm.status.groupOpen" root="vm.root"></tr>');
}]);
})();

(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-row.html',
    '<td class="select-cell" ng-if="vm.root.config.enableSelection"><div class="cell"><label class="ng-datatable-check"><input type="checkbox" ng-disabled="!vm.root.config.isRowSelectable(vm.row)" ng-model="vm.row.isSelected" ng-change="vm.onRowSelect()"> <span class="text"></span></label></div></td><td ng-repeat="el in vm.root.config.cols" data-ref="{{el.field}}" ng-class="vm.getTdClass(el)"><ng-datatable-cell field="el.field" row="vm.row" col="el" root="vm.root"></ng-datatable-cell></td>');
}]);
})();

(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-table.html',
    '<table class="maintable"><thead><tr><th class="select-cell" ng-if="vm.config.enableSelection"><div class="cell" ng-if="vm.config.enableSelectAll"><label class="ng-datatable-check"><input type="checkbox" ng-model="vm.allSelected" ng-change="vm.onSelectAll()"> <span class="text"></span></label></div></th><th ng-repeat="el in vm.config.cols" data-ref="el.field" ng-class="vm.getThClass(el)"><ng-datatable-th col="el" config="vm.config" root="vm"></ng-datatable-th></th></tr></thead><tbody ng-datatable-group="" ng-repeat="el in vm.data.rows" group="el" root="vm"></tbody></table>');
}]);
})();

(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-th-filter.html',
    '<ul class="filter-options"><li ng-class="{ current: !vm.status.selected }"><a href="javascript:;" ng-click="vm.onfilterSelect(null)">全部</a></li><li ng-repeat="option in vm.options track by $index" ng-class="{ current: option == vm.status.selected }"><a href="javascript:;" ng-click="vm.onfilterSelect(option)">{{option.name}}</a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('ng-datatable');
} catch (e) {
  module = angular.module('ng-datatable', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ng-datatable-th.html',
    '<div class="thead-cell with-filter"><div class="title">{{vm.col.displayName}}</div><a href="javascript:;" class="sort" ng-if="vm.col.enableSort" ng-class="{ \'sort-asc\': vm.config.sortOptions.sortBy === vm.col.field && vm.config.sortOptions.order === \'asc\', \'sort-desc\': vm.config.sortOptions.sortBy === vm.col.field && vm.config.sortOptions.order === \'desc\' }" ng-click="vm.onSort()"><span class="text">排序</span></a> <a href="javascript:;" class="triangle filter-trigger" ng-class="{ \'filter-trigger-open\': vm.status.filterOpen }" ng-click="vm.onFilterTrigger()" ng-if="vm.col.enableFilter">过滤</a><ng-datatable-th-filter ng-class="{show: vm.status.filterOpen}" ng-if="vm.col.enableFilter" options="vm.col.filterOptions" col="vm.col" root="vm.root"></ng-datatable-th-filter></div>');
}]);
})();
