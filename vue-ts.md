# 在vue中使用TypeScript

引言
近几年前端对 TypeScript的呼声越来越高，Typescript也成为了前端必备的技能。TypeScript 是 JS类型的超集，并支持了泛型、类型、命名空间、枚举等特性，弥补了 JS 在大型应用开发中的不足。

在单独学习 TypeScript时，你会感觉很多概念还是比较好理解的，但是和一些框架结合使用的话坑还是比较多的，例如使用 React、Vue 这些框架的时候与 TypeScript 的结合会成为一大障碍，需要去查看框架提供的.d.ts的声明文件中一些复杂类型的定义、组件的书写方式等都要做出不小的调整。

本篇文章主要是结合我的经验和大家聊一下如何在Vue中平滑的从js过渡到ts，阅读本文建议对 TypeScript 有一定了解，因为文中对于一些 TypeScript 的基础的知识不会有太过于详细的讲解。（具体可以参考官方文档https://www.w3cschool.cn/typescript/typescript-tutorial.html，官方文档就是最好的入门手册）

构建
通过官方脚手架构建安装

# 1. 如果没有安装 Vue CLI 就先安装
npm install --global @vue/cli
最新的Vue CLI工具允许开发者 使用 TypeScript 集成环境 创建新项目。

只需运行vue create my-app。

然后，命令行会要求选择预设。使用箭头键选择 Manually select features。

接下来，只需确保选择了 TypeScript 和 Babel 选项，如下图：


然后配置其余设置，如下图：




设置完成 vue cli 就会开始安装依赖并设置项目。

目录解析
安装完成打开项目,你会发现集成 ts 后的项目目录结构是这样子的：

|-- ts-vue
    |-- .browserslistrc     # browserslistrc 配置文件 (用于支持 Autoprefixer)
    |-- .eslintrc.js        # eslint 配置
    |-- .gitignore
    |-- babel.config.js     # babel-loader 配置
    |-- package-lock.json
    |-- package.json        # package.json 依赖
    |-- postcss.config.js   # postcss 配置
    |-- README.md
    |-- tsconfig.json       # typescript 配置
    |-- vue.config.js       # vue-cli 配置
    |-- public              # 静态资源 (会被直接复制)
    |   |-- favicon.ico     # favicon图标
    |   |-- index.html      # html模板
    |-- src
    |   |-- App.vue         # 入口页面
    |   |-- main.ts         # 入口文件 加载组件 初始化等
    |   |-- shims-tsx.d.ts
    |   |-- shims-vue.d.ts
    |   |-- assets          # 主题 字体等静态资源 (由 webpack 处理加载)
    |   |-- components      # 全局组件
    |   |-- router          # 路由
    |   |-- store           # 全局 vuex store
    |   |-- styles          # 全局样式
    |   |-- views           # 所有页面
    |-- tests               # 测试
其实大致看下来，与之前用js构建的项目目录没有什么太大的不同，区别主要是之前 js 后缀的现在改为了ts后缀，还多了tsconfig.json、shims-tsx.d.ts、shims-vue.d.ts这几个文件，那这几个文件是干嘛的呢：

tsconfig.json: typescript配置文件,主要用于指定待编译的文件和定义编译选项
shims-tsx.d.ts: 允许.tsx 结尾的文件，在 Vue 项目中编写 jsx 代码
shims-vue.d.ts: 主要用于 TypeScript 识别.vue 文件，Ts 默认并不支持导入 vue 文件
使用
开始前我们先来了解一下在 vue 中使用 typescript 非常好用的几个库

vue-class-component: vue-class-component是一个 Class Decorator,也就是类的装饰器
vue-property-decorator: vue-property-decorator是基于 vue 组织里 vue-class-component 所做的拓展import { Vue, Component, Inject, Provide, Prop, Model, Watch, Emit, Mixins } from 'vue-property-decorator'
vuex-module-decorators: 用 typescript 写 vuex 很好用的一个库import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from 'vuex-module-decorators'
组件声明
创建组件的方式变成如下

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Test extends Vue {

}
data 对象
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  private name: string;
}
Prop 声明
@Prop({ default: false }) private isCollapse!: boolean;
@Prop({ default: true }) private isFirstLevel!: boolean;
@Prop({ default: "" }) private basePath!: string;
!: 表示一定存在，?: 表示可能不存在。这两种在语法上叫赋值断言
@Prop(options: (PropOptions | Constructor[] | Constructor) = {})
PropOptions，可以使用以下选项：type，default，required，validator
Constructor[]，指定 prop 的可选类型
Constructor，例如 String，Number，Boolean 等，指定 prop 的类型
method
js 下是需要在 method 对象中声明方法，现变成如下

public clickFunc(): void {
  console.log(this.name)
  console.log(this.msg)
}
Watch 监听属性
@Watch("$route", { immediate: true })
private onRouteChange(route: Route) {
  const query = route.query as Dictionary<string>;
  if (query) {
  this.redirect = query.redirect;
  this.otherQuery = this.getOtherQuery(query);
  }
}
@Watch(path: string, options: WatchOptions = {})
options 包含两个属性 immediate?:boolean 侦听开始之后是否立即调用该回调函数 / deep?:boolean 被侦听的对象的属性被改变时，是否调用该回调函数


@Watch('arr', { immediate: true, deep: true }) onArrChanged(newValue: number[], oldValue: number[]) {}
computed 计算属性
public get allname() {
  return 'computed ' + this.name;
}
allname 是计算后的值，name 是被监听的值

生命周期函数
public created(): void {
  console.log('created');
}

public mounted():void{
  console.log('mounted')
}
emit 事件
import { Vue, Component, Emit } from 'vue-property-decorator'
@Component
export default class MyComponent extends Vue {
  count = 0
  @Emit()
  addToCount(n: number) {
      this.count += n
  }
  @Emit('reset')
  resetCount() {
      this.count = 0
  }
  @Emit()
  returnValue() {
      return 10
  }
  @Emit()
  onInputChange(e) {
      return e.target.value
  }
  @Emit()
  promise() {
      return new Promise(resolve => {
      setTimeout(() => {
          resolve(20)
      }, 0)
      })
  }
}
使用 js 写法

export default {
  data() {
      return {
      count: 0
      }
  },
  methods: {
      addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
      },
      resetCount() {
      this.count = 0
      this.$emit('reset')
      },
      returnValue() {
      this.$emit('return-value', 10)
      },
      onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
      },
      promise() {
      const promise = new Promise(resolve => {
          setTimeout(() => {
          resolve(20)
          }, 0)
      })
      promise.then(value => {
          this.$emit('promise', value)
      })
      }
  }
 }
@Emit(event?: string)
@Emit 装饰器接收一个可选参数，该参数是[公式]Emit 会将回调函数名的 camelCase 转为 kebab-case，并将其作为事件名
@Emit 会将回调函数的返回值作为第二个参数，如果返回值是一个 Promise 对象，$emit 会在 Promise 对象被标记为 resolved 之后触发
@Emit 的回调函数的参数，会放在其返回值之后，一起被$emit 当做参数使用
vuex
在使用 store 装饰器之前，先过一下传统的 store 用法吧

export default  {
    namespaced:true,
    state:{
        foo:""
    },
    getters:{
        getFoo(state){ return state.foo}
    },
    mutations:{
        setFooSync(state,payload){
            state.foo = payload
        }
    },
    actions:{
        setFoo({commit},payload){
            commot("getFoo",payload)
        }
    }
}
然后开始使用vuex-module-decorators

import {
  VuexModule,
  Mutation,
  Action,
  getModule,
  Module
} from "vuex-module-decorators";
VuexModule 用于基本属性
export default class TestModule extends VuexModule { }
VuexModule 提供了一些基本属性，包括 namespaced,state,getters,modules,mutations,actions,context
@Module 标记当前为 module
@Module({ dynamic: true, store, name: "settings" }) class Settings extends VuexModule implements ISettingsState { }
module 本身有几种可以配置的属性:
namespaced:boolean 启/停用 分模块
stateFactory:boolean 状态工厂
dynamic:boolean 在 store 创建之后，再添加到 store 中。开启 dynamic 之后必须提供下面的属性
name:string 指定模块名称
store:Vuex.Store 实体 提供初始的 store


@Mutation 标注为 mutation
@Mutation private SET_NAME(name: string) { // 设置用户名 this.name = name; }
@Action 标注为 action
@Action public async Login(userInfo: { username: string; password: string }) { // 登录接口，拿到token let { username, password } = userInfo; username = username.trim(); const { data } = await login({ username, password }); setToken(data.accessToken); this.SET_TOKEN(data.accessToken); }
getModule 得到一个类型安全的 store，module 必须提供 name 属性
export const UserModule = getModule(User);
示例
我之前基于 ts+vue+element 构建了一个简单的中后台通用模板。




涵盖的功能如下：

- 登录 / 注销

- 权限验证
  - 页面权限
  - 权限配置

- 多环境发布
  - Dev / Stage / Prod

- 全局功能
  - 动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - Svg 图标
  - 全屏
  - 设置
  - Mock 数据 / Mock 服务器

- 组件
  - ECharts 图表

- 表格
  - 复杂表格

- 控制台
- 引导页
- 错误页面
  - 404
里面对于在 vue 中使用 typescript 的各种场景都有很好的实践，大家感兴趣的可以参考一下，https://github.com/FSFED/ts-vue