# Datatable Component For Angular 1.5+

## Description

Documents and demonstration coming soon

## Usage

### Import component

#### Using script tag

**HTML**

```html
<link rel="stylesheet" href="lib/ng-dataview/dist/style/ng-datatable.min.css">
<script src="lib/ng-dataview/dist/ng-datatable.min.js"></script>
```

**JS**

```javascript
angular.module('app', ['ng-datatable']);
```

#### Using require or Import

**Require**

```javascript
var ngDatatable = require('ng-datatable/index');
angular.module('app', [ngDatatable]);
```

**Import**

```javascript
import ngDatatable from 'ng-datatable/index';
angular.module('app', [ngDatatable]);
```

### HTML

```html
<ng-datatable config="$ctrl.gridConfig" receive="$ctrl.gridData"></ng-datatable>
```

### javascript

```javascript
function Controller () {
    this.gridConfig = {
        // the data will automatically be filtered according to config.params
        params: {
            pageNo: 20,
            pageSize: 1,
            status: 1
        },
        // configure the columns
        cols: [
            {
                // if this column doesn't connect to a field in data, define a random one
                field: 'title',
                // text showing in the header
                displayName: 'Title'
            },
            {
                field: 'amount',
                displayName: 'Amount',
                // allow sorting
                enableSort: true,
                // angular text filter
                filter: 'currency:￥',
                // if text align right
                alignRight: true,
            },
            {
                field: 'status',
                displayName: 'Status',
                // enable filter
                enableFilter: true,
                filterOptions: [
                    {
                        name: 'text in the menu',
                        value
                    }
                ]
            },
            {
                field: 'xxx',
                displayName: 'Operation',

                // Template config

                // please see the template documentation
                
                ceilTemplate: '<div class="ceil"><a href="javascript:;">view detail</a></div>',
            }
        ],
        // default sort option, the data will automatically be sorted
        sortDefaults: {
            // field
            sortBy: 'amount',
            // order:asc / desc
            order: 'asc'
        },
        // grouping
        enableGrouping: true,
        // default value: parent
        groupBy: 'partnerName',
        // default value: children
        groupIn: 'detail',
        // selection
        enableSelection: true,
        // allow selecting allow
        // if true, a checkbox will show in the first ceil of table header
        enableSelectAll: true,
        // allow selection in group header
        enableGroupHeaderSelection: true,
        // classname
        customClass: 'asset-table',
        // Serialize data, in case the displayed text is not the value
        // in this case, value of status is a number, use this function to transfer to a text
        dataSerialize: function (data) {
            return _.assign({}, data, {
                status: _.find(_.keys(statusMap), function (key) {
                    return statusMap[key] === data.status;
                })
            });
        },
        // if return false, this row can not be selected (when enableSelection is true)
        isRowSelectable: function (row) {
            return row.entity.status !== '待审批';
        },

        // used in external sorting, filtering and the setParams api
        // if onFetch is not defined, the datatable will use its internal sorting and filtering
        onFetch: function (data) {
            // 'data' is an object mixed config.params and config.sortOptions together
            // config.sortOptions is a copy of config.sortDefaults when the component initialized
            // when fetching completed, use setData api to reset the datatable
        },

        // apiRegister, register api to you own component or anything else
        apiRegister: function (api) {
            self.gridApi = api;
        }
    };


    // Plain data

    this.gridData = {
        rows: [
            {
                asset_no: 'LS54364559',
                amount: 3265340980,
                status: 1
            },
            {
                asset_no: 'LS54364559',
                amount: 6745673,
                status: 2
            }
        ]
    };

    // Grouping data

    this.gridData = {
        rows: [
            {
                // 分组的头部，可以设为单纯的字符串，也可以设为对象
                // 设为对象后，需要使用groupHeaderTemplateUrl或groupHeaderTemplate自定义模板 (比如需要显示额外信息)
                partnerName: '张记钱庄',
                detail: [
                    {
                        asset_no: 'LS54364559',
                        amount: 3265340980,
                        status: 1
                    },
                    {
                        asset_no: 'LS54364559',
                        amount: 6745673,
                        status: 2
                    },
                    {
                        asset_no: 'LS54364559',
                        amount: 3265340980,
                        status: 3
                    },
                    {
                        asset_no: 'LS54364559',
                        amount: 7696887,
                        status: 3
                    },
                    {
                        asset_no: 'LS54364559',
                        amount: 14267,
                        status: 2
                    }
                ]
            }
        ]
    };
}
```

## Templating

### Description

template is the string of template, templateUrl is the identify of template in your angular application

you can get the default templates in ```src/templates/``` directory

### Valid template configuration

- tableTemplateUrl / tableTemplate: ```tabel.html```
- theadCeilTemplateUrl / theadCeilTemplate: ```th.html```
- filterTemplateUrl / filterTemplate: ```th-filter.html```
- groupHeaderTemplateUrl / groupHeaderTemplate: ```group-header.html```
- ceilTemplateUrl / ceilTemplate: ```ceil.html```

### How to configure

tabel and groupHeader can be configured in the ```config``` property.

other templates can be configured in the ```config``` property and each element of ```config.cols``` (to template one column)

## Api

Api documentation coming soon

### Get Current States

- getSelections
- getRows
- getRowsBy { status: 'failed', amount: 3265340980 }
- getParams
- getView

### Set States

- setData($ctrl.dataNew)
- setParams({status: 2})

### Select All From Outside

- selectAllRows
- unselectAllRows

### Change Configuration of Selecting

- disableSelection
- enableSelection
- toggleSelection
- disableGroupHeaderSelection
- enableGroupHeaderSelection
- disableSelectAll
- enableSelectAll