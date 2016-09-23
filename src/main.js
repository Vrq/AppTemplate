const React = require('react');
const ReactDOM = require('react-dom');
const PlayerPreview = require('../components/PlayerPreview');

window.onload = () => {
  ReactDOM.render(<PlayerPreview/>, document.getElementById('main'))
};
