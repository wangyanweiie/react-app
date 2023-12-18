import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

/**
 * 组件规则
 * 组件是 React 的核心概念，是 React 应用程序的基石。定义一个组件有2种方式，类组件与函数组件。
 * 使用类组件需要满足两个条件：组件继承自 React.Component，组件内部必须定义 Render 方法。
 * 在 React 中组件的命名必须以大写字母开头，因为 React 会将以小写字母开头的组件视为原生 DOM 标签。
 * 在 React 中是用 className 来绑定 Class，用 style 来绑定 Style，且在 React 中是使用 {} 给属性赋值变量；其中 style 接受的值是一个对象，而且对象的属性名只能用驼峰式命名；其中 className 只接受字符串，不接受数组或者对象。
 * 在 React 中把内部数据称为 state，把参数数据称为 props。
 */

/**
 ** ******************** 1.常量 **********************
 * @returns JSX
 */
export function Hello1() {
  return (
    <div className="title head" style={{ color: 'green', fontWeight: 'bold' }}>
      hello 1
    </div>
  );
}

/**
 ** ******************** 2.变量 state **********************
 */
export function Hello2() {
  // 使用 "Hook" useState() 定义 state
  const [styleData] = useState({ color: 'red', fontSize: '16px' });
  const [isHead] = useState(true);
  const [className] = useState('title');

  return (
    <div className={`${className} ${isHead ? 'head' : ''}`} style={styleData}>
      hello 2
    </div>
  );
}

/**
 ** ******************** 3.变量 props **********************
 * 函数组件接收一个 props 作为传入组件参数数据的集合；
 * 并利用 ES6 解构赋值的功能获取组件的参数数据；
 * 并可以给参数数据设置默认值。
 */
export function Hello3(props) {
  const { title = 'hello 3' } = props;

  return <div>{title}</div>;
}

/**
 ** ******************** 4.监听 DOM 元素事件 **********************
 * 在 React 中用 onClick 来监听点击事件，用 {} 包裹点击事件触发时执行的函数，再赋值给 onClick；
 * PS：onClick={handleClick} 的结尾没有小括号！不要调用事件处理函数，只需传递给事件即可；
 * 当用户点击按钮时，React 会调用你的事件处理函数；
 */
export function Hello4() {
  const handleClick = () => {
    console.log('点击事件');
  };

  return <div onClick={handleClick}>hello 4</div>;
}

/**
 ** ******************** 5.监听组件事件 **********************
 * 在组件上监听 click 事件，先要把 click 事件触发时要执行的函数当作 Props 给子组件传递进去，
 * 在子组件的根元素上监听 click 事件，click 事件触发时执行该 Props，这样来间接监听子组件上的 click 事件。
 */
// 子组件
export function Hello5(props) {
  const { wrapClick } = props;

  const handleClick = () => {
    wrapClick();
  };

  return <div onClick={handleClick}>hello 5</div>;
}

// 父组件
export function Grandfather5() {
  const handleClick = () => {
    console.log('监听到子组件的点击事件');
  };

  return (
    <Hello5
      wrapClick={() => {
        handleClick();
      }}
    ></Hello5>
  );
}

/**
 ** ******************** 6.改变内部数据，state **********************
 * 在 React 中称内部数据为 state，
 * 使用 useState(param) 定义一个 state 时，可以通过参数 param 设置 state 的默认值，
 * 其返回一个数组，数组的第一个值是 state，数组的第二个值是改变 state 的函数，可以调用该函数来改变state。
 *
 * 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
 * React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
 * 要在一个事件中多次更新某些 state，可以使用 setNumber(n => n + 1) 更新函数。
 */
export function Hello6() {
  const [title, setTitle] = useState('hello 6');
  const [className, setClassName] = useState('title');

  const handleClick = () => {
    setTitle('hello react');
    setClassName('title active');
  };

  return (
    <div className={className} onClick={handleClick}>
      {title}
    </div>
  );
}

/**
 ** ******************** 7.改变参数数据，props **********************
 * 在父组件中定义一个 info 数据传递给子组件的 title 参数数据，同时也定义了一个回调函数 handleChangeTitle 来改变 info 数据，并把回调函数也传递给子组件的 changeTitle参数数据；
 * 这样子组件的 changeTitle 参数数据可以作为一个函数来调用，调用 changeTitle 时相当调用父组件的 handleChangeTitle 回调函数；
 * 可以把要改变的值通过 data 函数参数传递出来，再执行 setInfo(data) 改变 info 数据，再传递给子组件的 title 参数数据，间接改变了 title 参数数据；
 * 实现了 React 中组件如何改变参数数据。
 */
// 子组件
export function Hello7(props) {
  const { title = 'hello 7', changeTitle } = props;

  const handleChangeTitle = () => {
    changeTitle('hello React');
  };

  return (
    <div>
      {title}
      <button onClick={handleChangeTitle}>改变标题</button>
    </div>
  );
}

// 父组件
export function Grandfather7() {
  const [info, setInfo] = useState('hello 7');

  const handleChangeTitle = (data) => {
    setInfo(data);
  };

  return <Hello7 title={info} changeTitle={handleChangeTitle} />;
}

/**
 ** ******************** 8.监听组件数据的变化 **********************
 * 在函数组件中，可以 useEffect 监听数据的变化，但是无法像 Vue 的 watch 能够获取改变前的旧数据；
 * useEffect 有两个参数，第一个参数是一个回调函数，第二个参数是一个数组；这个数组中的元素都是依赖，每当依赖发生改变，就会触发回调函数的执行；
 * 可以自定义 Hook ==> "useWatch"
 */
/**
 * useWatch 1.0
 * 如何获取改变前的旧数据，可以在第一次数据改变时触发 useWatch 时用一个容器把旧数据存储起来，
 * 下次再触发 useWatch 时通过读取容器中的值就可以获取改变前的旧数据。
 * 容器可以用 useRef 这个 Hook 来创建。
 *
 * useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
 * 返回的 ref 对象在组件的整个生命周期内保持不变。
 */
export function useWatch1(value, callback) {
  const oldValue = useRef();

  useEffect(() => {
    callback(value, oldValue.current);

    // 更新保存的旧数据为当前数据
    oldValue.current = value;
  }, [value]);
}

/**
 * usewatch 2.0
 * 但是 useEffect 会在组件初次渲染后就会调用一次，导致 callback 回调函数会被执行一次，
 * 另外在 Vue 的 watch 是用 immediate 配置来控制在组件初次渲染后马上执行 callback 回调函数，
 *
 * 首先实现一下组件初次渲染不执行 callback 回调函数
 */
export function useWatch2(value, callback) {
  const oldValue = useRef();
  const isInit = useRef(false);

  useEffect(() => {
    // isInit 默认值为 false => 首次不抛出回调
    if (!isInit.current) {
      isInit.current = true;
    } else {
      callback(value, oldValue.current);
    }

    oldValue.current = value;
  }, [value]);
}

/**
 * usewatch 3.0
 * 再添加 immediate 配置来控制在组件初次渲染后是否马上执行 callback 回调函数。
 */
export function useWatch3(value, callback, config = { immediate: false }) {
  const oldValue = useRef();
  const isInit = useRef(false);

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true;

      if (config.immediate) {
        callback(value, oldValue.current);
      }
    } else {
      callback(value, oldValue.current);
    }

    oldValue.current = value;
  }, [value]);
}

/**
 * usewatch 4.0
 * 另外 Vue 的 watch 还返回一个 unwatch 函数，调用 unwatch 函数可以停止监听该数据。
 */
export function useWatch4(value, callback, config = { immediate: false }) {
  const oldValue = useRef();
  const isInit = useRef(false);
  const isWatch = useRef(true);

  useEffect(() => {
    if (isWatch.current) {
      if (!isInit.current) {
        isInit.current = true;

        if (config.immediate) {
          callback(value, oldValue.current);
        }
      } else {
        callback(value, oldValue.current);
      }

      oldValue.current = value;
    }
  }, [value]);

  const unwatch = () => {
    isWatch.current = false;
  };

  return unwatch;
}

/**
 * usewatch 自定义 Hook 的应用
 */
// export { useWatch4 } from './hook.js';
export function Hello8() {
  const [title, setTitle] = useState('hello 8');

  useWatch4(title, (value, oldValue) => {
    console.log(value);
    console.log(oldValue);
  });

  const handleChangeTitle = () => {
    setTitle('hello React');
  };

  return <div onClick={handleChangeTitle}>{title}</div>;
}

/**
 ** ******************** 9.父组件调用子组件中的方法 **********************
 * 在 Vue 中是使用 ref 给子组件赋予一个标识 ID ，再使用 this.$refs[ID] 访问到这个子组件的实例对象，然后通过实例对象去调用子组件的方法；
 * 而在 React 中比较复杂，子组件的类型不同实现方法也不同。
 *
 * 函数组件
 * 子组件要先使用 useImperativeHandle 定义要暴露给父组件的实例值，接受的第一个参数是 ref，第二个参数是回调函数；
 * 另外要把子组件传入 forwardRef 处理后再导出；
 * 父组件中使用 useRef() 获取子组件的实例；
 */
// 子组件（函数组件）
const Hello9 = (props, ref) => {
  const [title, setTitle] = useState('hello 9');

  useImperativeHandle(ref, () => ({
    handleChangeTitle: () => {
      setTitle('hello React');
    },
  }));

  return <div>{title}</div>;
};

// 把子组件传入 forwardRef 处理后再导出
export const Hello9Ref = forwardRef(Hello9);

// 父组件（函数组件）
export function Grandfather9() {
  const myCom = useRef();
  const changeTitle = () => {
    myCom.current.handleChangeTitle();
  };

  return (
    <div>
      <Hello9Ref ref={myCom} />
      <button onClick={changeTitle}>改变标题</button>
    </div>
  );
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
export function Hello10(props) {
  const { children } = props;
  return <div>{children}</div>;
}

// 父组件
export function Grandfather10() {
  return <Hello10>hello 10</Hello10>;
}

/**
 * ② 具名插槽
 * 先在父组件中定义一个函数，该函数能返回一个React元素；
 * 再通过 props 把该函数传递给子组件，在子组件中执行该函数，把执行结果添加到子组件的 React 元素中；
 */
// 子组件
export function Hello11(props) {
  const { children, element } = props;
  let elementSlot = '';

  if (element) {
    elementSlot = element();
  }

  return <div>{elementSlot}</div>;
}

// 父组件
export function Grandfather11() {
  const info = () => {
    return <span>hello 11</span>;
  };

  return <Hello11 element={info}></Hello11>;
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
export function Hello12(props) {
  const { children, element } = props;
  const [info] = useState('用子组件的数据写具名插槽 hello 12');
  let elementSlot = '';

  if (element) {
    elementSlot = element(info);
  }

  return (
    <div>
      {elementSlot}
      {children}
    </div>
  );
}

// 父组件
export function Grandfather12() {
  const info = (data) => {
    // data：'用子组件的数据写具名插槽 hello World 12'
    return <span>{data}</span>;
  };

  return <Hello12 element={info}></Hello12>;
}
