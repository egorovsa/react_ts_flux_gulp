/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Todo} from './components/todo';

ReactDOM.render(
    React.createElement(Todo),
    document.getElementById('app')
);