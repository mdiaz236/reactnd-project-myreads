import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import * as R from 'ramda'

const Bookshelf = (props) => (
  <div className="bookshelf" >
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
       { R.map((book) => (
         <li key={book.id}>
            <Book data={book}
              onShelfChange={props.onShelfChange}/>
         </li>
       ), R.sortBy(R.prop('title'), props.books))}
      </ol>
    </div>
  </div>
)

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onShelfChange: PropTypes.func,
  title: PropTypes.string
}

export default Bookshelf
