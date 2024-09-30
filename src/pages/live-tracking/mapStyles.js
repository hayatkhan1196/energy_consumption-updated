// export default [

//     {
//       "elementType": "geometry",
//       // "stylers": [
//       //   {
//       //     "color": "#f5f5f5"
//       //   }
//       // ]
//     },
//     {
//       "elementType": "labels.icon",
//       "stylers": [
//         {
//           "visibility": "off"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#616161"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.text.stroke",
//       "stylers": [
//         {
//           "color": "#f5f5f5"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative.land_parcel",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#bdbdbd"
//         }
//       ]
//     },
//     {
//       "featureType": "poi",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#eeeeee"
//         }
//       ]
//     },
//     {
//       "featureType": "poi",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#757575"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#e5e5e5"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#9e9e9e"
//         }
//       ]
//     },
//     {
//       "featureType": "road",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#ffffff"
//         }
//       ]
//     },
//     {
//       "featureType": "road.arterial",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#757575"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#dadada"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#616161"
//         }
//       ]
//     },
//     {
//       "featureType": "road.local",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#9e9e9e"
//         }
//       ]
//     },
//     {
//       "featureType": "transit.line",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#e5e5e5"
//         }
//       ]
//     },
//     {
//       "featureType": "transit.station",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#eeeeee"
//         }
//       ]
//     },
//     {
//       "featureType": "water",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#c9c9c9"
//         }
//       ]
//     },
//     {
//       "featureType": "water",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#9e9e9e"
//         }
//       ]
//     }
//   ]

export default [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 13,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffff",
      },
      {
        lightness: 14,
      },
      {
        weight: 1.4,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#000435",
      },
    ],
  },
  {
    featureType: "poi",
    // elementType: "geometry",
    stylers: [
      {
        color: "#0c4152",
      },
      {
        lightness: 5,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#0b434f",
      },
      {
        lightness: 25,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#0b3d51",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        color: "#146474",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#021019",
      },
    ],
  },
];
