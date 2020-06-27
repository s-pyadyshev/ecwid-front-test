import React, { useContext, useEffect } from "react";

const Gallery = () => {
  // const images = useContext(galleryImagesContext);
  // const { images } = props;
  useEffect(() => {
    // console.log(images);
  }, [useContext]);
  return (
    <ul>
      {/* {images &&
        images.map((image, index) => (
          <li key={index}>
            <img src={image.url} width={image.width} height={image.height} />
          </li>
        ))} */}
    </ul>
  );
};

export default Gallery;
