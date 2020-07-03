import React, { useEffect, useState, useRef } from "react";
import "./style.scss";

const Image = (props) => {
  const { url, width, height, imageWidth } = props;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
        <img
          src={url}
          width={width}
          height={height}
          alt=".some alt text"
          style={{ width: imageWidth }}
        />
      ) : (
        <div style={{ width: imageWidth }}>...loading</div>
      )}
    </>
  );
};

const Gallery = () => {
  // input file
  const [images, setImages] = useState([]);
  // input text
  const [imageInput, setImageInput] = useState("");

  const inputRef = useRef();
  const imagesPerRow = 5;
  const containerMaxWidth = 860;
  const imageWidth = containerMaxWidth / imagesPerRow - 10 + "px";

  let fileReader;
  let galleryImages = [];

  const handleFileRead = (e) => {
    const content = JSON.parse(fileReader.result).galleryImages;
    galleryImages = content;
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  // загрузить картинку
  const handleSubmit = (event) => {
    event.preventDefault();
    setImages([...images, ...galleryImages]);
  };

  // вставить картинку ссылкой
  const handleInputText = (event) => {
    setImageInput(event.target.value);
  };

  const handleImageAdd = (event) => {
    event.preventDefault();
    setImages([...images, { url: imageInput }]);
  };

  // удалить картинку
  const handleImageDelete = (imageIndex) => {
    setImages([...images.filter((image, index) => index !== imageIndex)]);
  };

  return (
    <div>
      <form>
        <div>
          <input type="text" onChange={handleInputText} />
          <button onClick={handleImageAdd}>Добавить картинку</button>
        </div>
        <div>
          <input
            type="file"
            id="upload"
            ref={inputRef}
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />
          <label htmlFor="upload">Загрузить</label>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>

      <ul className="gallery__list">
        {images.map((image, index) => (
          <li key={index}>
            <Image
              url={image.url}
              width={image.width}
              height={image.height}
              imageWidth={imageWidth}
            />
            <button
              className="gallery__list-item-del"
              onClick={() => handleImageDelete(index)}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
