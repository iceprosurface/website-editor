/**
 * Created by icepro on 2018/3/10.
 */
import uniqueId from 'lodash/fp/uniqueId'
import get from 'lodash/get'
import set from 'lodash/set'
import { mountRoot } from '../service/mount'
export default {
  namespaced: true,
  state: {
    currentHoverInstanceKey: null,
    currentInstanceKey: null,
    viewportDom: null,
    rootInstanceKey: null,
    instances: new Map()
    // instancesDoms: new Map()
  },
  mutations: {
    setCurrentHoverInstanceKey (state, key) {
      state.currentHoverInstanceKey = key
    },
    setHoverInstanceToActive (state) {
      state.currentInstanceKey = state.currentHoverInstanceKey
    },
    initViewport (state, {
      viewportDom,
      store
    }) {
      let rootInstanceKey = 'root'
      state.viewportDom = viewportDom
      state.rootInstanceKey = rootInstanceKey
      this.commit('viewport/addInstance', {
        instanceKey: rootInstanceKey,
        className: 'container',
        parentInstanceKey: null,
        onMount (instancekey, mounted) {
          let instanceInfo = state.instances.get(rootInstanceKey)
          let component = store.state.application.pluginInstance.get(instanceInfo.__className__)
          mountRoot(state.viewportDom, component, false, rootInstanceKey, store)
            .then(() => {
              mounted()
            })
        }
      })
    },
    setCurrentInstanceKey (state, key) {
      state.currentInstanceKey = key
    },
    setInstanceProps (state, {vm, path, value}) {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        let oldValue = get(vm.$data, path)
        console.log(oldValue)
        set(vm.$data, path, {
          ...oldValue,
          ...value
        })
      } else {
        set(vm.$data, path, value)
      }
      console.log(vm.$data)
      console.log(vm)
      vm.$forceUpdate()
    },
    // TODO: 做成拖拽添加的
    uiClick (state, className) {
      // 使用className创建一个元素
      console.log(className)
      if (!state.currentInstanceKey) {
        return
      }
      let instanceInfo = state.instances.get(state.currentInstanceKey)
      this.commit('viewport/addInstance', {
        instanceKey: null,
        className: className,
        parentClassName: instanceInfo.__className__,
        parentInstanceKey: instanceInfo.__instanceKey__,
        onCreated: (instanceKey) => {
        }
      })
    },
    addInstance (state, {
      instanceKey,
      className,
      parentClassName,
      parentInstanceKey,
      onCreated,
      onMount
    }) {
      let key = instanceKey || uniqueId('_instance_')
      state
        .instances
        .set(key, {
          __instanceKey__: key,
          __className__: className,
          data: {
            props: null
          },
          vm: null,
          parentClassName,
          parentInstanceKey
        })
      state.instances = new Map(state.instances)
      let currentInstance = state.instances.get(key)
      if (onCreated) {
        // created -> styled
        onCreated(key)
      }
      if (parentInstanceKey) {
        let instanceInfo = state
          .instances
          .get(parentInstanceKey)
        instanceInfo.vm.__mountChild__(instanceInfo.vm, key, () => {
          // 由於組件異步，這裡需要等一個回調
          this.commit('viewport/setInstanceProps', {
            vm: currentInstance.vm,
            path: 'styles',
            value: {
              border: '1px dashed #000',
              padding: '1px'
            }
          })
        })
      } else {
        onMount(key, () => {
          // 由於組件異步，這裡需要等一個回調
          this.commit('viewport/setInstanceProps', {
            vm: currentInstance.vm,
            path: 'styles',
            value: {
              border: '1px dashed #000',
              padding: '1px'
            }
          })
        })
      }
    }
  }
}
