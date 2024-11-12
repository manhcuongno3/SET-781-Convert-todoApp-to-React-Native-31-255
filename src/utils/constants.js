export const API_ROOT = 'http://127.0.0.1:8000';

export const message_error = {
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again.',
};

const TOAST_DURATION = 4000;

export const toastStatus = {
  ERROR: 'error',
  SUCCESS: 'success',
};

export const toastTitle = {
  ERROR: 'error',
};

export const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const StateOfFilterTasks = {
  ALL: 'all',
  DONE: 'done',
  NOT_DONE: 'not_done',
};

export const setToastContent = (
  title,
  descript,
  status,
  duration = TOAST_DURATION,
  isClosable = true,
) => {
  return {
    title: title,
    description: descript,
    status: status,
    duration: duration,
    isClosable: isClosable,
  };
};

export const colors = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#29C6B7',
    secondary: '#7BCBD4',
    accent: '#FFC107',
    error: '#FF5252',
    success: '#4CAF50',
  },
  dark: {
    background: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#29C6B7',
    secondary: '#7BCBD4',
    accent: '#FFC107',
    error: '#FF5252',
    success: '#4CAF50',
  },
};