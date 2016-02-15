import React from 'react';

// ------------------------------------------------------------
// constants

const DIN_REGULAR = 'DIN Next W01 Regular';
const DIN_LIGHT = 'DIN Next W01 Light';
const STOPA_BLACK = '#444';
const STOPA_RED = '#c0392b';

const TITLE_STYLE = {
  fontFamily: DIN_LIGHT,
  textTransform: 'uppercase',
  fontWeight: 'normal',
  textTransform: 'uppercase',
  letterSpacing: '5px',
  fontSize: '20px',
  color: STOPA_BLACK,
}

const BUTTON_STYLE = {
  fontFamily: DIN_REGULAR,
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: STOPA_RED,
}

// ------------------------------------------------------------
// Components

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  },
});

function Header() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={TITLE_STYLE}>Stepan Parunashvili</h1>
      <a style={BUTTON_STYLE} href="mailto:stepan.p@gmail.com">Contact</a>
    </div>
  );
}

const PostIndex = React.createClass({
  render() {
    return <span>List</span>;
  },
});

const PostShow = React.createClass({
  render() {
    return <span>Post</span>;
  },
});


export {App, PostIndex, PostShow};
