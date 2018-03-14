/**
 * Created by icepro on 2018/3/11.
 */
import { mountSlot } from './mount'
import eventBus from './eventBus'
export default {
  data () {
    return {
      __currentInstanceInfo__: null
    }
  },
  methods: {
    __registerEvent () {
      this.$el.removeEventListener('click', this.__clicked__)
      this.$el.removeEventListener('mouseover', this.__mouseover__)
      this.$el.addEventListener('click', this.__clicked__)
      this.$el.addEventListener('mouseover', this.__mouseover__)
    },
    __mouseover__ (event) {
      event.stopPropagation()
      eventBus.domMouseHover(this.__currentInstanceInfo__.__instanceKey__)
    },
    __clicked__ () {
      event.stopPropagation()
      this.$store.commit('viewport/setCurrentInstanceKey', this.__currentInstanceKey__)
    },
    __mountChild__ (vm, childInstancekey, mounted) {
      let childInstance = this.$store.state.viewport.instances.get(childInstancekey)
      let component = this.$store.state.application.pluginInstance.get(childInstance.__className__)
      childInstance.vm = this
      mountSlot(vm, component, 'default', childInstancekey, this.$store)
        .then(elem => {
          // can do some to elem
          mounted(elem)
        })
    },
    __refresh__ () {
    }
  },
  mounted () {
    if (!this.__currentInstanceKey__) {
      return
    }
    this.__registerEvent()

    this.__currentInstanceInfo__ = this
      .$store
      .state
      .viewport
      .instances
      .get(this.__currentInstanceKey__)
    // 设置当前实例对象
    this.__currentInstanceInfo__.vm = this
    this.__currentInstanceInfo__.data = this.$data
  }
}
