<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'welcome' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: 'user' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框区域 -->
    <el-input
      placeholder="请输入内容"
      v-model="query"
      class="input-with-select searchBox"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>添加用户</el-button>
    <!-- 数据展示区域 -->
    <el-table :data="dataList" border class="datalist" style="width: 951px">
      <el-table-column type="index" label="编号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="username" label="姓名" align="center" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180" align="center">
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getUserData } from '@/api/index.js'
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 5,
      dataList: []
    }
  },
  methods: {
    edit (v) {
      console.log(v)
    }
  },
  mounted () {
    getUserData({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    }).then(result => {
      this.dataList = result.data.users
    })
  }
}
</script>
<style lang="less" scoped>
.searchBox {
  width: 300px;
  margin-right: 10px;
}
.datalist {
  margin-top: 10px;
}
</style>
