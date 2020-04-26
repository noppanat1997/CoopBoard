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
    console.log('>>>', documentResult);
    const documentObject = documentResult.data();
    documentObjectList.push(documentObject);
  });

  return documentObjectList;
};

documentTransformer.getKey = (documentResultList = []) => {
  const documentIdList = [];

  documentResultList.map(documentResult => {
    // console.log(documentResult.data());
    console.log('>>>', documentResult)
    const documentId = documentResult.data();
    documentIdList.push(documentId);
  });

  return documentIdList;
};

export default documentTransformer;

