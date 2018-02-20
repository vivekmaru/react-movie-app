import React, { Component } from "react";
import Modal from "boron/DropModal";
import { browserHistory, Link } from "react-router";

class Header extends Component {
  showModal() {
    this.refs.modal.show();
  }

  hideModal(e) {
    e.preventDefault();
    this.refs.modal.hide();
  }

  render() {
    let topright;
    if (this.props.back) {
      topright = (
        <li onClick={browserHistory.goBack} className="back">
          <i className="icon-play" />
          <p className="backtext">back</p>
        </li>
      );
    } else if (this.props.search) {
      topright = (
        <input
          className="searchinput"
          type="text"
          placeholder="Search for Anything..."
          onFocus={e => (e.target.placeholder = "")}
          value={this.props.searchTerm}
          onChange={e => this.props.onSearchTermChange(e.target.value)}
        />
      );
    } else {
      topright = <li className="icon-logo" />;
    }

    return (
      <div className="div">
        <ul className="header">
          {topright}
          <li>
            <Link activeClassName="active" className="icon icon-fire" to="/" />
          </li>
          <li>
            <Link
              activeClassName="active"
              className="icon icon-combined-shape"
              to="/movie"
            />{" "}
          </li>
          <li>
            <Link
              activeClassName="active"
              className="icon icon-search"
              to="/search"
            />
          </li>
          <li className="signup" onClick={this.showModal.bind(this)}>
            Sign Up
          </li>
        </ul>
        <Modal
          ref="modal"
          backdropStyle={{ backgroundColor: "#193240" }}
          modalStyle={{ width: "360px", height: "550px" }}
        >
          <form>
            <h2>Register Now</h2>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <div className="button">
              <button className="button" onClick={this.hideModal.bind(this)}>
                SIGN UP
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Header;
