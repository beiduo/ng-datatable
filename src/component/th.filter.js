(function (global, angular, undefined) {
    
    let app;

    try {
        app = angular.module('ng-datatable');
    } catch (e) {
        app = angular.module('ng-datatable', []);
    }

    function Controller (
        $scope,
        $element,
        $document,
        $timeout
    ) {
        let self = this;

        this.status = {};

        this.getTemplateUrl = () => {
            let urls = this.root.templateUrls;

            return urls['thFilter_' + this.col.field] || urls.thFilter;
        };

        function handleClick (e) {
            let elem = $element[0];
            let trigger = elem.parentNode.querySelector('a.filter-trigger');
            let target = e.target;
            let isSelf = false;

            if (!e || !target || !elem) {
                return;
            }

            for (; target; target = target.parentNode) {
                if (target === elem || target === trigger) {
                    isSelf = true;
                    break;
                }
            }

            if (!isSelf) {
                self.onClose();
            }
        }

        function hasTouch () {
            return 'ontouchstart' in window || navigator.maxTouchPoints;
        }

        this.onClose = () => {
            let self = this;
            $scope.$apply(() => {
                self.ngDatatableTh.status.filterOpen = false;
            });
        };

        this.onfilterSelect = (option) => {
            
            this.status.selected = option;
            this.ngDatatableTh.status.filterOpen = false;

            this.root.onParamsChange(this.col.field, option);
        };

        this.setSelected = (selected) => {
            this.status.selected = selected;
        };

        this.setSelected = this.setSelected.bind(this);

        this.$onInit = () => {
            let self = this;

            this.status.selected = null;

            let params = this.root.config.params;

            Object.keys(params).forEach(key => {
                if (key === self.col.field) {
                    self.status.selected = self.options.find(option => option.value === params[key]);
                }
            });

            this.ngDatatableTh.ngDatatableThFilter = this;
        };

        this.$postLink = () => {
            $timeout(() => {
                $document.on('click', handleClick);

                if (hasTouch) {
                    $document.on('touchstart', handleClick);
                }
            }, 0);
        };

        this.$destroy = () => {
            $document.off('click', handleClick);

            if (hasTouch) {
                $document.off('touchstart', handleClick);
            }
        };
    }

    Controller.$inject = [
        '$scope',
        '$element',
        '$document',
        '$timeout'
    ];

    app.component('ngDatatableThFilter', {
        bindings: {
            options: '<',
            col: '<',
            root: '<'
        },
        require: {
            ngDatatableTh: '^'
        },
        template: '<ng-include src="vm.getTemplateUrl()"></ng-include>',
        controller: Controller,
        controllerAs: 'vm'
    });
}(window, window.angular));