import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
class BookShelf extends React.Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };
  render() {
    const { bookList, getShelfName } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookList.map((bookObj, i) => {
              return (
                <Book
                  key={i}
                  id={"Book Component: " + bookObj.title}
                  bookObj={bookObj}
                  changeShelf={this.props.changeShelf}
                  getShelfName={getShelfName}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
