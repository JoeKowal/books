import React from "react";
class BookCharger extends React.Component {
  render() {
    console.log(this.props);
    const { bookObj } = this.props;
    console.log(this.props.getShelfName);
    const currentShelf = this.props.getShelfName(bookObj.id);
    return (
      <div className="book-shelf-changer">
        <select
          onChange={event =>
            this.props.changeShelf(bookObj, event.target.value)
          }
          defaultValue={currentShelf}
        >
          <option value="move" disabled>
            Move Book to ...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Already Read</option>
          <option value="none">Remove Book From All</option>
        </select>
      </div>
    );
  }
}

export default BookCharger;
