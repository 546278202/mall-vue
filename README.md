# 前言

[README in English](README-en.md)

精致商城H5(类似京东商城)

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass + flex 


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
git clone https://github.com/bailicangdu/vue2-elm.git  

cd mall-vue

npm install 或 yarn(推荐)

npm run dev

```
## 关于接口数据

此项目的所有接口数据都来源于配套的后台系统，[后台项目传送地址](https://github.com/bailicangdu/node-elm)。

如果想体验前后台同时开发，可以下载后台系统。

此时启动本项目的命令为：npm run local 而不是 npm run dev。

同时我们也提供了基于`element-ui`搭建的[后台管理页面](https://github.com/bailicangdu/vue2-manage)

如果只做前端开发，请忽略上面这几句话。


# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 macOS 10.12.3  Chrome 56  nodejs 6.10.0

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  [项目交流群](https://gitter.im/vue2-elm/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

# 效果演示

[查看demo请戳这里](http://cangdu.org/elm/)（请用chrome手机模式预览）

### 移动端扫描下方二维码

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/ewm.png" width="250" height="250"/>



# 目标功能
- [x] 搜索商品 -- 完成
- [x] 商品列表页 -- 完成
- [x] 购物车功能 -- 完成
- [x] 单个食品详情页面 -- 完成
- [x] 商家详情页 -- 完成
- [x] 登录、注册 -- 完成
- [x] 修改密码 -- 完成
- [x] 个人中心 -- 完成
- [x] 发送短信、语音验证 -- 完成
- [x] 下单功能 -- 完成 ✨✨🎉🎉
- [x] 订单列表 -- 完成
- [x] 订单详情 -- 完成
- [x] 添加、删除、修改收货地址 -- 完成
- [x] 帐户信息 -- 完成
- [x] 服务中心 -- 完成
- [x] 上传头像 -- 完成
- [ ] 付款 -- 完成~~



# 总结

1、因为并不是elm官方，而且因为要开代理，必须在pc端打开，最多只能做到下单这一步，下单成功后可以在手机客户端查看并付款。

2、一般涉及到money的网页逻辑都比较复杂，尤其像饿了么这样一个开放的平台，商家和食品种类繁多，页面与页面之间交互复杂，在写到 购物车 和 下单 功能时众多的数据和逻辑一度让人很头疼，又没有设计和接口api文档，只能一步步摸索。

3、vue因其轻量级的框架在中小型项目中表现亮眼，在大型单页面应用中因为vuex的存在，表现依然出色，在处理复杂交互逻辑的时候，vuex的存在是不可或缺的。所以说利用 vue + vuex 完全可以去做大型的单页面项目。

4、项目写到现在，从 登录注册到、首页、搜索、商家列表、购物车、下单、订单列表、个人中心 一个流程走完之后、不但对vue的理解更深一层，而且对以后掌控大型项目的时候也有非常多的帮助，做一个实际的项目才能对自己有很大的提升。

5、曾一度怀疑，花几个月的时间做这样一个项目到底有没有意义，本来只是想做一个小项目练练手，没想到后来越写越多，不过坚持下来后我相信一切都是值得的。

6、项目已经完成，共40多个页面。


# 最终目标

1、用node.js构建一个模拟外卖平台的后台系统。[地址在这里](https://github.com/bailicangdu/node-elm)
2、项目还在不断完善中，迭代中
。。。敬请期待


# 部分截图


### 商铺列表页

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/msite.gif" width="365" height="619"/>


### 商铺筛选页

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/food.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/food.gif" width="365" height="619"/>



### 餐馆食品列表与购物车

<img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/shop_cart.png" width="365" height="619"/> <img src="https://github.com/bailicangdu/vue2-elm/blob/master/screenshots/shop_cart.gif" width="365" height="619"/>


# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── elm                                         // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── footer
│   │   │   └── footGuide.vue                   // 底部公共组件
│   │   └── header
│   │       └── head.vue                        // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── page                                    // 页面
│   │   
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件

# License

[GPL](https://github.com/bailicangdu/vue2-elm/blob/master/COPYING)
