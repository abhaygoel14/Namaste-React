import React from "react";

class ProfileClass extends React.Component {
  constructor(props) {
    super(props);
    //create state
    this.state = {
      count: 0,
      userInfo: {
        name: "Dummy User",
        image: "",
        location: "",
      },
    };
    console.log("COnstructor");
  }
  async componentDidMount() {
    //This is where API call is made
    const data = await fetch("https://api.github.com/users/abhaygoel14");
    const json = await data.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
    console.log("ComponentDidMount");
  }
  componentDidUpdate() {
    console.log("ComponentDidUpdate");
  }
  componentWillUnmount() {
    console.log("ComponentWillUnmount");
  }
  render() {
    //NEVER MUTATE THIS.STATE DIRECTLY
    // Here this.setState is used to update where React will automatically track and reconciliation process start and update the state
    console.log("render");
    //const { count } = this.state;
    return (
      <>
        <h1>My name is {this.state.userInfo.name}</h1>
        <img src={this.state.userInfo.avatar_url} alt="User image" />
        <h2>Location : {this.state.userInfo.location}</h2>
        <h2>Count : {count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: count + 1,
            });
          }}
        >
          Increase Count
        </button>
      </>
    );
  }
}

export default ProfileClass;
