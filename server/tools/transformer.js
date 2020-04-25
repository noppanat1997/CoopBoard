const documentTransformer = {};

documentTransformer.basicTransform = (documentResultList = []) => {
  const documentObjectList = [];

  documentResultList.map(documentResult => {
    // console.log(documentResult.data());
    const documentObject = { [documentResult.id]: documentResult.data() }
    documentObjectList.push(documentObject);
  });

  return documentObjectList;
};

documentTransformer.keyRemove = (documentResultList = []) => {
  const documentObjectList = [];

  documentResultList.map(documentResult => {
    // console.log(documentResult.data());
    const documentObject = documentResult.data();
    documentObjectList.push(documentObject);
  });

  return documentObjectList;
};

export default documentTransformer;

