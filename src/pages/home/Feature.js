import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const locations = [
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
  {
    Country: "Spain",
    properties: 5,
    imgSrc:
      "https://www.planetware.com/wpimages/2019/07/spain-best-places-to-visit-madrid.jpg",
  },
  {
    Country: "Italy",
    properties: 2,
    imgSrc:
      "https://travel.usnews.com/dims4/USNEWS/c4b97cc/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2Fsmaller_main_image_original.jpg",
  },
];

function FeaturesSection() {
  const [currentLocation, setCurrentLocation] = useState(0);
  const itemsToShow = 4;

  const handlePrevClick = () => {
    setCurrentLocation((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentLocation((prevIndex) =>
      Math.min(prevIndex + 1, locations.length - itemsToShow)
    );
  };

  const displayedLocations = locations.slice(
    currentLocation,
    currentLocation + itemsToShow
  );

  return (
    <section className="features">
      <div className="features__container">
        <div className="features__header">
          <h1 className="features__title">Explore Popular Destinations</h1>
          <p className="features__description">
            Discover the best destinations around the world with us
          </p>
        </div>

        <div className="features__list">
          {currentLocation > 0 && (
            <button
              className="features__btn features__btn--prev"
              onClick={handlePrevClick}
              aria-label="Previous"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          {displayedLocations.map((location, index) => (
            <div key={index} className="features__item">
              <img
                className="features__img"
                src={location.imgSrc}
                alt={location.Country}
              />
              <div className="features__card">
                <h5 className="features__country">{location.Country}</h5>
                <p className="features__properties">
                  {location.properties} properties
                </p>
              </div>
            </div>
          ))}

          {currentLocation + itemsToShow < locations.length && (
            <button
              className="features__btn features__btn--next"
              onClick={handleNextClick}
              aria-label="Next"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
