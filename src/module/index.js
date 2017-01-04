let app;

try {
    app = angular.module('ng-datatable');
} catch (e) {
    app = angular.module('ng-datatable', []);
}

export default app;