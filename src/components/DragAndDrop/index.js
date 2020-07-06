import React from "react";
import "./style.scss";

const DragAndDrop = (props) => {
  const { data, dispatch, children } = props;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });

    if (data.dropDepth > 0) return;

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // текущий выбранный или перетаскиваемый файл
    const file = [...e.dataTransfer.files][0];

    let fileReader = new FileReader();
    // Прочитать файл как Data URL - сконвертировать картинку в base64
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const files = fileReader.result;

      dispatch({ type: "ADD_FILE_TO_LIST", files });
    };

    fileReader.onabort = () => {
      alert("Reading aborted");
    };

    fileReader.onerror = () => {
      alert("Reading error");
    };

    e.dataTransfer.clearData();

    dispatch({
      type: "SET_DROP_DEPTH",
      dropDepth: 0,
    });

    dispatch({
      type: "SET_IN_DROP_ZONE",
      inDropZone: false,
    });
  };

  return (
    <div
      className={
        data.inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"
      }
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
