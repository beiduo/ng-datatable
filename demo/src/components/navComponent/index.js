import view from './view.html';

import mods from '../../mods/index';

class Controller {
    constructor (
        $scope,
        $state,
        $stateParams,
        $element,
        $document,
        $timeout
    ) {
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$element = $element;
        this.$document = $document;
        this.$timeout = $timeout;
    }

    onMenus () {
        this.showMenu = true;
    }

    onClickMenu () {
        this.showMenu = false;
    }

    $onInit () {
        console.log(this);

        this.mods = mods;
    }

    $postLink () {
        let self = this;

        function hideMenu (e) {
            let trigger = self.$element.find('svg')[0];
            let elem = self.$element.find('ul')[0];
            let isSelf = false;
            let target;

            if (!e || !e.target) {
                return;
            }
            
            target = e.target;

            for (; target; target = target.parentNode) {
                if (target === elem || target === trigger) {
                    isSelf = true;
                    break;
                }
            }
            
            if (!isSelf) {
                self.$scope.$apply(() => {
                    self.showMenu = false;
                });
            }
        }

        function hasTouch () {
            return 'ontouchstart' in window || navigator.maxTouchPoints;
        }

        this.$timeout(() => {
            self.$document.on('click', hideMenu);

            if (hasTouch) {
                self.$document.on('touchstart', hideMenu);
            }
        });
    }

    $destroy () {
        this.$document.off('click', hideMenu);

        if (hasTouch) {
            this.$document.off('touchstart', hideMenu);
        }
    }
    
}

Controller.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$element',
    '$document',
    '$timeout'
];

const navComponent = {
    controller: Controller,
    template: view
};

export default navComponent;