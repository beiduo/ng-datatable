import 'github-markdown-css/github-markdown.css';
import './style.scss';

import app from './module/index';

import * as config from './config/index';
import mods from './mods/index';
import apiComponent from './components/apiComponent/index';
import navComponent from './components/navComponent/index';

app.component('apiComponent', apiComponent);
app.component('navComponent', navComponent);

mods.forEach(mod => {
    app.component(mod.name, mod.component);
});

Object.keys(config).forEach(key => {
    app.config(config[key]);
});

export default app;