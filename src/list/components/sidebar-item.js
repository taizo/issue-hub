/* global localStorage */
import React from 'react';
import {dispatch} from '../dispatcher/app-dispatcher';
import {remote} from 'electron';
const openEditor = remote.require('../browser/index.js').openEditor;

export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  componentDidMount() {
    if (Number(localStorage.issue_num) === this.props.issue.id) {
      // workaround for "Cannot dispatch in the middle of a dispatch."
      setTimeout(() => {
        this.itemClick();
      }, 0);
    }
  }

  render() {
    const issue = this.props.issue;
    return <li className={this.getClassName.apply(this)}
        key={issue.id}
        onClick={this.itemClick.bind(this)}
        onDoubleClick={this.itemDoubleClick.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
      <div className="media-body">
        <strong>{issue.title}</strong>
        <p>{issue.body}</p>
      </div>
    </li>;
  }

  onMouseOver() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  getClassName() {
    return `list-group-item ${this.state.hover ? ' active' : ''}`;
  }

  itemClick() {
    console.log('itemClick');
    console.log(this.props.issue);
    localStorage.issue_num = this.props.issue.id;
    dispatch({
      type: 'issue/select',
      value: this.props.issue
    });
  }

  itemDoubleClick() {
    console.log('itemDoubleClick');
    openEditor(this.props.issue.id);
  }
}
