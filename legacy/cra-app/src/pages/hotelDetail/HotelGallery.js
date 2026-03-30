import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const HotelGallery = ({ images }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const totalImages = images.length;

  const displayedImage = images[currentImageIndex]; // Display the current image based on the index

  const handleDotClick = (index) => {
    setCurrentImageIndex(index); // Move to the corresponding image based on the dot clicked
  };

  return (
    <section className="hotel-detail__gallery">
      <div className="hotel-detail__container">
        <div className="hotel-detail__gallery-main">
          <img
            src={images[0]}
            alt="Hotel Main"
            className="hotel-detail__gallery-image-large"
          />
        </div>
        <div className="hotel-detail__gallery-support">
          <img
            src={images[2]}
            alt="Hotel Third"
            className="hotel-detail__gallery-image-small"
          />
          <div className="hotel-detail__gallery-image-more" onClick={openModal}>
            +{totalImages - 2} more
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Gallery"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="modal__close">
          X
        </button>
        <section className="hotel-detail__images-slider">
          <div className="hotel-detail__images-slide">
            <img
              src={displayedImage}
              alt={`Hotel Image ${currentImageIndex}`}
              className="hotel-detail__images-image"
            />
          </div>

          <div className="dot-navigation">
            {Array.from({ length: totalImages }).map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </section>
      </Modal>
    </section>
  );
};

export default HotelGallery;
