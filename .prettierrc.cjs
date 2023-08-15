module.exports = {
  printWidth: 100, // 一行的字符数，如果超过会进行换行
  tabWidth: 2, // 一个 tab 代表几个空格数，默认就是 2
  useTabs: false, // 是否启用 tab 取代空格符缩进，.editorconfig 设置空格缩进，所以设置为 false
  semi: false, // 行尾是否使用分号，默认为 true
  singleQuote: true, // 字符串是否使用单引号
  trailingComma: 'none', // 对象或数组末尾是否添加逗号 none| es5| all
  jsxSingleQuote: true, // 在 jsx 里是否使用单引号，你看着办
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ foo: bar }
  arrowParens: 'avoid' // 箭头函数如果只有一个参数则省略括号
}
