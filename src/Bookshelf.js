import React from 'react'
import Book from './Book'
import * as R from 'ramda'

const Bookshelf = (props) => (
  <div className="bookshelf" >
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
       {R.sortBy(R.prop('title'), props.books).map((book) => (
         <li key={book.id}>
            <Book data={book} onShelfChange={props.onShelfChange}/>
         </li>
       ))}
      </ol>
    </div>
  </div>
)

export default Bookshelf
