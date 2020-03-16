import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <form onSubmit={this.props.searchUser}>
        <input
          type="text"
          name="userSearch"
          placeholder="Search GitHub Users"
          value={this.props.searchResult}
          onChange={this.props.handleChanges}
        />
        <button>Search</button>
      </form>
    );
  }
}
