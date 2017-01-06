import * as angular from 'angular';
import uiRouter from "angular-ui-router";
import angularMarked from 'angular-marked';
import ngDatatable from '../../../index';

let app;

console.log(angularMarked);

try {
    app = angular.module('demo');
} catch (e) {
    app = angular.module('demo', [uiRouter, angularMarked, ngDatatable]);
}

console.log(app);

export default app;