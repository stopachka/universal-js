import React from 'react';
import _ from 'lodash';

// ------------------------------------------------------------
// DUMMY DATA

import POSTS from '../posts';

// ------------------------------------------------------------
// constants

const DIN_REGULAR = 'DIN Next W01 Regular';
const DIN_LIGHT = 'DIN Next W01 Light';
const STOPA_BLACK = '#444';
const STOPA_RED = '#c0392b';
const MARGIN = 20;

const APP_STYLE = {
  width: '500px',
  margin: `${MARGIN * 2}px auto 0 auto`
}

const HEADER_STYLE = {
  textAlign: 'center',
};

const NAME_STYLE = {
  fontFamily: DIN_LIGHT,
  textTransform: 'uppercase',
  fontWeight: 'normal',
  textTransform: 'uppercase',
  letterSpacing: '5px',
  fontSize: '20px',
  color: STOPA_BLACK,
};

const BUTTON_STYLE = {
  fontFamily: DIN_REGULAR,
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: STOPA_RED,
};

const HEADLINE_STYLE = {
  textAlign: 'center',
};

const TITLE_STYLE = {
  fontFamily: DIN_LIGHT,
  fontSize: '32px',
  fontWeight: 'normal',
};

const SUBTITLE_STYLE = {
  fontFamily: DIN_LIGHT,
  fontSize: '19px',
};

const CONTENT_STYLE = {
  fontFamily: DIN_LIGHT,
  fontSize: '19px',
  lineHeight: '1.5',
};

// ------------------------------------------------------------
// Components

class App extends React.Component {
  render() {
    return (
      <div style={APP_STYLE}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

class PostIndex extends React.Component {
  render() {
    console.warn(this.props);
    return (
      <div>
        {_.values(POSTS).map(post => <Post key={post.id} post={post} />)}
      </div>
    );
  }
}

function Header() {
  return (
    <div style={HEADER_STYLE}>
      <h1 style={NAME_STYLE}>Stepan Parunashvili</h1>
      <a style={BUTTON_STYLE} href="mailto:stepan.p@gmail.com">Contact</a>
    </div>
  );
}

function Post({post}) {
  return (
    <div>
      <div style={HEADLINE_STYLE}>
        <h1 style={TITLE_STYLE}>{post.title}</h1>
      </div>
      <div
        style={CONTENT_STYLE}
        dangerouslySetInnerHTML={{__html: post.content}}>
      </div>
    </div>
  );
}

export {App, PostIndex};
