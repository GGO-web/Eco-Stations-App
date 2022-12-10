export const trashBins = [
  {
    id: 4,
    serviceName: 'Super Eco',
    typeOfWastes: ['GLASS', 'PAPER'],
    paymentConditions: ['CARD'],
    deliveryOptions: ['SELF'],
    coordinate: {
      id: 1,
      latitude: 50.448589,
      longitude: 30.5333339,
    },
  },
  {
    id: 5,
    serviceName: 'Recycle Hero',
    typeOfWastes: ['PLASTIC', 'GLASS', 'PAPER'],
    paymentConditions: ['CASH', 'CARD'],
    deliveryOptions: ['SELF'],
    coordinate: {
      id: 2,
      latitude: 50.412123,
      longitude: 30.512486,
    },
  },
  {
    id: 6,
    serviceName: 'Plastic Eliminator',
    typeOfWastes: ['PLASTIC'],
    paymentConditions: ['CASH', 'CARD'],
    deliveryOptions: ['SELF'],
    coordinate: {
      id: 3,
      latitude: 50.482625,
      longitude: 30.4603376,
    },
  },
];

export const defaultTheme = [
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [
      {
        color: '#878787',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f9f5ed',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#aee0f4',
      },
    ],
  },
];

export const mapDefaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

export const AUTH_CREDENTIALS = 'AUTH_CREDENTIALS';
export const USER_LOCATION = 'USER_LOCATION';

export const ROLES = {
  User: 'User',
  Service: 'Service',
  Anonymous: 'Anonymous',
};

export const WASTE_TYPES = [
  'GLASS', 'PAPER', 'PLASTIC', 'METALS', 'ELECTRONIC',
];

export const PAYMENT_CONDITIONS = [
  'CARD', 'CASH', 'FREE',
];

export const DELIVERY_OPTIONS = [
  'SELF', 'VAN', 'TRUCK',
];

export const AUTH_STATUS_DESCRIPTION = {
  LoginSizeError: 'Nickname size is too small 🥶',
  LoginError: 'Error with nickname has caused 😉',
  PasswordError: 'Ohhh, error with password has caused 😅',
  PasswordSizeError: 'Password size is too small 😶',
  EmailError: 'Ohhh, email isn`t valid 🙃',
  EmailEmptyError: 'Email field shouldn`t be empty 🫥',
  RoleError: 'Invalid role provided, you`re hacker? 😱',
};

export type TAuthError = {
  data: {
    message: string[]
  },
  status: number
};
