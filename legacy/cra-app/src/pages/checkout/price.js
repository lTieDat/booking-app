import React from "react";
import "./style.scss"; // Ensure to update the CSS import if needed

const PriceSummary = ({ originalPrice, finalPrice, VAT }) => {
  //get 2 decimal places for prive and vat
  const price = parseFloat(originalPrice) - parseFloat(finalPrice).toFixed(2);
  const vat = (price * VAT).toFixed(2);
  return (
    <div className="checkout__price-summary-container">
      <div className="checkout__price-summary">
        <h3>Your price summary</h3>
        <div className="checkout__price-row">
          <span>Original price</span>
          <span className="checkout__original-price">$ {originalPrice}</span>
        </div>
        <div className="checkout__price-row">
          <span>Late Escape Deal</span>
          <span className="checkout__deal-discount">${finalPrice}</span>
        </div>
        <p className="checkout__discount-notice">
          You’re getting a reduced price because this property is offering a
          discount.
        </p>
        <div className="checkout__total-price">
          <span className="checkout__total-text">Total</span>
          <span className="checkout__final-price">
            <span className="checkout__strikethrough">{originalPrice}</span>{" "}
            {finalPrice}
          </span>
          <span className="checkout__includes-notice">
            Includes taxes and charges
          </span>
        </div>
        <div className="checkout__price-information">
          <h4>Price information</h4>
          <p>Includes ${vat} in taxes and charges</p>
          <div className="checkout__vat">
            <span>{VAT} VAT</span>
            <span>${vat}</span>
          </div>
        </div>
        <button className="checkout__toggle-details">Hide details</button>
      </div>
    </div>
  );
};

export default PriceSummary;
