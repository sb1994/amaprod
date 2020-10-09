import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUser, updateUser } from "../../actions/userAuthActions";

class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      location: "",
      website: "",
      bio: "",
      cards: [],
      githubusername: "",
      profile_pic: null,
      profileImgURL: "",
      currentProfileImg: "",
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      this.props.getCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    let {
      location,
      website,
      bio,
      cards,
      githubusername,
      profile_pic,
    } = nextProps.auth.user;
    console.log(nextProps.auth.user);

    this.setState({
      location,
      website,
      bio,
      cards,
      githubusername,
      profile_pic,
      currentProfileImg: profile_pic,
    });
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state)
  };
  handleFileChange = (e) => {
    if (e.target.files[0]) {
      const profile_pic = e.target.files[0];
      this.setState({
        profile_pic,
        profileImgURL: URL.createObjectURL(profile_pic),
      });
    }
  };
  handleUpdateSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    // let {
    //   profile_pic,
    //   profileImgURL,
    //   location,
    //   website,
    //   bio,
    //   cards,
    //   githubusername,
    //   currentProfileImg,
    // } = this.state;
    let updateUserData = this.state;
    console.log(updateUserData);
    this.props.updateUser(updateUserData);
  };
  render() {
    let { user } = this.props.auth;
    let {
      location,
      website,
      bio,
      cards,
      githubusername,
      profile_pic,
      profileImgURL,
    } = this.state;
    return (
      <div className="container-fluid">
        <form
          className="col-lg-6 offset-lg-3 col-12 "
          onSubmit={this.handleUpdateSubmit}
        >
          <div className="row justify-content-center">
            <div className="col-6">
              <label htmlFor="">
                Location:{" "}
                <input
                  type="text"
                  placeholder="Edit User Location"
                  className="form-control"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="col-6">
              <label htmlFor="">
                Github username:{" "}
                <input
                  type="text"
                  placeholder="Github Username"
                  className="form-control"
                  name="githubusername"
                  onChange={this.handleChange}
                  value={githubusername}
                />
              </label>
            </div>
            <div className="col-12 text-center">
              <label htmlFor="" className="mx-1">
                Biography:
              </label>
              <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Enter your bio"
                value={bio}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 pt-1">
              <label htmlFor="">Profile Picture:</label>
              <input
                type="file"
                name="profile_pic"
                id="profile_pic"
                onChange={this.handleFileChange}
              />
              <img src={profileImgURL} style={{ height: 200 }} />
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                onClick={this.handleUpdateSubmit}
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { getCurrentUser, updateUser })(
  EditAccount
);
