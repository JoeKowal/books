import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import Book from "./Book";

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
  };

  updateQuery = query => {
    this.props.updateQuery(query.trim());
  };

  componentWillUnmount() {
    // Reset search
    this.props.updateQuery("");
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close Search
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="725" handler="onChange">
              <input
                type="text"
                placeholder="Search by Title or Author"
                onChange={event => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id} className="contact-list-item">
                <Book book={book} moveShelf={this.props.moveShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
