/**
 * Created by icepro on 2018/3/10.
 */
import uniqueId from 'lodash/fp/uniqueId'
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
    initViewport (state, viewportDom) {
      let rootInstanceKey = 'root'
      state.viewportDom = viewportDom
      state.rootInstanceKey = rootInstanceKey
      this.commit('viewport/addInstance', {
        instanceKey: rootInstanceKey,
        className: 'container',
        parentInstanceKey: null
      })
    },
    setCurrentInstanceKey (state, key) {
      state.currentInstanceKey = key
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
          console.log('instanceInfo', instanceInfo)
          instanceInfo.vm.__mountChild__(instanceInfo.vm, instanceKey)
        }
      })
    },
    addInstance (state, {
      instanceKey,
      className,
      parentClassName,
      parentInstanceKey,
      onCreated
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
      if (onCreated) {
        // created -> styled
        onCreated(key)
      }
    }
  }
}
