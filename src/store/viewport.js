/**
 * Created by icepro on 2018/3/10.
 */
import uniqueId from 'lodash/fp/uniqueId'
import get from 'lodash/get'
import set from 'lodash/set'
import { mountRoot } from '../service/mount'
import * as Sortable from 'sortablejs'

export default {
  namespaced: true,
  state: {
    currentHoverInstanceKey: null,
    currentInstanceKey: null,
    viewportDom: null,
    rootInstanceKey: null,
    instances: new Map(),
    dragInfo: null
    // instancesDoms: new Map()
  },
  mutations: {
    setDragInfo (state, info) {
      state.dragInfo = info
    },
    endDrag (state) {
      state.dragInfo = null
    },
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
      vm.$forceUpdate()
    },
    registerInnerDrag (state, {
      parentInstanceKey,
      dragParentDom,
      onDragAdd,
      groupName = 'instance-container'
    }) {
      const instance = state
        .instances
        .get(parentInstanceKey)
      Sortable.create(dragParentDom, {
        animation: 50,
        group: {
          name: groupName,
          pull: true,
          put: ['dragable-menu', groupName]
        },
        onStart: (event) => {
          let item = event.item
          this.commit('viewport/setDragInfo', {
            type: 'move',
            className: item.dataset.key
          })
        },
        onEnd: (event) => {
          this.commit('viewport/endDrag')
        },
        onAdd: (event) => {
          let slotName = 'default'
          switch (state.dragInfo.type) {
            case 'new':
              const newInfo = state.dragInfo
              this.commit('viewport/addInstance', {
                className: newInfo.className,
                parentInstanceKey,
                indexPosition: event.newIndex,
                slotName: slotName,
                parentClassName: instance.__className__,
                onCreated: newInstanceKey => {
                  if (onDragAdd) {
                    // e --event parentInstanceKey  --父instanceKey gaeaKey  -->component type
                    // newInstanceKey  -> new instace Key
                    onDragAdd.call(this, event, parentInstanceKey, newInfo.className, newInstanceKey, slotName)
                  }
                }
              })
              break
          }
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
