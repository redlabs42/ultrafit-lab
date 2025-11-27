module.exports = {
  "src/frontend/**/*.{ts,tsx}": ["pnpm --filter frontend lint"],
  // "src/backend/**/*.{ts,tsx}": ["pnpm --filter backend lint"], // Uncomment when backend lint is ready
};
