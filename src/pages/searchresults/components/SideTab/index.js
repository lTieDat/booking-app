import React from 'react'
import { Input } from 'antd'
import { StarTwoTone } from '@ant-design/icons'

const SideTab = ({
  propertyName,
  setPropertyName,
  handleKeyPress,
  items,
  selectedItems,
  handleCheckboxChange,
  rangeValue,
  handleRatingChange,
}) => {
  return (
    <div className="search-result__sidetab">
      {/* Property name search */}
      <div className="search-result__sidetab-item">
        <div className="search-result__sidetab-header">
          <h3 className="search-result__sidetab-title">Search by properties name</h3>
          <Input
            className="search-result__input"
            placeholder="Search by hotel name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
      </div>

      {/* Room services */}
      <div className="search-result__sidetab-item">
        <div className="search-result__sidetab-header">
          <h3 className="search-result__sidetab-title">Room services</h3>
        </div>
        <div className="search-result__sidetab-body">
          <div className="search-result__checkbox-group">
            {items.map((item) => (
              <div key={item} className="search-result__checkbox-item">
                <input
                  type="checkbox"
                  id={item}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget per day */}
      <div className="search-result__sidetab-item">
        <div className="search-result__sidetab-header">
          <h3 className="search-result__sidetab-title">Your budget per day</h3>
        </div>
        <div className="search-result__sidetab-body">
          <div className="search-result__checkbox-group">
            {[
              { label: '0-200$', range: [0, 200] },
              { label: '200$-500$', range: [200, 500] },
              { label: '>500$', range: [500, 10000] },
            ].map(({ label, range }) => (
              <div key={label} className="search-result__checkbox-item">
                <input
                  type="checkbox"
                  id={label}
                  checked={rangeValue.some((item) => item[0] === range[0] && item[1] === range[1])}
                  onChange={() => handleCheckboxChange(range)}
                />
                <label htmlFor={label}>{label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating stars */}
      <div className="search-result__sidetab-item">
        <div className="search-result__sidetab-header">
          <h3 className="search-result__sidetab-title">Rating star</h3>
        </div>
        <div className="search-result__sidetab-body">
          <div className="search-result__checkbox-groupStar">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="search-result__checkbox-itemStar" onClick={() => handleRatingChange(rating)}>
                <label>
                  <p>
                    {rating} <StarTwoTone />
                  </p>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideTab
