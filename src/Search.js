import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import * as R from 'ramda'


class Search extends Component {
  state = {
    books: []
  }

  getShelf = (book) => {
    let shelf = 'none'
    if (R.contains(R.prop('id', book),
                   R.pluck('id', this.props.books))) {
        shelf = R.prop('shelf', R.find(
                  R.propEq('id', book.id),
                  this.props.books))
      }
    return R.assoc('shelf', shelf, book)
  }

  onInputChange = (q) => {
    if (!q && this.props.books.length > 0) {
      this.setState({ books: [] })
    } else {
      BooksAPI.search(q, 20).then((result) => {
        this.setState({
          books: R.ifElse(
              R.has('error'),
              R.prop('items'),
              R.map(this.getShelf))(result)
        })
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
            placeholder="Search by title or author"
            onChange={(e) => this.onInputChange(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {R.map((book) => (
              <li key={book.id}>
                 <Book data={this.getShelf(book)} onShelfChange={this.props.updateBook}/>
              </li>),
              this.state.books
            )}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.array,
  updateBook: PropTypes.func
}

export default Search
