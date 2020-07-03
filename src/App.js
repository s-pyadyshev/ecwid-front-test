import React from "react";
import Gallery from "./components/Gallery";
import DragAndDrop from "./components/DragAndDrop";
import "./App.scss";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.imgSrc) };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className="App">
      <div className="container">
        <Gallery />
        <DragAndDrop data={data} dispatch={dispatch} />
        <ol className="dropped-files">
          {data.fileList.map((file, index) => {
            return (
              <li key={index}>
                <img src={file} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
