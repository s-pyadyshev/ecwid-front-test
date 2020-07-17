import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import Loading from "../Loading";

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
        <div style={{ width: imageWidth }}>
          <Loading />
        </div>
      )}
    </>
  );
};

const Gallery = (props) => {
  const { storeImages, dispatch } = props;
  // input text
  const [imageInput, setImageInput] = useState("");
  const inputRef = useRef();

  let fileReader;
  let galleryImages = [];

  const handleFileRead = () => {
    const content = JSON.parse(fileReader.result).galleryImages;
    galleryImages = content;
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  // загрузить картинку файлом
  const handleSubmitJson = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_JSON_TO_LIST",
      files: galleryImages,
    });

    inputRef.current.value = "";
  };

  // вставить картинку ссылкой
  const handleInputText = (event) => {
    setImageInput(event.target.value);
  };

  const handleImageAdd = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_FILE_TO_LIST",
      files: imageInput,
    });
  };

  // удалить картинку
  const handleImageDelete = (imageIndex) => {
    dispatch({
      type: "REMOVE_IMAGE",
      index: imageIndex,
    });
  };

  return (
    <div className="gallery">
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
          <button onClick={handleSubmitJson}>Загрузить</button>
        </div>
      </form>

      <ul className="gallery__list">
        {storeImages.map((image, index) => (
          <li key={index} className="gallery__item">
            <Image url={image.url} width={image.width} height={image.height} />
            <button
              className="gallery__item-remove"
              onClick={() => handleImageDelete(index)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
