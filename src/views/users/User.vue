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
      <el-table-column type="index" label="#" width="50" align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="UserName"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="email" label="Email" align="center" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="Mobile" width="180" align="center">
      </el-table-column>
      <el-table-column label="Status" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Handle" align="center" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showEditBox(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope.row.id)"
            >删除</el-button
          >
          <el-button size="mini" type="success">授权角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item
          label="UserName"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="editForm.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Mobile"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserData, editUser, delUserById } from '@/api/user.js'

export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 5,
      dataList: [],
      editFormVisible: false,
      formLabelWidth: '120px',
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在11个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击弹出编辑框
    showEditBox (data) {
      this.editFormVisible = true
      this.editForm = data
    },
    // 实现编辑提交
    editSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          editUser(this.editForm).then(result => {
            // 更新成功后把更新后的值再赋值给editForm
            // this.editForm = result.data
            this.init()
            this.editFormVisible = false
            // 如果绑定的数据源和editForm是同一个，就没有必要刷新
          })
        } else {
          this.$message({
            message: '输入格式错误',
            type: 'warning'
          })
        }
      })
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById(id).then(result => {
          if (result.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        this.init()
      })
    },
    // 封装初始化数据
    init () {
      getUserData({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        this.dataList = result.data.users
      })
    }
  },

  mounted () {
    this.init()
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
