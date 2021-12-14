import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainLayout from './layouts/MainLayout';

function render() {
  ReactDOM.render(<MainLayout />, document.getElementById('root'));
}

render();