export function getObjectFromId(objectId, objects) {
  const filteredObjects = objects.filter((objectItem) => objectItem.id == objectId);
  return filteredObjects ? filteredObjects[0] : {id: objectId};
}
