export const documentTransform = (documentResultList = []) => {
  const documentObjectList = [];

  documentResultList.map(documentResult => {
    const documentObject = { [documentResult.id]: documentResult.data() }
    documentObjectList.push(documentObject);
  });

  return documentObjectList;
};

export const a = () => 0;
