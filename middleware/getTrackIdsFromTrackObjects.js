module.exports = function getTrackIdsFromTrackObjects(trackObjects) {
  let trackIds = [];
  for (let obj of trackObjects) {
    trackIds.push(obj.id);
  }
  return trackIds;
}