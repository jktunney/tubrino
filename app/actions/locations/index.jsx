export default {
  setCoords(lat, lng) {
    return {
      type: 'SET_COORDINATES',
      lat,
      lng,
    };
  },
};
