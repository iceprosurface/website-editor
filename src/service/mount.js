import Vue from 'vue'
import HelperClass from './mount-mixins.js'
export function mountRoot ($el, component, isAppend, instanceKey, store) {
  return new Promise((resolve, reject) => {
    let $mountDom = null
    if (isAppend) { // 是否使用追加式添加
      let span = document.createElement('span')
      $el.appendChild(span)
      $mountDom = span
    } else {
      $mountDom = $el
    }
    let vm = new Vue({
      extends: component,
      mixins: [HelperClass],
      store
    })
    // 挂载前 data赋值
    vm.__currentInstanceKey__ = instanceKey
    vm.$mount($mountDom)
    // 挂载之后操作
    resolve(vm)
  })
}

export function mountSlot (parentVm, component, slotName, instanceKey, store) {
  return new Promise((resolve, reject) => {
    let WrapperComponent = {
      extends: component,
      mixins: [HelperClass, {
        props: {
          __currentInstanceKey__: {
            type: String,
            default: instanceKey
          }
        }
      }],
      store
    }
    let elem = parentVm.$createElement(WrapperComponent)
    if (Array.isArray(parentVm.$slots[slotName])) {
      parentVm.$slots[slotName].push(elem)
    } else {
      parentVm.$slots[slotName] = [elem]
    }
    // SEE: https://cn.vuejs.org/v2/api/#vm-forceUpdate
    // 先更新父级 子级vnode 才能获取到 对应的 componentInstance
    parentVm.$forceUpdate()
    parentVm.$nextTick(() => {
      // 挂载之后操作
      resolve(elem)
    })
  })
}
