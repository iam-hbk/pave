module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@react-native|react-native|@react-native/js-polyfills|@rneui/themed)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', 

  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  
};
