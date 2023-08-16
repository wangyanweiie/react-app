module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 声明但未使用的变量
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    // any
    '@typescript-eslint/no-explicit-any': ['warn']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
