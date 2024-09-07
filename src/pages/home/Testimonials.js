import React, { useState } from "react";

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      imgSrc: "assets/img/gallery/1.png",
      name: "John Fang",
      website: "wordfaang.com",
      text: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
    },
    {
      id: 2,
      imgSrc: "assets/img/gallery/2.png",
      name: "Jane Doe",
      website: "janedoe.com",
      text: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
    },
    {
      id: 3,
      imgSrc: "assets/img/gallery/3.png",
      name: "Mark Johnson",
      website: "markjohnson.com",
      text: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handlePrevClick = () => {
    setCurrentTestimonial(
      currentTestimonial === 0
        ? testimonials.length - 1
        : currentTestimonial - 1
    );
  };

  const handleNextClick = () => {
    setCurrentTestimonial(
      currentTestimonial === testimonials.length - 1
        ? 0
        : currentTestimonial + 1
    );
  };

  return (
    <section className="testimonials">
      <div className="container-lg">
        <div className="testimonials__title col-auto">
          <h1 className="fw-bold">Testimonials</h1>
        </div>
        <div className="testimonials__item">
          <button
            className="testimonials__prev"
            onClick={handlePrevClick}
            aria-label="Previous"
          >
            &larr;
          </button>
          <div className="testimonials__container">
            <img
              className="testimonials__container__img"
              src={testimonials[currentTestimonial].imgSrc}
              alt={testimonials[currentTestimonial].name}
            />
            <div className="testimonials__container__card">
              <h5 className="testimonials__container__title">
                {testimonials[currentTestimonial].name}
              </h5>
              <p className="testimonials__container__website">
                {testimonials[currentTestimonial].website}
              </p>
              <p className="testimonials__container__text">
                {testimonials[currentTestimonial].text}
              </p>
            </div>
          </div>
          <button
            className="testimonials__next"
            onClick={handleNextClick}
            aria-label="Next"
          >
            &rarr;
          </button>
        </div>
        <div className="testimonials__indicators">
          {testimonials.map((testimonial, index) => (
            <span
              key={testimonial.id}
              className={`indicator ${
                index === currentTestimonial ? "active" : ""
              }`}
              onClick={() => setCurrentTestimonial(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
