const defaultOptions = {
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
export const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.1,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
};
export const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.1,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
};
export const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.1,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
};
