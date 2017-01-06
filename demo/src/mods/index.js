import modStart from './modStart/index';
import modSimple from './modSimple/index';
import modGrouping from './modGrouping/index';
import modSelection from './modSelection/index';
import modSelectAll from './modSelectAll/index';
import modGroupingSelection from './modGroupingSelection/index';
import modSort from './modSort/index';
import modSortDefault from './modSortDefault/index';

const mods = [
    {
        name: 'modStart',
        state: 'start',
        path: '/start',
        component: modStart,
        displayName: 'Get Started'
    },
    {
        name: 'modSimple',
        state: 'simple',
        path: '/simple',
        component: modSimple,
        displayName: 'Plain Data'
    },
    {
        name: 'modGrouping',
        state: 'grouping',
        path: '/grouping',
        component: modGrouping,
        displayName: 'Grouping Data'
    },
    {
        name: 'modSelection',
        state: 'selection',
        path: '/selection',
        component: modSelection,
        displayName: 'Basic Selection'
    },
    {
        name: 'modSelectAll',
        state: 'selectall',
        path: '/selectall',
        component: modSelectAll,
        displayName: 'Select All'
    },
    {
        name: 'modGroupingSelection',
        state: 'grouping_selection',
        path: '/grouping_selection',
        component: modGroupingSelection,
        displayName: 'Grouping Selection'
    },
    {
        name: 'modSort',
        state: 'sort',
        path: '/sort',
        component: modSort,
        displayName: 'Sorting'
    },
    {
        name: 'modSortDefault',
        state: 'sort_default',
        path: '/sort_default',
        component: modSortDefault,
        displayName: 'Default Sorting'
    }
];


export default mods;