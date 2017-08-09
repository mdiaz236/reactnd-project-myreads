import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Main = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      {props.bookshelves.map((shelf) => (
        <Bookshelf title={shelf.title}
          books={props.books.filter((book) => book.shelf === shelf.shelf)}
          onShelfChange={props.updateBook}
          key={shelf.shelf}/>
      )
      )}
    </div>
    <Link className='open-search' to='/search'>
      Search
    </Link>
  </div>
)

Main.propsTypes = {
  bookshelves: PropTypes.array,
  updateBook: PropTypes.func
}

export default Main
