import React from 'react';

/**
 * 组件规则
 * 组件是 React 的核心概念，是 React 应用程序的基石。
 * 定义一个组件有2种方式，使用类组件与函数组件；使用类组件需要满足两个条件：组件继承自 React.Component，组件内部必须定义 Render 方法。
 * 在 React 中组件的命名必须以大写字母开头，因为 React 会将以小写字母开头的组件视为原生 DOM 标签。
 * 在 React 中是用 className 来绑定 Class，用 style 来绑定 Style，且在 React 中是使用 {} 给属性赋值变量；其中 style 接受的值是一个对象，而且对象的属性名只能用驼峰式命名；其中 className 只接受字符串，不接受数组或者对象。
 * 在 React 中把内部数据称为 state，把参数数据称为 props。
 */

/**
 ** ******************** 1.常量 **********************
 * @returns JSX
 */
export class HelloWorld1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="title head"
        style={{ color: 'yellow', fontWeight: 'bold' }}
      >
        hello world 1
      </div>
    );
  }
}

/**
 ** ******************** 2.变量 state **********************
 */
export class HelloWorld2 extends React.Component {
  constructor(props) {
    super(props);

    // 定义 state
    this.state = {
      styleData: { color: 'red', fontSize: '16px' },
      isHead: true,
      className: 'title',
    };
  }

  render() {
    return (
      <div
        className={`${this.state.className} ${this.state.isHead ? 'head' : ''}`}
        style={this.state.styleData}
      >
        hello world 2
      </div>
    );
  }
}

/**
 ** ******************** 3.变量 props **********************
 * 在类组件中的构造函数 constructor 接受 props 作为传入组件的参数数据集合，
 * 并调用 super(props) 把 props 传给 React.Component 构造函数，
 * 这样类组件才能接受参数数据集合 props，并通过 this.props 使用参数数据
 */
export class HelloWorld3 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.title}</div>;
  }
}

// 定义 title 的默认值
HelloWorld3.defaultProps = {
  title: 'hello world 3',
};

/**
 ** ******************** 4.监听 DOM 元素事件 **********************
 * 在 React 中用 onClick 来监听点击事件，用 {} 包裹点击事件触发时执行的函数，再赋值给 onClick；
 * PS：onClick={handleClick} 的结尾没有小括号！不要调用事件处理函数，只需传递给事件即可；
 * 当用户点击按钮时，React 会调用你的事件处理函数；
 */
export class HelloWorld4 extends React.Component {
  constructor(props) {
    super(props);

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('点击事件');
  }

  render() {
    return <div onClick={this.handleClick}>hello world 4</div>;
  }
}

/**
 ** ******************** 5.监听组件事件 **********************
 * 在组件上监听 click 事件，先要把 click 事件触发时要执行的函数当作 Props 给子组件传递进去，
 * 在子组件的根元素上监听 click 事件，click 事件触发时执行该 Props，这样来间接监听子组件上的 click 事件。
 */
// 子组件
export class HelloWorld5 extends React.Component {
  constructor(props) {
    super(props);

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.wrapClick();
  }

  render() {
    return <div onClick={this.handleClick}>hello world 5</div>;
  }
}

// 父组件
export class Grandfather5 extends React.Component {
  handleClick() {
    console.log('监听到子组件的点击事件');
  }

  render() {
    return (
      <HelloWorld5
        wrapClick={() => {
          this.handleClick();
        }}
      ></HelloWorld5>
    );
  }
}

/**
 ** ******************** 6.改变内部数据，state **********************
 * 在 this.setState() 中可以传递一个函数或一个对象，建议传递一个函数 (state,props) => {}；
 * 函数可以接受内部数据 state 和参数数据 props 作为参数，而且 state 和 props 只读无法修改；
 * 每次调用 this.setState 时读取到的 state 和 Props 都是最新的，特别适用多次调用 this.setState 修改同一个 state 的场景；
 * 最后函数返回一个对象，对象的内容为要修改的 state。
 */
export class HelloWorld6 extends React.Component {
  constructor(props) {
    super(props);

    // 定义 state
    this.state = {
      title: 'hello world 6',
      className: 'title',
    };

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state, props) => ({
      title: 'hello react',
      className: 'title active',
    }));
  }

  render() {
    return (
      <div className={className} onClick={this.handleClick}>
        {title}
      </div>
    );
  }
}

/**
 ** ******************** 7.改变参数数据，props **********************
 * 在父组件中定义一个 info 数据传递给子组件的 title 参数数据，同时也定义了一个回调函数 handleChangeTitle 来改变info数据，并把回调函数也传递给子组件的 changeTitle参数数据；
 * 这样子组件的 changeTitle 参数数据可以作为一个函数来调用，调用 changeTitle 时相当调用父组件的 handleChangeTitle 回调函数；
 * 可以把要改变的值通过函数参数 data 传递出来，再执行 setInfo(data) 改变 info 数据，再传递给子组件的 title 参数数据，间接改变了 title 参数数据；
 * 实现了 React 中组件如何改变参数数据。
 */
// 子组件
export class HelloWorld7 extends React.Component {
  constructor(props) {
    super(props);

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  handleChangeTitle() {
    this.props.changeTitle('hello React');
  }

  render() {
    return (
      <div>
        {this.props.title}
        <button onClick={this.handleChangeTitle.bind(this)}>改变标题</button>
      </div>
    );
  }
}

HelloWorld7.defaultProps = {
  title: 'hello world 7',
};

// 父组件
export class Grandfather7 extends React.Component {
  constructor(props) {
    super(props);

    // 定义 state
    this.state = {
      info: 'hello world 7',
    };

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  handleChangeTitle(data) {
    this.setState((state, props) => {
      return {
        info: data,
      };
    });
  }

  render() {
    return (
      <HelloWorld7
        title={this.state.info}
        changeTitle={this.handleChangeTitle}
      ></HelloWorld7>
    );
  }
}

/**
 ** ******************** 8.监听组件数据的变化 **********************
 * 在类组件中用 componentDidUpdate 这个生命周期方法来实现。
 * 该方法首次渲染时 componentDidUpdate 不会执行，在后续 props 和 state 改变时会触发 componentDidUpdate；
 * 其接受的第一个参数 prevProps 代表改变前的 props，第二参数 prevState 代表改变前的 state；
 * 同时可以通过 this.props 与 this.state 获取到最新的 props 与 state。
 */
// 生命周期钩子
// componentDidUpdate(prevProps, prevState){
//   if(prevProps.title !== this.props.title){
//     console.log('props 中的 title 数据改变了');
//   }

//   if(prevState.info !== this.state.info){
//     console.log('state 中的 info 数据改变了');
//   }
// }

/**
 ** ******************** 9.父组件调用子组件中的方法 **********************
 * 在 Vue 中是使用 ref 给子组件赋予一个标识 ID ，再使用 this.$refs[ID] 访问到这个子组件的实例对象，然后通过实例对象去调用子组件的方法；
 * 而在 React 中比较复杂，子组件的类型不同实现方法也不同；
 *
 * 类组件
 * 使用 createRef() <==> 与 Vue 类似。
 */
// 子组件
export class HelloWorld9 extends React.Component {
  constructor(props) {
    super(props);

    // 定义 state
    this.state = {
      title: 'hello World 9',
    };
  }

  handleChangeTitle() {
    this.setState((state, props) => {
      return {
        title: 'hello React',
      };
    });
  }

  render() {
    return <div>{this.state.title}</div>;
  }
}

// 父组件
export class Grandfather9 extends React.Component {
  constructor(props) {
    super(props);

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.changeTitle = this.changeTitle.bind(this);
    this.myCom = React.createRef();
  }

  changeTitle() {
    this.myCom.current.handleChangeTitle();
  }

  render() {
    return (
      <div>
        <HelloWorld9 ref={this.myCom} />
        <button onClick={this.changeTitle}>改变标题</button>
      </div>
    );
  }
}

/**
 ** ******************** 10.组件插槽 **********************
 * React中是没有插槽的概念，不过可以用 props.children 来实现插槽的功能；
 * 每个组件都可以获取到 props.children，它包含组件的开始标签和结束标签之间的内容。
 */
/**
 * ① 普通插槽
 */
// 子组件
export class HelloWorld10 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

// 父组件
export class Grandfather10 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <HelloWorld10>hello World 10</HelloWorld10>;
  }
}

/**
 * ② 具名插槽
 * 可以通过 props 给子组件传递一个函数，
 * 如果这个函数最后返回 React 元素，其 React 元素是用 JSX 语法编写的，这样就间接实现具名插槽的功能。
 */
// 子组件
export class HelloWorld11 extends React.Component {
  constructor(props) {
    super(props);
    this.elementSlot = '';

    if (this.props.element) {
      this.elementSlot = this.props.element();
    }
  }

  render() {
    return <div>{this.elementSlot}</div>;
  }
}

// 父组件
export class Grandfather11 extends React.Component {
  constructor(props) {
    super(props);
  }

  info() {
    return <span>hello World</span>;
  }

  render() {
    return <HelloWorld11 element={this.info}></HelloWorld11>;
  }
}

/**
 * ③ 作用域插槽
 * 回顾上面具名插槽的实现过程，先在父组件中定义一个函数，该函数能返回一个React元素；
 * 再通过 props 把该函数传递给子组件，在子组件中执行该函数，把执行结果添加到子组件的 React 元素中。
 *
 * 如果在子组件中执行该函数时，把子组件的数据当作参数传递进去；
 * 那么在父组件中就可以用该函数接收子组件的数据来写 React 元素（插槽的内容）；
 * 这样就实现了作用域插槽。
 */
// 子组件
export class HelloWorld12 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '用子组件的数据写具名插槽 hello World 12',
    };
    this.elementSlot = '';

    if (this.props.element) {
      this.elementSlot = this.props.element(this.state.info);
    }
  }

  render() {
    return <div>{this.elementSlot}</div>;
  }
}

// 父组件
class Grandfather12 extends React.Component {
  constructor(props) {
    super(props);
  }

  info(data) {
    // data：'用子组件的数据写具名插槽 hello World 12'
    return <span>{data}</span>;
  }

  render() {
    return <HelloWorld12 element={this.info}></HelloWorld12>;
  }
}
