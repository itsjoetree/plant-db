const config = {
  overrides: [
    {
      extends: [],
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
      }
    }
  ],
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": [2,2, {
      "checkAttributes": true,
      "indentLogicalExpressions": true
    }],
    "no-unused-vars": "off",
    "no-trailing-spaces": [
      "error",
      {
        "ignoreComments": true
      }
    ],
    "indent": [
      "error",
      2
    ],
    "max-len": [
      "warn",
      {
        "code": 200
      }
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};

module.exports = config;