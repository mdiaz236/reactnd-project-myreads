import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${R.pathOr('', ['imageLinks', 'smallThumbnail'], props.data)})` }}></div>
      <div className="book-shelf-changer">
        <select value={R.propOr('none', 'shelf', props.data)}
        onChange={(e) => props.onShelfChange(props.data, e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{R.propOr('', 'title', props.data)}</div>
    <div className="book-authors">
      {R.join(', ',R.propOr([],'authors', props.data))}
    </div>
  </div>
)

Book.propType = {
  data: PropTypes.object,
  onShelfChange: PropTypes.func,
}

export default Book
