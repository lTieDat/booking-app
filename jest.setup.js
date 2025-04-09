jest.mock('maplibre-gl', () => ({
  Map: function () {
    return {
      on: jest.fn(),
      remove: jest.fn(),
      addControl: jest.fn(),
      getStyle: jest.fn(),
    }
  },
  NavigationControl: function () {},
  Popup: function () {
    return {
      setLngLat: jest.fn().mockReturnThis(),
      setHTML: jest.fn().mockReturnThis(),
      addTo: jest.fn().mockReturnThis(),
    }
  },
}))
