import React from "react";
import "./App.css";
import githubLogo from "./images/githublogo.png";
import lambdaLogo from "./images/lambdalogo.png";
import CardGrid from "./components/CardGrid";
import Search from "./components/Search";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedUser: "",
      user: {},
      following: []
    };
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/Kenneth-Brandon`)
      .then(response => response.json())
      .then(response => this.setState({ user: response }))
      .catch(error => console.log("Error Occurred:", error));
    fetch(`https://api.github.com/users/Kenneth-Brandon/following`)
      .then(response => response.json())
      .then(response =>
        response.map(user =>
          fetch(`https://api.github.com/users/${user.login}`)
            .then(response => response.json())
            .then(response =>
              this.setState({ following: [...this.state.following, response] })
            )
        )
      )
      .catch(error => console.log("Following Error: ", error));
  }

  searchNewUser = event => {
    this.state.following = [];
    event.preventDefault();
    fetch(`https://api.github.com/users/${this.state.searchedUser}`)
      .then(response => response.json())
      .then(response => this.setState({ user: response }))
      .catch(error => console.log("Error Occurred:", error));
  };

  handleChanges = event => {
    this.setState({
      searchedUser: event.target.value
    });
  };

  render() {
    return (
      <div className="App container">
        <div className="header">
          <img src={githubLogo} alt="User Pic" />
          <img src={lambdaLogo} alt="Lambda School Logo" />
        </div>
        <Search
          handleChanges={this.handleChanges}
          searchUser={this.searchNewUser}
          searchResult={this.searchedUser}
        />
        <CardGrid user={this.state.user} following={this.state.following} />
      </div>
    );
  }
}

export default App;
