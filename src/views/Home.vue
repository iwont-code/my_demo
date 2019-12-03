<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <img
          src="../assets/snipaste_20191201_025322.png"
          height="60px"
          width="200px"
        />
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user"
                ><i class="el-icon-menu"></i>用户列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu></el-aside
      >
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <span class="system-title">后台管理系统</span>
          <div>
            <span class="userName">你好，admin</span>
            <a href="javascript:;">退出</a>
          </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background:#545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:#545c64;
  }
  .logo {
    height: 60px;
    background-size: cover;
    background-color: rgb(3, 247, 64);
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: pink;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: red;
  }
  .welcome {
    color: green;
    font-size: 30px;
  }
  .userName{
    color: yellow;
    margin-right: 10px;
  }
}
</style>
