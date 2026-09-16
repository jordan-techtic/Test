/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests"],
  setupFiles: ["<rootDir>/tests/polyfills.ts"],
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
          jsx: "react-jsx",
          esModuleInterop: true,
          strict: true,
          module: "commonjs",
          moduleResolution: "node",
          skipLibCheck: true,
          types: ["jest", "node", "@testing-library/jest-dom"],
          baseUrl: ".",
          paths: {
            "@/*": ["./src/*"],
          },
        },
      },
    ],
  },
};
