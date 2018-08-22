import React from "react";
import "./App.css";
import Search from "./Search";
import MainBookScreen from "./MainBookScreen";
import * as BooksAPI from "./BooksAPI";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(respond => {
      // update the local version of books to change shelf
      book.shelf = shelf;

      // get array of books
      var bookArray = this.state.books.filter(
        currBook => currBook.id !== book.id
      );

      // add the new book
      bookArray.push(book);

      this.setState({
        books: bookArray
      });
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  getShelfName(bookId) {
    var bookArray = this.state.books.filter(book => book.id === bookId);

    if (bookArray.length === 0) {
      return "none";
    } else if (bookArray.length === 1) {
      return bookArray[0].shelf;
    } else {
      throw new Error("App.js more than one book");
    }
  }

  render() {
    const { books } = this.state;
    return (
      <Router>
        <div>
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                changeShelf={this.changeShelf.bind(this)}
                getShelfName={this.getShelfName.bind(this)}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <MainBookScreen
                books={books}
                changeShelf={this.changeShelf.bind(this)}
                getShelfName={this.getShelfName.bind(this)}
              />
            )}
          />

          <div className="open-search">
            <Link to="/search">Search for New Books</Link>
          </div>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
