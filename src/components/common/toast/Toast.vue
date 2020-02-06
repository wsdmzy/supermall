<template>
  <div class="toast" v-show="isShow">
    <div >{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '默认信息',
      isShow: false
    }
  },
  methods: {
    show(message='默认信息', duration = 1500) {
      this.message = message;
      this.isShow = true;
      // console.log('.....')
      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 8px;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
  }
</style>