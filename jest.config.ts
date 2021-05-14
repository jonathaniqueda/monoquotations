export default {
  "preset": "ts-jest",
  "setupFiles": [
    "dotenv/config",
    "module-alias/register"
  ],
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.{js}",
    "!**/node_modules/**"
  ]
}
