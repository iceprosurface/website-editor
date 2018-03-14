/**
 * Created by icepro on 2018/3/13.
 */
import Sortable from 'sortablejs'
export default {
  namespaced: true,
  state: {
    __className__: null,
    dragStartDataReady: false
  },
  mutations: {
    endDrag () {

    },
    registerDragMenus (state, dragableMenu) {
      let lastDragStartIndex = -1
      Sortable.create(dragableMenu, {
        animation: 50,
        // 才能被其他的拖入组支持
        group: {
          name: 'dragable-menu',
          pull: 'clone',
          put: false
        },
        sort: false,
        delay: 0,
        onStart: (event) => {
          lastDragStartIndex = event.oldIndex
          if (event.item.dataset.source) {

          } else if (event.item.dataset.gaeaKey) {
            state.dragStartDataReady = false
            this.commit('startDrag', {
              type: 'new',
              dragStartParentDom: dragableMenu,
              dragStartIndex: event.oldIndex
            })
            // 开始拖拽完毕
            state.dragStartDataReady = true
          }
        },
        onEnd: (event) => {
          this.commit(state.__className__ + '/endDrag')
          // 因为是 clone 方式, 拖拽成功的话元素会重复, 没成功拖拽会被添加到末尾 所以先移除 clone 的元素（吐槽下, 拖走的才是真的, 留下的才是
          // clone 的） 有 parentNode, 说明拖拽完毕还是没有被清除, 说明被拖走了, 因为如果没真正拖动成功, clone 元素会被删除
          if (event.clone.parentNode) {
            // 有 clone, 说明已经真正拖走了
            dragableMenu.removeChild(event.clone)
            // 再把真正移过去的弄回来
            if (lastDragStartIndex === dragableMenu.childNodes.length) {
              // 如果拖拽的是最后一个
              dragableMenu.appendChild(event.item)
            } else {
              // 拖拽的不是最后一个
              dragableMenu.insertBefore(event.item, dragableMenu.childNodes[lastDragStartIndex])
            }
          } else {
            // 没拖走, 只是晃了一下, 不用管了
          }
        },
        onAdd: (event) => {
          console.log('added')
        }
      })
    }
  }
}
