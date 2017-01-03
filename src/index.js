(function (global, angular, undefined) {
    
    var app;

    try {
        app = angular.module('ng-datatable');
    } catch (e) {
        app = angular.module('ng-datatable', []);
    }


    // main component

    function Controller ($templateCache) {
        let self = this;

        // build the data

        this.buildData = (config, receive) => {
            this.receive = receive;
            this.config = config;
            this.data = this.buildGroup(config, receive);
            this.dataFilter();
            this.dataSort();
            this.rows = this.buildPlainRows();
            
        };

        this.buildData = this.buildData.bind(this);

        this.dataFilter = () => {
            let self = this;
            let params = this.config.params;

            if (typeof params === 'object') {
                Object.keys(params).forEach(key => {
                    if (params[key] === null || params[key] === undefined || params[key] === '') {
                        return;
                    } 
                    let col = self.config.cols.find(col => col.field === key);
                    if (col && typeof col.filterOptions === 'object') {
                        self.data.forEach(group => {
                            group.children = group.children.filter(child =>
                                child.entity[key] === col.filterOptions.find(option =>
                                    option.value === params[key]
                                ).name
                            );
                        });
                    }
                });
            }
        };

        this.dataSort = () => {
            let self = this;

            if (typeof this.config.sortOptions !== 'object' || !this.config.sortOptions.sortBy) {
                return;
            }

            // TODO now only compare numbers, needs more comparations
            this.data.forEach(group => {
                let sortOptions = self.config.sortOptions;
                group.children = group.children.sort((a, b) => {
                    if (sortOptions.order === 'desc') {
                        return b.entity[sortOptions.sortBy] - a.entity[sortOptions.sortBy];
                    } else {
                        return a.entity[sortOptions.sortBy] - b.entity[sortOptions.sortBy];
                    }
                });
            });
        };

        this.buildGroup = (config, data) => {
            let result = [];

            if (!config.enableGrouping) {
                result = [
                    {
                        children: data.map(row => {
                            return {
                                entity: row
                            };
                        })
                    }
                ];
            } else {
                result = data.map(el => {
                    let obj = {};

                    if (typeof el[config.groupBy] === 'object') {
                        obj.parent = Object.assign({}, el[config.groupBy]);
                    } else {
                        obj.parent = {
                            name: el[config.groupBy]
                        };
                    }

                    if (Array.isArray(el[config.groupIn])) {
                        obj.children = el[config.groupIn].map(row => {
                            return {
                                entity: row
                            };
                        });
                    }

                    return obj;
                });
            }

            if (typeof config.dataSerialize === 'function') {
                result.forEach(row => {
                    row.children.forEach(child => {
                        child.entity = config.dataSerialize(child.entity);
                    });
                });
            }

            return result;
        };

        this.buildPlainRows = () => {
            let rows = [];
            this.data.forEach(group => {
                group.children.forEach(child => {
                    rows[rows.length] = child;
                });
            });
            return rows;
        };

        this.onSelectAll = () => {
            let isRowSelectable = this.config.isRowSelectable;
            if (this.allSelected) {
                this.rows.forEach(row => {
                    if (typeof isRowSelectable !== 'function' || isRowSelectable(row)) {
                        row.isSelected = true;
                    }
                });

                this.data.forEach(group => {
                    group.isSelected = true;
                });
            } else {
                this.rows.forEach(row => {
                    if (typeof isRowSelectable !== 'function' || isRowSelectable(row)) {
                        row.isSelected = false;
                    }
                });

                this.data.forEach(group => {
                    group.isSelected = false;
                });
            }
        };

        // Sorting

        this.onSort = (option) => {
            let self = this;

            if (typeof option !== 'object') {
                return;
            }

            this.config.sortOptions = Object.assign({}, this.config.sortOptions, option);

            if (typeof this.config.onFetch === 'function') {
                this.config.onFetch(Object.assign(
                    {},
                    this.config.params,
                    this.config.sortOptions
                ));
            } else {
                this.dataSort();
                this.rows = this.buildPlainRows();
            }
        };

        this.onSort = this.onSort.bind(this);

        // onParamsChange

        this.onParamsChange = (field, option) => {
            if (typeof field === 'string') {
                this.config.params[field] = option ? option.value : null;
            }

            if (typeof this.config.onFetch === 'function') {
                this.config.onFetch(Object.assign(
                    {},
                    this.config.params,
                    this.config.sortOptions
                ));
            } else {
                this.buildData(this.config, this.receive);
            }
        };

        this.onParamsChange = this.onParamsChange.bind(this);

        this.getThClass = (col) => {
            let arr = [];
            if (col.alignRight) {
                arr.push('align-right');
            }
            arr.push('col-' + col.field + '-th');
            return arr.join(' ');
        };

        this.$onInit = () => {
            let self = this;

            this.colViews = {};

            // set templates

            this.templateUrls = {
                table: 'ng-datatable-table.html',
                th: 'ng-datatable-th.html',
                thFilter: 'ng-datatable-th-filter.html',
                groupHeader: 'ng-datatable-group-header.html',
                cell: 'ng-datatable-cell.html'
            };

            // tableTemplateUrl

            if (typeof this.config.tableTemplateUrl === 'string') {
                this.templateUrls.table = this.config.tableTemplateUrl;
            }

            if (typeof this.config.tableTemplate === 'string') {
                $templateCache.put('ng-datatable-custom-table', this.config.tableTemplate);

                this.templateUrls.table =  'ng-datatable-custom-table';
            }

            // theadCellTemplateUrl

            if (typeof this.config.theadCellTemplateUrl === 'string') {
                this.templateUrls.th = this.config.theadCellTemplateUrl;
            }

            if (typeof this.config.theadCellTemplate === 'string') {
                $templateCache.put('ng-datatable-custom-th', this.config.theadCellTemplate);

                this.templateUrls.th =  'ng-datatable-custom-th';
            }

            // filterTemplateUrl

            if (typeof this.config.filterTemplateUrl === 'string') {
                this.templateUrls.thFilter = this.config.filterTemplateUrl;
            }

            if (typeof this.config.filterTemplate === 'string') {
                $templateCache.put('ng-datatable-custom-th-filter', this.config.filterTemplate);

                this.templateUrls.thFilter =  'ng-datatable-custom-th-filter';
            }

            // groupHeaderTemplateUrl

            if (typeof this.config.groupHeaderTemplateUrl === 'string') {
                this.templateUrls.groupHeader = this.config.groupHeaderTemplateUrl;
            }

            if (typeof this.config.groupHeaderTemplate === 'string') {
                $templateCache.put('ng-datatable-custom-group-header', this.config.groupHeaderTemplate);

                this.templateUrls.groupHeader =  'ng-datatable-custom-group-header';
            }

            // cellTemplateUrl

            if (typeof this.config.cellTemplateUrl === 'string') {
                this.templateUrls.cell = this.config.cellTemplateUrl;
            }

            if (typeof this.config.cellTemplate === 'string') {
                $templateCache.put('ng-datatable-custom-cell', this.config.cellTemplate);

                this.templateUrls.cell =  'ng-datatable-custom-cell';
            }

            // template of columns

            this.config.cols.forEach(col => {
                if (typeof col.field !== 'string') {
                    console.error('each column must has a field property, otherwise some functions might not work. if this column doesn\'t connect with any field in your data, just use any radom field name.');
                    return;
                }

                if (typeof col.theadCellTemplateUrl === 'string') {
                    self.templateUrls['th_' + col.field] = col.theadCellTemplateUrl;
                }

                if (typeof col.filterTemplateUrl === 'string') {
                    self.templateUrls['filter_' + col.field] = col.filterTemplateUrl;
                }

                if (typeof col.cellTemplateUrl === 'string') {
                    self.templateUrls['cell_' + col.field] = col.cellTemplateUrl;
                }

                if (typeof col.theadCellTemplate === 'string') {
                    $templateCache.put('ng-datatable-th_' + col.field, col.theadCellTemplate);
                    self.templateUrls['th_' + col.field] = 'ng-datatable-th_' + col.field;
                }

                if (typeof col.filterTemplate === 'string') {
                    $templateCache.put('ng-datatable-th-filter_' + col.field, col.filterTemplate);
                    self.templateUrls['thFilter_' + col.field] = 'ng-datatable-th-filter_' + col.field;
                }

                if (typeof col.cellTemplate === 'string') {
                    $templateCache.put('ng-datatable-cell_' + col.field, col.cellTemplate);
                    self.templateUrls['cell_' + col.field] = 'ng-datatable-cell_' + col.field;
                }
            });

            // grouping options

            if (this.config.enableGrouping) {
                this.config = Object.assign({}, {
                    groupBy: 'parent',
                    groupIn: 'chilren'
                }, this.config);
            }

            // sorting options

            this.config.sortOptions = Object.assign({}, this.config.sortDefaults);
            
            // build data
            
            this.buildData(this.config, this.receive);

            // Api
            
            this.api = {
                getRows: () => {
                    return this.rows;
                },
                getSelections: () => {
                    return this.rows.filter(row => row.isSelected);
                },
                selectAllRows: () => {
                    this.allSelected = true;
                    this.onSelectAll();
                },
                unselectAllRows: () => {
                    this.allSelected = false;
                    this.onSelectAll();
                },
                getRowsBy: (condition) => {
                    return this.rows.filter(row =>
                        Object.keys(condition).every(key =>
                            condition[key] === row.entity[key]
                        )
                    );
                },
                getParams: () => {
                    return this.config.params;
                },
                setData: (data) => {
                    this.buildData(this.config, data);
                },
                setParams: (params) => {
                    let self = this;
                    if (typeof params !== 'object') {
                        console.error('setParams method requires an object as its first parameter');
                        return;
                    }
                    this.config.params = Object.assign({}, this.config.params, params);
                    this.onParamsChange();

                    Object.keys(params).forEach(key => {
                        let result;
                        if (params[key] === null || params[key] === undefined || params[key] === '') {
                            result = null;
                        } else {
                            result = self.colViews[key].ngDatatableThFilter.options.find(option => option.value === params[key]);
                        }
                        self.colViews[key].ngDatatableThFilter.setSelected(result);
                    });
                },
                getView: () => {
                    return this;
                },
                disableSelection: () => {
                    this.config.enableSelection = false;
                },
                enableSelection: () => {
                    this.config.enableSelection = true;
                },
                toggleSelection: () => {
                    this.config.enableSelection = !this.config.enableSelection;
                },
                disableGroupHeaderSelection: () => {
                    this.config.enableGroupHeaderSelection = false;
                },
                enableGroupHeaderSelection: () => {
                    this.config.enableGroupHeaderSelection = true;
                },
                disableSelectAll: () => {
                    this.config.enableSelectAll = false;
                },
                enableSelectAll: () => {
                    this.config.enableSelectAll = true;
                }
            };

            // Api bind this

            Object.keys(this.api).forEach(key => {
                this.api[key] = this.api[key].bind(self);
            });

            // Register api

            if (typeof this.config.apiRegister === 'function') {
                this.config.apiRegister(this.api);
            }

            this.root = this;
        };

        
    }

    Controller.$inject = ['$templateCache'];

    app.component('ngDatatable', {
        bindings: {
            config: '<',
            receive: '<',
            appScope: '<'
        },
        template: '<ng-include src="vm.templateUrls[\'table\']"></ng-include>',
        controller: Controller,
        controllerAs: 'vm'
    });
}(window, window.angular));