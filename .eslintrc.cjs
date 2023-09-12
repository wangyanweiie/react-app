const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    env: {
        browser: true,
        es2021: true,
        node: true,
    },

    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],

    /**
     * 指定用于解析 JavaScript 代码的解析器
     *   - esprima：默认的解析器，用于解析 ECMAScript 5 到 ECMAScript 2021 之间的 JavaScript 代码
     *   - @babel/eslint-parser：由Babel项目提供的解析器，用于解析ES6+代码
     *   - @typescript-eslint/parser：由 TypeScript 团队提供的解析器，用于解析 TypeScript 代码
     *   - eslint-plugin-html：用于解析HTML文件中的JavaScript代码
     *   - vue-eslint-parser：用于解析Vue单文件组件中的JavaScript代码
     */
    parser: '@typescript-eslint/parser',

    /**
     * 给配置的解析器添加可选配置项
     * parser：解析器
     * ecmaVersion：指定要解析的 ECMAScript 版本
     * sourceType：指定要解析的模块系统类型。可选值为 "script"（默认）或 "module"
     */
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    /**
     * extends 继承的规则，来源可以是以下几种：
     * 1.ESLint 内置规则集 的一个子集
     *   - 'eslint:recommended'
     * 2.共享配置包
     *   - 'eslint-config-prettier'：关闭 eslint 与 prettier 冲突的规则
     * 3.插件导出的命名配置（plugin:插件包名/配置名）
     *   - 'plugin:@typescript-eslint/recommended'：ts 推荐的规则
     *   - 'plugin:react/recommended'react 推荐的规则
     */
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],

    /**
     * 插件
     */
    plugins: ['@typescript-eslint', 'react'],

    /**
     * rules 用于设置 ESLint 的规则和规则的错误等级
     * 配置项是一个对象，它的每个属性表示一个规则，属性值表示该规则的错误等级
     *   - 'off' <==> 0 关闭告警
     *   - 'warn' <==> 1 警告级别
     *   - 'error' <==> 2 错误级别
     */
    rules: {
        'no-var': ['error'],
        // 不要重复引入一个模块
        'no-duplicate-imports': ['warn'],
        // 声明但未使用的变量
        '@typescript-eslint/no-unused-vars': ['warn'],
        // any
        '@typescript-eslint/no-explicit-any': ['warn'],
        // 箭头函数
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: false,
            },
        ],
    },

    settings: {
        react: {
            version: 'detect',
        },
    },
});
