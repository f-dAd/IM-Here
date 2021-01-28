<template>
<el-container class="container">
  <!-- 聊天对象 -->
  <el-header>header</el-header>
  <!-- 聊天消息 -->
  <el-main> <el-row>
                          <el-col :span="2">
                            <img class="avatar_box" :src="item.img" >
                          </el-col>
                          <el-col :span="12">
                            <div class="chatPop1">
                              <span style="line-height: 23px;">由type属性来选择tag的类型，也可以通过color属性来自定义背景色。</span>
                            </div>
                          </el-col>
                        </el-row>
  </el-main>
  <!-- 发送消息框 -->
  <el-footer height="150px"> <el-input class="sentcontent"
  type="text"
  placeholder="请输入内容"
  v-model="textarea">
  </el-input>
  <el-button size="mini" class="sendbtn">发送</el-button></el-footer>
</el-container>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
  width: 100%;
  background-color: #F5F6F7;
}
.el-header{
  border-bottom: 1px solid #E0E0E0;
}
.el-footer{
   border-top: 1px solid #E0E0E0;
   padding: 0;
}
.sentcontent /deep/ .el-input__inner{
  font-size: 18px!important;
  color:#000000!important;
  font-family: cursive!important;
  border:none  !important;
  height: 149px;
}
.sendbtn{
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 20px;
  width: 80px;
  background-color: #1E6FFF;
  color: white;
}
.sendbtn:hover{
  background-color: #5490f7;
  color: white;
}
.sendbtn:focus{
  background-color: #1E6FFF;
  color: white;
}
</style>
