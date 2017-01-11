import mods from '../mods/index';

export const stateProvider = ['$stateProvider', $stateProvider => {
    mods.forEach(mod => {
        let state = {
            url: mod.path,
            component: mod.name
        };

        if (typeof mod.resolve === 'object') {
            state.resolve = mod.resolve;
        }

        if (typeof mod.redirectTo === 'string') {
            state.redirectTo = mod.redirectTo;
        }

        $stateProvider.state(mod.state, state);
    })
}];

export const urlRouterProvider = ['$urlRouterProvider', $urlRouterProvider => {
    $urlRouterProvider.otherwise('/start');
}];

export const markedProvider = ['markedProvider', markedProvider => {
    let opt = {
        gfm: true
    };

    // if (hljs) {
    //     opt = {
    //         gfm: true,
    //         tables: true,
    //         highlight: function (code, lang) {
    //             if (lang) {
    //                 return hljs.highlight(lang, code, true).value;
    //             } else {
    //                 return hljs.highlightAuto(code).value;
    //             }
    //         }
    //     };
    // }
    
    markedProvider.setOptions(opt);
}];