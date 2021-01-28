<template>
<el-container class="container">
  <!-- 二级侧边栏 -->
  <el-aside class="message_box">
    <el-row class="left_header">
      <el-input
    placeholder="请输入内容"
    v-model="input" prefix-icon="el-icon-search" size="mini"
    clearable>
      </el-input>
    </el-row>
    <el-menu router default-active="1"  active-text-color="#000"  class="el-menu-vertical-demo">
      <el-menu-item :route="{ path: item.path, query: { chatid: item.chatid } }" v-for="(item,index) in list" :key="index" :index="item.path" class="left_message">
        <el-col><img class="avatar" :src="item.img" ></el-col>
        <div class="text_box">
          <div class="name text">{{item.name}}</div>
          <div class="dept text">{{item.dept}}</div>
        </div>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <!-- 聊天区域 -->
  <el-main>
    <!-- 路由占位符 -->
        <router-view>
        </router-view>
  </el-main>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          chatid: 123,
          path: '/home/list/chat',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614234560&t=14d2285d04aca6c997bd43726681f132', // 头像
          name: 'hahahahh',
          dept: '123456' // 下边文字
        },
        {
          chatid: 123,
          path: '/home/list/chat',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614234560&t=14d2285d04aca6c997bd43726681f132', // 头像
          name: '215',
          dept: '12cxvcx3456' // 下边文字
        },
        {
          chatid: 123,
          path: '/home/list/chat',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614234560&t=14d2285d04aca6c997bd43726681f132', // 头像
          name: 'hahahacxvxcvhha',
          dept: '12cxvcx3456' // 下边文字
        },
        {
          chatid: 123,
          path: '/home/list/chat',
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614234560&t=14d2285d04aca6c997bd43726681f132', // 头像
          name: 'hahahacxvxcvhha',
          dept: '12cxvcx3456' // 下边文字
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
  width: 100%;
}
.message_box{
  border-right:1px solid #E0E0E0;
}
.left_header{
  padding: 15px;
}
.el-menu{
  border-right: 0;
}
.left_message{
  display: flex;
  justify-content: start;
  background-color: #fff;
}
.left_message:hover{
  background-color: #f3ecec;
}
.left_message.is-active{
  background-color: #EBEBEB;
}
.text_box{
  display: flex;
  flex-direction: column;
  transform: translate(0, -12%);
  .text{
    height: 15px;
  }
  .name{
    font-size: 16px;
    margin-bottom: 3px;
    font: bold;
  }
  .dept{
    font-size: 13px;
    color:#7F7F7F;
  }
}
.avatar {
  margin-right: 10px;
}
.el-main{
  height: 100%;
  width: 100%;
  padding: 0;
  background-color: #2e7e5f;
}
</style>
