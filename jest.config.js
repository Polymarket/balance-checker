module.exports = {

    "roots": [
      "<rootDir>"
    ],
    "preset": "ts-jest",
    "setupFilesAfterEnv": ["<rootDir>/setupTests.ts"],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires. you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.jest.json"
        }
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    "snapshotSerializers": ["enzyme-to-json/serializer"]
  }