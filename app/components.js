import React from 'react';
import _ from 'lodash';

// ------------------------------------------------------------
// DUMMY DATA

const POSTS = {
  0: {
    title: 'Be okay with thinking',
    at: 1455575768455,
    body: 'Bertrand Russell once wrote a piece that I am about to bastardize, but it has been hugely impactful for me since I read it. He said, when working on complex problems, think as hard you can about it, then stop, and go about your day. Be okay with not being able to produce an answer, or do something right away. Let your mind think it over, the answer will come'
  },
  1: {
    title: 'Commitment',
    at: 1455573238455,
    body: 'We\'re taught that keeping our options open is always good. But, the more I mature, the less good I see in that path. It introduces anxiety, and reduces how deep you are willing to go, how much you\'re willing to put on the line, how much pride you take in what you do.'
  },
}

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

const App = React.createClass({
  render() {
    return (
      <div style={APP_STYLE}>
        <Header />
        {this.props.children}
      </div>
    );
  },
});

const PostIndex = React.createClass({
  render() {
    return (
      <div>
        {_.values(POSTS).map(post => <Post key={post.id} post={post} />)}
      </div>
    );
  },
});

const PostShow = React.createClass({
  render() {
    return <span>Post</span>;
  },
});


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
      <div style={CONTENT_STYLE}>
        {post.body}
      </div>
    </div>
  );
}

export {App, PostIndex, PostShow};
