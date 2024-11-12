module.exports = {
  parser: '@typescript-eslint/parser', // Sử dụng parser cho TypeScript
  extends: [
    'plugin:react/recommended', // Sử dụng quy tắc của React
    'plugin:react-native/all', // Sử dụng quy tắc của React Native
    'prettier/@typescript-eslint', // Tắt các quy tắc ESLint đã được xử lý bởi Prettier
    'plugin:prettier/recommended', // Kích hoạt Prettier như một quy tắc ESLint
  ],
  parserOptions: {
    ecmaVersion: 2020, // Sử dụng ES2020
    sourceType: 'module', // Sử dụng module
    ecmaFeatures: {
      jsx: true, // Kích hoạt JSX
    },
  },
  rules: {
    // Thêm hoặc tùy chỉnh các quy tắc tại đây
  },
  settings: {
    react: {
      version: 'detect', // Tự động phát hiện phiên bản React
    },
  },
};
