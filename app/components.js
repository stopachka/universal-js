import React from 'react';

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

const App = React.createClass({
  render() {
    return (
      <div>{this.props.children}</div>
    );
  },
});

export {App, PostIndex, PostShow};
