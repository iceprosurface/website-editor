/**
 * Created by icepro on 2018/3/10.
 */
import uniqueId from 'lodash/fp/uniqueId'
import get from 'lodash/get'
import set from 'lodash/set'
import { mountRoot } from '../service/mount'
import * as Sortable from 'sortablejs'
import event from '../service/eventBus'
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
    setDrag (state, drag) {
      event.$emit('drag-start', drag)
      state.dragInfo = drag
    },
    setDragInfo (state, info) {
      let dragInfo = state.dragInfo
      if (!dragInfo.info) {
        state.dragInfo.info = {}
      }
      state.dragInfo.info = {
        ...state.dragInfo.info,
        ...info
      }
    },
    endDrag (state) {
      event.$emit('drag-end')
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
        indexPosition: 0,
        slotName: 'default',
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
        draggable: '.component-instance',
        animation: 50,
        group: {
          name: groupName,
          pull: true,
          put: ['dragable-menu', groupName]
        },
        onStart: (event) => {
          // 能对innerDrag作出响应的必定是内部拖拽事件
          let item = event.item
          let slotName = event.from.dataset.slotName
          this.commit('viewport/setDrag', {
            type: 'viewport',
            className: item.dataset.key,
            dragStartParentDom: dragParentDom,
            dragStartIndex: event.oldIndex,
            info: {
              domInstanceKey: instance.slots[slotName][event.oldIndex]
            }
          })
        },
        onEnd: (event) => {
          this.commit('viewport/endDrag')
        },
        onUpdate: (event) => {
          let slotName = event.from.dataset.slotName
          // 同一个父级下子元素交换父级
          // 取消 srotable 对 dom 的修改, 让元素回到最初的位置即可复原
          this.commit('viewport/horizontalMoveInstance', {
            parentKey: parentInstanceKey,
            beforeIndex: event.oldIndex,
            afterIndex: event.newIndex,
            slotName
          })
        },
        onRemove: (event) => {
          // onEnd 在其之后执行，会清除拖拽目标的信息 减少了一个子元素，一定是发生在 viewport 区域元素发生跨父级拖拽时
          let toSlotName = event.to.dataset.slotName
          let fromSlotName = event.from.dataset.slotName
          const dragTargetKey = state
            .instances
            .get(parentInstanceKey)
            .slots[toSlotName][state.dragInfo.dragStartIndex]
          const dragViewportInfo = state.dragInfo.info
          this.commit('viewport/moveInstance', {
            sourceTargetKey: dragTargetKey,
            targetParentKey: dragViewportInfo.targetInstanceKey,
            targetIndex: dragViewportInfo.targetIndex,
            fromSlotName,
            toSlotName
          })
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
            case 'viewport':
              // 说明是从某个viewport中的可拖拽元素
              // 拖拽到另外一个元素
              // 增加操作将不再这里实现
              // 而是通过监控实例的消失实现，这里只是设置目标和index
              this.commit('viewport/setDragInfo', {
                index: event.index,
                targetInstanceKey: parentInstanceKey
              })
              break
          }
        }
      })
    },
    // 用于对跨层级拖拽作出支持
    moveInstance (state, {
      sourceTargetKey,
      targetParentKey,
      targetIndex,
      fromSlotName,
      toSlotName
    }) {
      const sourceTargetInstance = state
        .instances
        .get(sourceTargetKey)
      const sourceParentInstance = state
        .instances
        .get(sourceTargetInstance.parentInstanceKey)
      const targetParentInstance = state
        .instances
        .get(targetParentKey)
      if (sourceTargetInstance.parentInstanceKey !== targetParentKey) { // 跨越层级
        // 修改拖拽元素的 parentMapUniqueKey
        sourceTargetInstance.parentInstanceKey = targetParentKey
        // 拖拽目标添加 instance
        if (!targetParentInstance.slots[toSlotName]) {
          targetParentInstance
            .slots[toSlotName] = []
        }
        targetParentInstance
          .slots[toSlotName]
          .splice(targetIndex, 0, sourceTargetKey)

        // 拖拽源删除 instance
        sourceParentInstance.slots[fromSlotName] = sourceParentInstance
          .slots[fromSlotName]
          .filter(childKey => childKey !== sourceTargetKey)
      } else { // 同层级
        this.commit('viewport/horizontalMoveInstance', {
          parentKey: targetParentKey,
          beforeIndex: sourceParentInstance
            .slots[fromSlotName]
            .findIndex(childKey => childKey === sourceTargetKey),
          afterIndex: targetIndex
        })
      }
      // 触发 VueX 对map的检查
      state.instances = new Map(state.instances)
    },
    horizontalMoveInstance (state, {
      parentKey,
      beforeIndex,
      afterIndex,
      slotName
    }) {
      const parentInstance = state
        .instances
        .get(parentKey)
      if (beforeIndex < afterIndex) {
        // 从左到右
        for (let index = beforeIndex; index < afterIndex; index++) {
          const beforeUniqueKey = parentInstance.slots[slotName][index]
          const afterUniqueKey = parentInstance.slots[slotName][index + 1]
          parentInstance.slots[slotName][index] = afterUniqueKey
          parentInstance.slots[slotName][index + 1] = beforeUniqueKey
        }
      } else {
        // 从右到左
        for (let index = beforeIndex; index > afterIndex; index--) {
          const beforeUniqueKey = parentInstance.slots[slotName][index]
          const afterUniqueKey = parentInstance.slots[slotName][index - 1]
          parentInstance.slots[slotName][index] = afterUniqueKey
          parentInstance.slots[slotName][index - 1] = beforeUniqueKey
        }
      }
    },
    addInstance (state, {
      instanceKey,
      className,
      parentClassName,
      parentInstanceKey,
      onCreated,
      onMount,
      slotName,
      indexPosition
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
          slots: {},
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
        // 在slot下面记录对应的instanceKey
        if (!instanceInfo.slots[slotName]) {
          instanceInfo.slots[slotName] = []
        }
        instanceInfo
          .slots[slotName]
          .splice(indexPosition, 0, key)
        instanceInfo.vm.__mountChild__(instanceInfo.vm, key, slotName, () => {
          // 由於組件異步，這裡需要等一個回調
          this.commit('viewport/setInstanceProps', {
            vm: currentInstance.vm,
            path: 'instanceKey',
            value: key
          })
          console.log(instanceInfo.vm)
        })
      } else {
        onMount(key, () => {
          // 由於組件異步，這裡需要等一個回調
          this.commit('viewport/setInstanceProps', {
            vm: currentInstance.vm,
            path: 'instanceKey',
            value: key
          })
        })
      }
    }
  }
}
