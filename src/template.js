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
    '<td class="select-cell" ng-if="vm.root.config.enableSelection"><div class="cell"><label class="ng-datatable-check"><input type="checkbox" ng-disabled="vm.root.config.isRowSelectable && !vm.root.config.isRowSelectable(vm.row)" ng-model="vm.row.isSelected" ng-change="vm.onRowSelect()"> <span class="text"></span></label></div></td><td ng-repeat="el in vm.root.config.cols" data-ref="{{el.field}}" ng-class="vm.getTdClass(el)"><ng-datatable-cell field="el.field" row="vm.row" col="el" root="vm.root"></ng-datatable-cell></td>');
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
    '<table class="maintable {{vm.config.customClass}}" ng-class="{ \'ng-table-nowrap\': vm.config.whiteSpace === \'nowrap\' }"><thead><tr><th class="select-cell" ng-if="vm.config.enableSelection"><div class="cell" ng-if="vm.config.enableSelectAll"><label class="ng-datatable-check"><input type="checkbox" ng-model="vm.allSelected" ng-change="vm.onSelectAll()"> <span class="text"></span></label></div></th><th ng-repeat="el in vm.config.cols" data-ref="el.field" ng-class="vm.getThClass(el)"><ng-datatable-th col="el" config="vm.config" root="vm"></ng-datatable-th></th></tr></thead><tbody ng-datatable-group="" ng-repeat="el in vm.data" group="el" root="vm"></tbody></table><svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="icon-ng-datatable-sort-desc" viewbox="0 0 32 32"><title>ng-datatable-sort-desc</title><path class="path1" d="M21.587 8.201v22.022h3.048v-22.021h3.809l-5.333-6.423-5.333 6.423h3.81zM13.109 14.222h-6.911c-0.319 0-0.613-0.181-0.763-0.469-0.15-0.292-0.133-0.642 0.044-0.913l6.015-9.285h-5.297c-0.478 0-0.864-0.399-0.864-0.889 0-0.493 0.386-0.889 0.864-0.889h6.911c0.317 0 0.611 0.177 0.761 0.469 0.15 0.288 0.133 0.639-0.042 0.913l-6.017 9.285h5.298c0.476 0 0.864 0.396 0.864 0.889 0 0.49-0.388 0.889-0.864 0.889zM15.554 28.934l-5.182-10.667c-0.147-0.299-0.445-0.49-0.771-0.49s-0.627 0.191-0.773 0.49l-5.182 10.667c-0.212 0.441-0.041 0.972 0.386 1.194 0.125 0.063 0.256 0.094 0.386 0.094 0.315 0 0.621-0.181 0.773-0.493l1.489-3.066h5.841l1.489 3.066c0.213 0.438 0.732 0.618 1.159 0.399s0.599-0.753 0.386-1.194h-0.003zM7.467 24.674l2.058-4.229 2.056 4.229h-4.114z"></path></symbol><symbol id="icon-ng-datatable-sort-asc" viewbox="0 0 32 32"><title>ng-datatable-sort-asc</title><path class="path1" d="M24.635 23.799v-22.022h-3.048v22.021h-3.809l5.333 6.423 5.333-6.423h-3.81zM13.109 30.222h-6.911c-0.319 0-0.613-0.181-0.763-0.469-0.15-0.292-0.133-0.642 0.044-0.913l6.015-9.285h-5.297c-0.478 0-0.864-0.399-0.864-0.889 0-0.493 0.386-0.889 0.864-0.889h6.911c0.317 0 0.611 0.177 0.761 0.469 0.15 0.288 0.133 0.639-0.042 0.913l-6.017 9.285h5.298c0.476 0 0.864 0.396 0.864 0.889 0 0.49-0.388 0.889-0.864 0.889zM15.554 12.934l-5.182-10.667c-0.147-0.299-0.445-0.49-0.771-0.49s-0.627 0.191-0.773 0.49l-5.182 10.667c-0.212 0.441-0.041 0.972 0.386 1.194 0.125 0.063 0.256 0.094 0.386 0.094 0.315 0 0.621-0.181 0.773-0.493l1.489-3.066h5.841l1.489 3.066c0.213 0.438 0.732 0.618 1.159 0.399s0.599-0.753 0.386-1.194h-0.003zM7.467 8.674l2.058-4.229 2.056 4.229h-4.114z"></path></symbol><symbol id="icon-ng-datatable-sort" viewbox="0 0 32 32"><title>ng-datatable-sort</title><path class="path1" d="M8.635 23.799v-22.022h-3.048v22.021h-3.809l5.333 6.423 5.333-6.423h-3.81zM16.905 3.556c-0.491 0-0.889 0.285-0.889 0.673v1.321c0 0.372 0.41 0.673 0.889 0.673h12.436c0.491 0 0.889-0.285 0.889-0.673v-1.321c0-0.372-0.41-0.673-0.889-0.673h-12.436zM16.861 14.222c-0.482 0-0.872 0.285-0.872 0.673v1.321c0 0.372 0.405 0.673 0.872 0.673h8.916c0.482 0 0.872-0.285 0.872-0.673v-1.321c0-0.372-0.405-0.673-0.872-0.673h-8.916zM16.871 24.889c-0.481 0-0.871 0.285-0.871 0.673v1.321c0 0.372 0.382 0.673 0.871 0.673h5.364c0.481 0 0.871-0.285 0.871-0.673v-1.321c0-0.372-0.382-0.673-0.871-0.673h-5.364z"></path></symbol></defs></svg>');
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
    '<div class="thead-cell with-filter"><div class="title">{{vm.col.displayName}}</div><a href="javascript:;" class="sort" ng-if="vm.col.enableSort" ng-click="vm.onSort()"><svg class="ico" ng-if="vm.config.sortOptions.sortBy !== vm.col.field"><use xlink:href="#icon-ng-datatable-sort"></use></svg><svg class="ico" ng-if="vm.config.sortOptions.sortBy === vm.col.field && vm.config.sortOptions.order === \'asc\'"><use xlink:href="#icon-ng-datatable-sort-asc"></use></svg><svg class="ico" ng-if="vm.config.sortOptions.sortBy === vm.col.field && vm.config.sortOptions.order === \'desc\'"><use xlink:href="#icon-ng-datatable-sort-desc"></use></svg><span class="text">排序</span></a> <a href="javascript:;" class="triangle filter-trigger" ng-class="{ \'filter-trigger-open\': vm.status.filterOpen }" ng-click="vm.onFilterTrigger()" ng-if="vm.col.enableFilter">过滤</a><ng-datatable-th-filter ng-class="{show: vm.status.filterOpen}" ng-if="vm.col.enableFilter" options="vm.col.filterOptions" col="vm.col" root="vm.root"></ng-datatable-th-filter></div>');
}]);
})();
