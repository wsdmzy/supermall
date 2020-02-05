import BackTop from 'components/content/backTop/BackTop'

import {BACK_POSITION} from './const'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },
    listenBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
      // console.log(BACK_POSITION)
    }
  }
}