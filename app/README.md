# Next.js Test

## Specification

### Next.js

- Home page
- Login page
- Websockets

## TypeScript and Eslint

```bash
# Add TypeScript
npm i -D typescript @types/react @types/node

# Add Eslint
npx eslint --init
```

## Prettier

- Add Prettier with `npm i -D eslint-config-prettier eslint-plugin-prettier prettier`.
- Add below to `.eslintrc.js`.

  ```js
  module.exports = {
    extends: ['prettier', 'plugin:prettier/recommended'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  ```

- Add a `.prettierrc` file

  ```json
  {
    "singleQuote": true,
    "printWidth": 120,
    "trailingComma": "es5"
  }
  ```
