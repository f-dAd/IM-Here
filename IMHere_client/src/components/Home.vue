<template>
  <div class="container">
    <div class="connect_box">
      <!-- 按钮区域 -->
      <el-button type="primary" style="margin: 0 50px" @click="connect">connect</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      socket: ''
    }
  },
  methods: {
    connect () {
      const wsuri = 'ws://127.0.0.1:8000'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () {
      console.log('socket连接成功')
      this.$message.success('socket连接成功')
    },
    websocketonerror () {
      console.log('连接错误')
    },
    websocketonmessage (msg) {
      console.log(msg.data)
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    background-color: rgb(24, 145, 145);
    background-image:  url("../assets/images/1.png");
    height: 90%;
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .connect_box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(red, green, blue, 0)
  }
</style>
