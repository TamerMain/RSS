export const TEST_FIELDS_LABELS = {
  NAME: 'Name',
  EMAIL: 'Email',
  AGE: 'Age',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  GENDER: 'Gender',
  COUNTRY: 'Country',
  UPLOAD: '↪ Upload Image',
  TERMS: "I've read Terms and Conditions",
} as const;

export const TEST_STORE_INPUT = (mock: string) => {
  return {
    name: `${mock}Name`,
    email: `${mock}@mail.com`,
    gender: 'Other' as const,
    password: `${mock}Password`,
    passwordConfirm: `${mock}Password`,
    age: '25',
    country: 'Belarus',
    imageUpload: `${mock}Base64`,
    termsAccepted: true,
  };
};

export const TEST_VALID_INPUT = {
  NAME: 'EXAMPLE',
  EMAIL: 'AAAAAAAAA@gmail.com',
  AGE: '18',
  PASSWORD: 'EXAMPLE',
  CONFIRM_PASSWORD: 'EXAMPLE',
  GENDER: 'Other',
  COUNTRY: 'Belarus',
  UPLOAD: 'JPG',
  TERMS: true,
} as const;

export const TEST_FIELDS_INPUTS = {
  NAME: {
    EMPTY: '',
    SHORT: 'A',
    VALID: 'EXAMPLE',
    LOWERCASE: 'example',
    SYMBOLS: '?EXAMPLE',
  },
  EMAIL: {
    EMPTY: '',
    VALID: 'AAAAAAAAA@gmail.com',
    INVALID: {
      TWO_AT: 'example@@gmail.com',
      EMPTY_LOCAL: '@gmail.com',
      TWO_DOTS: 'example@gmail..com',
    },
  },
  AGE: {
    EMPTY: '',
    NOT_NUMBER: 'EXAMPLE',
    NEGATIVE: '-1',
    LOWER: '14',
    VALID: '18',
    HIGHER: '121',
  },
  PASSWORD: {
    EMPTY: '',
    VALID: 'EXAMPLE',
    SHORT: 'AAAAA',
    STRENGTH: {
      EMPTY: '',
      RED: 'A',
      ORANGE: 'Aa',
      YELLOW: 'Aa1',
      GREEN: 'Aa1!',
    },
  },
  CONFIRM_PASSWORD: {
    EMPTY: '',
    VALID: 'EXAMPLE',
    MISSMATCH: 'AAAAAA',
  },
  GENDER: { EMPTY: false, VALID: 'Other', INVALID: 'Select Gender' },
  COUNTRY: { EMPTY: '', VALID: 'Belarus', INVALID: 'Wakanda' },
  UPLOAD: {
    VALID_JPG: 'JPG',
    VALID_PNG: 'PNG',
    INVALID_SIZE: '6MB',
  },
  TERMS: { CHECK: true, UNCHECK: false },
} as const;

export const TEST_VALIDATION_ERROR = {
  NAME: {
    EMPTY: 'Name must be at least 2 characters',
    SHORT: 'Name must be at least 2 characters',
    VALID: '',
    LOWERCASE: 'First letter must be uppercase',
    SYMBOLS: 'Name can only contain letters',
  },
  EMAIL: {
    EMPTY: 'Invalid email address',
    VALID: '',
    INVALID: {
      TWO_AT: 'Invalid email address',
      EMPTY_LOCAL: 'Invalid email address',
      TWO_DOTS: 'Invalid email address',
    },
  },
  AGE: {
    EMPTY: 'Must be 18 or older',
    NOT_NUMBER: 'Must be a number',
    NEGATIVE: 'Age cannot be negative',
    LOWER: 'Must be 18 or older',
    VALID: '',
    HIGHER: 'Invalid age',
  },
  PASSWORD: {
    EMPTY: 'Password must be at least 6 characters',
    VALID: '',
    SHORT: 'Password must be at least 6 characters',
  },
  CONFIRM_PASSWORD: {
    EMPTY: `Passwords don't match`,
    VALID: '',
    MISSMATCH: `Passwords don't match`,
  },
  GENDER: {
    EMPTY: 'Please select gender',
    VALID: '',
    INVALID: 'Please select gender',
  },
  COUNTRY: {
    EMPTY: 'Please select a valid country',
    VALID: '',
    INVALID: 'Please select a valid country',
  },
  UPLOAD: {
    VALID_JPG: '',
    VALID_PNG: '',
    INVALID_SIZE: 'Max size 5MB',
  },
  TERMS: { CHECK: '', UNCHECK: 'Must accept Terms and Conditions' },
} as const;

export const TEST_VALIDATION_TESTID = {
  NAME: 'invalid_name',
  EMAIL: 'invalid_email',
  AGE: 'invalid_age',
  PASSWORD: 'invalid_password',
  CONFIRM_PASSWORD: 'invalid_passwordConfirm',
  GENDER: 'invalid_gender',
  COUNTRY: 'invalid_country',
  UPLOAD: 'invalid_imageUpload',
  TERMS: 'invalid_termsAccepted',
} as const;
