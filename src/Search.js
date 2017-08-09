import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import * as R from 'ramda'


class Search extends Component {
  state = {
    books: []
  }

  getShelf = (book) => (
    R.defaultTo('none',
            R.prop('shelf', R.defaultTo({}, R.find(R.propEq('id', book.id)) (this.props.books) )))
  )

  onInputChange = (q) => {
    if (q.length < 1 && this.props.books.length > 0) {
      this.setState({ books: [] })
    } else {
      BooksAPI.search(q, 20).then((result) => {
        console.log(result)
        // console.log(result.map(this.getShelf))
        // console.log(this.props.books)
        this.setState({
          books: result.error ? [] : result.map((book) => (R.merge(book, {shelf: this.getShelf(book)}))

          )
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
            {this.state.books.map((book) => (
              <li key={book.id}>
                 <Book data={book} onShelfChange={this.props.updateBook}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
