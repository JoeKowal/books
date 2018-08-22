import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";
import Search from "./Search";
import "./App.css";

class BooksApp extends React.Component {
    MAX_RESULTS = 30;

    state = {
        books: [],
        searchBooks: []
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    getShelfBooks(shelfName){
        return this.state.books.filter((b) => b.shelf === shelfName)
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            //local copy of book
            book.shelf = newShelf;

            //filter book and append
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }));
        });
    };

export default BooksApp;
