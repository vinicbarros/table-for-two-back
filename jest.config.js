module.exports = {
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["<rootDir>/tests/**/*.(test|spec).js"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/tests/$1",
  },
  restoreMocks: true,
};
