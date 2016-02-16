import _ from 'lodash';
import marked from 'marked';
import React, {PropTypes, Component} from 'react';

// ------------------------------------------------------------
// DUMMY DATA

import POSTS from '../posts';

// ------------------------------------------------------------
// style

const DIN_REGULAR = 'DIN Next W01 Regular';
const DIN_LIGHT = 'DIN Next W01 Light';
const STOPA_BLACK = '#444';
const STOPA_RED = '#c0392b';
const MARGIN = 20;

const APP_STYLE = {
  width: '500px',
  margin: `${MARGIN * 2}px auto ${MARGIN * 2}px auto`
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

const POST_STYLE = {
  paddingBottom: `${MARGIN}px`,
};

const PAGINATION_BAR_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
};

const BTN_RESET = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
}

const PAGINATION_BTN_STYLE = {
  ...BTN_RESET,
  color: STOPA_RED,
  fontFamily: DIN_LIGHT,
  fontSize: '15px',
};

// ------------------------------------------------------------
// Components

class App extends Component {
  render() {
    return (
      <div style={APP_STYLE}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

const PER_PAGE = 10;

class PostIndex extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <div>
          {paginate(POSTS, this._page()).map(
            post => <Post key={post.id} post={post} />
          )}
        </div>
        <div style={PAGINATION_BAR_STYLE}>
          <button
            role="button"
            style={PAGINATION_BTN_STYLE}
            onClick={this._handleNewer}>
              &larr; Newer
          </button>
          <button
            role="button"
            style={PAGINATION_BTN_STYLE}
            onClick={this._handleOlder}>
              Older &rarr;
          </button>
        </div>
      </div>
    );
  }

  _handleNewer = () => {
    this.context.router.push(`/p/${this._page() - 1}`);
  }

  _handleOlder = () => {
    const page = Math.min(this._page() + 1);
    this.context.router.push(`/p/${page}`);
  }

  _page = () => {
    const n = +this.props.params.page;
    return Math.max(
      Number.isSafeInteger(n) ? n : 0,
      0
    );
  }
}

function paginate(ps, page) {
  const start = page * PER_PAGE;
  return _.chain(ps)
    .values()
    .sortBy(p => -p.createdAt)
    .slice(start, start + PER_PAGE)
    .value()
  ;
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
    <div style={POST_STYLE}>
      <div style={HEADLINE_STYLE}>
        <h1 style={TITLE_STYLE}>{post.title}</h1>
      </div>
      <div
        style={CONTENT_STYLE}
        dangerouslySetInnerHTML={{__html: marked(post.content)}}>
      </div>
    </div>
  );
}

export {App, PostIndex};
