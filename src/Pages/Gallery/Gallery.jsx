import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Static images with metadata
  const images = [
    {
      src: 'https://i.ibb.co.com/TTfGLK6/gallery-img-1-1-1.jpg',
      name: 'John Doe',
      description: 'Sunset view.',
    },
    {
      src: 'https://i.ibb.co.com/DMyb74b/gallery-img-1-2.jpg',
      name: 'Jane Smith',
      description: 'Mountain peak.',
    },
    {
      src: 'https://i.ibb.co.com/5FHCPXm/gallery-img-1-3-1.jpg',
      name: 'Alan Walker',
      description: 'Serene lake.',
    },
    {
      src: 'https://i.ibb.co.com/ZLhTrFY/gallery-img-1-4-1.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    {
      src: 'https://i.ibb.co.com/5FHCPXm/gallery-img-1-3-1.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    {
      src: 'https://i.ibb.co.com/ZLhTrFY/gallery-img-1-4-1.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    {
      src: 'https://i.ibb.co.com/tC4gBsH/gallery-img-1-5.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    {
      src: 'https://i.ibb.co.com/TTfGLK6/gallery-img-1-1-1.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    {
      src: 'https://i.ibb.co.com/qY9cVqX/img-10-120x120.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    {
      src: ' https://i.ibb.co.com/XSVfWzF/img-1-1-120x120.jpg',
      name: 'Lisa Ray',
      description: 'Blooming flowers.',
    },
    // Add more images...
  ];

  // Function to open lightbox on image click
  const openLightbox = index => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div>

      {/* Gallery Header  */}
      <div
        className="relative  z-0 w-full mb-5  min-h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/cTCcpBZ/DALL-E-2024-12-23-19-10-48-A-beautifully-styled-restaurant-themed-banner-background-image-with-a-war.webp')",
        }}
      >
        {/* <div className="absolute inset-0  bg-opacity-50"></div> */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold  mb-4">
            Foods Gallery
          </h1>
          <p className="text-lg md:text-xl mb-6">See The All Photo And veiw</p>
        </div>
      </div>

      {/* Img Gallery */}
      <div className="gallery grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-5 md:mt-10 container mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden  cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.description}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <h3 className="text-white font-semibold">{image.name}</h3>
              <p className="text-white text-sm">{image.description}</p>
            </div>
          </div>
        ))}

        {open && (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={images.map(image => ({ src: image.src }))}
            index={currentIndex}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
