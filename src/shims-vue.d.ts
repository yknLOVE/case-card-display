/// <reference types="vite/client" />

// 让 TS 识别 .vue 文件
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 静态资源（按需扩展）
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg' {
    const src: string
    export default src
}

// 如果项目中仍有以 .js 导入的外部模块，可声明为 any（可选）
declare module '*.js' {
    const value: any
    export default value
}