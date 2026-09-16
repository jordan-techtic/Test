module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          target: "ES2022",
          module: "commonjs",
          jsx: "react-jsx",
          esModuleInterop: true,
          strict: true,
          skipLibCheck: true,
          baseUrl: ".",
          paths: { "@/*": ["src/*"] },
          types: ["jest", "@testing-library/jest-dom"],
        },
      },
    ],
  },
};
