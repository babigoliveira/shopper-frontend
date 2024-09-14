/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  collectCoverageFrom: [
    "<rootDir>/{src,test}/**/*.{ts,tsx}",
    "!<rootDir>/src/**/*.stories.tsx",
    "!<rootDir>/**/*.e2e.{ts,tsx}",
    "!<rootDir>/**/*.d.ts",
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  randomize: true,
};

export default createJestConfig(config);
