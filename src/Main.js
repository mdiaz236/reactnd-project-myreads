import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as R from 'ramda'

const Main = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      { R.map((shelf) => (
        <Bookshelf title={shelf.title}
          books={ R.filter(R.pipe(R.prop('shelf'), R.equals(shelf.shelf)),
                  props.books)}
          onShelfChange={props.updateBook}
          key={shelf.shelf}/>
      ), props.bookshelves
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
