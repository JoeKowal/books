import React, { Component } from "react";
import PropTypes from "prop-types";

class MoveShelf extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveShelf: PropTypes.func.isRequired
  };

  state = {
    currentShelf: this.props.book.shelf,
    updating: false
  };

  moveShelf = event => {
    this.props.moveShelf(this.props.book, event.target.value);
    this.setState({
      currentShelf: event.target.value,
      updating: true
    });
  };

  componentWillReceiveProps() {
    // Get rid of the process indicator
    this.setState({
      updating: false
    });
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.currentShelf} onChange={this.changeShelf}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Already Read</option>
          <option value="none">None</option>
        </select>
        {this.state.updating && <div className="cssload-spin-box" />}
      </div>
    );
  }
}

export default MoveShelf;
