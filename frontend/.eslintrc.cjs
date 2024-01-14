module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier"
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs", "cypress/**", "vite.config.ts", "cypress.config.ts"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    plugins: ["react-refresh", "@typescript-eslint"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        quotes: [1, "double"],
        "@typescript-eslint/no-unsafe-member-access": "error"
    }
};
