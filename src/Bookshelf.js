import React from 'react'
import Book from './Book'

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
       {props.books.map((book, i) => (
         <li key={i}>
            <Book data={book}/>
         </li>
       ))}
      </ol>
    </div>
  </div>
)


export default Bookshelf
