export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DROP_DEPTH":
      return { ...state, dropDepth: action.dropDepth };
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE_TO_LIST":
      return {
        ...state,
        fileList: [...state.fileList, { url: action.files }],
      };
    case "ADD_JSON_TO_LIST":
      return {
        ...state,
        fileList: [...state.fileList, ...action.files],
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        fileList: [
          ...state.fileList.filter((image, index) => index !== action.index),
        ],
      };
    default:
      return state;
  }
};
