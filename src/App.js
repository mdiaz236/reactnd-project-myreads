import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './Main'
import Search from './Search'
import * as R from 'ramda'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => (
      this.setState({ books })
    ))
  }

  updateBook = (book, newShelf) => {
    this.setState({books: R.map(R.ifElse(R.propEq('id', book.id), R.assoc('shelf', newShelf), R.identity),
  this.state.books)})
    BooksAPI.update(book, newShelf).then((result) => (
      BooksAPI.getAll().then((books) => (
        this.setState({ books })
        ))
      ))
  }

  bookshelves = [
      {title: 'Current Reading', shelf: 'currentlyReading'},
      {title: 'Want to Read', shelf: 'wantToRead'},
      {title: 'Read', shelf: 'read'}
  ]

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Main books={this.state.books}
          bookshelves={this.bookshelves}
          updateBook={this.updateBook}
          />
       )}
       />
       <Route path='/search' render={() => (
         <Search books={this.state.books}
         updateBook={this.updateBook}
         />
       )}
       />
      </div>
    )
  }
}

export default BooksApp
