module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:jsx-a11y/recommended", "prettier"],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "jsx-a11y"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        'react/jsx-curly-brace-presence': [
            'error',
            { props: 'never', children: 'never' },
        ],
        "react/self-closing-comp": ["error", {
            "component": true,
            "html": true
        }]
    }
}
