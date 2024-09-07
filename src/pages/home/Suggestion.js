import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Suggestions = [
  {
    Country: "United States",
    properties: 125,
    imgSrc:
      "https://www.planetware.com/photos-large/USNY/usa-best-places-new-york.jpg",
  },
  {
    Country: "Canada",
    properties: 100,
    imgSrc:
      "https://assets-news.housing.com/news/wp-content/uploads/2022/10/07122140/Canada-tourist-places-to-visit.jpg",
  },
  {
    Country: "United Kingdom",
    properties: 75,
    imgSrc:
      "https://www.planetware.com/photos-large/ENG/uk-best-places-london.jpg",
  },
  {
    Country: "Australia",
    properties: 50,
    imgSrc:
      "https://www.holidaytourstravel.com/wp-content/uploads/2023/08/Untitled-1960-%C3%97-1080px-23.jpg",
  },
  {
    Country: "France",
    properties: 25,
    imgSrc:
      "https://www.planetware.com/wpimages/2022/08/france-best-places-to-visit-paris-eiffel-tower-river.jpg",
  },
  {
    Country: "Germany",
    properties: 10,
    imgSrc:
      "https://www.jodogoairportassist.com/main/assets/images/blog/main-image/top-10-tourist-places-to-visit-in-germany.webp",
  },
];

function Suggestion() {
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const itemsToShow = 3;

  const handlePrevClick = () => {
    setCurrentSuggestion(
      (prevIndex) =>
        (prevIndex - itemsToShow + Suggestions.length) % Suggestions.length
    );
  };

  const handleNextClick = () => {
    setCurrentSuggestion(
      (prevIndex) => (prevIndex + itemsToShow) % Suggestions.length
    );
  };

  const displayedSuggestions = [
    ...Suggestions.slice(currentSuggestion, currentSuggestion + itemsToShow),
    ...Suggestions.slice(
      0,
      currentSuggestion + itemsToShow > Suggestions.length
        ? (currentSuggestion + itemsToShow) % Suggestions.length
        : 0
    ),
  ];

  return (
    <section className="suggesstion">
      <div className="suggesstion__container">
        <div className="suggesstion__header">
          <h1 className="suggesstion__title">
            Get inspiration for your next trip
          </h1>
        </div>

        <div className="suggesstion__list">
          <button
            className="suggesstion__btn suggesstion__btn--prev"
            onClick={handlePrevClick}
            aria-label="Previous"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {displayedSuggestions.map((Suggestion, index) => (
            <div key={index} className="suggesstion__item">
              <img
                className="suggesstion__img"
                src={Suggestion.imgSrc}
                alt={Suggestion.Country}
              />
              <div className="suggesstion__card">
                <h5 className="suggesstion__country">{Suggestion.Country}</h5>
                <p className="suggesstion__properties">
                  {Suggestion.properties} properties
                </p>
              </div>
            </div>
          ))}

          <button
            className="suggesstion__btn suggesstion__btn--next"
            onClick={handleNextClick}
            aria-label="Next"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Suggestion;
