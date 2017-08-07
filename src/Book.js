import React from 'react'
import { defaultTo } from 'ramda'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${props.data.imageLinks.smallThumbnail})` }}></div>
      <div className="book-shelf-changer">
        <select value={props.data.shelf}
        onChange={(e) => props.onShelfChange(props.data, e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.data.title}</div>
    <div className="book-authors">{defaultTo([], props.data.authors).join(', ')}</div>
  </div>
)

export default Book
