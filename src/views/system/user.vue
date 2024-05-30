<template>
  <div class="app-container">
    <div class="wrap">
      <div class="header">
        <h3>用户列表</h3>
        <div @click="addUserMask"><img src="@/assets/role_images/add.png" alt=""><span>新建用户</span></div>
      </div>
      <div class="content">
        <!-- table 表头  -->
        <BaseTableHead :formData="formFieldsData" :fields="formFields" @input-change="onInputChange">
          <el-form-item>
            <el-button @click="resetSearchForm()">重置</el-button>
            <el-button type="primary" @click="userSearchSubmit">搜索</el-button>
          </el-form-item>
        </BaseTableHead>

        <!-- table表格 -->
        <div class="base-table" style="margin-top:20px">
          <BaseUserTable :data="userTableList" @activeUpdateUser="activeUpdateUser" :pagination="pageInfo"
            @update:pagination="updatePagination">
            <template #actions="{ row }">
              <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="handleDelete(row)">删除</el-button>
            </template>
          </BaseUserTable>
        </div>
      </div>
    </div>
    <!-- 新建以及编辑弹窗 -->
    <BaseDialog :visible.sync="dialogUserVisible" :title="titleName" @confirm="handleConfirm(userFrom)" confirmText="保存"
      cancelText="取消">
      <el-form :model="userFrom" :rules="rules" ref="userFrom" label-width="100px" class="demo-userFrom">
        <!-- 图片上传组件 -->
        <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
        <!-- :action="url" //上传接口
        v-model:file-list="fileList"
        :limit="1" //限制上传一张
        list-type="picture-card" //照片墙
        :before-upload="beforeUpload" //上传前
        :on-success="handleAvatarSuccess" //上传成功
        :headers="headers"
        :auto-upload="false" //手动上传 -->
        <el-form-item prop="avatar">
          <el-upload class="avatar-uploader" action="imageUrl" :show-file-list="false" :limit="1" :auto-upload="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-if="titleName=='新建用户'">
            <el-image v-if="imageUrl" style="width: 100px; height: 100px" :src="imageUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>

        <!-- 图片展示组件 -->
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userFrom.username" placeholder="请输入角色名称" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userFrom.email" placeholder="请输入邮箱" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="titleName=='新建用户'">
          <el-input v-model="userFrom.password" placeholder="请输入密码" autocomplete="off" style="width:300px"
            show-password></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="userFrom.confirmPassword" placeholder="请确认密码" autocomplete="off" style="width:300px"
            show-password></el-input>
        </el-form-item> -->
        <el-form-item label="角色" prop="roles">
          <el-checkbox-group v-model="checkedList">
            <el-checkbox v-for="(item, topIndex) in roleList" :label="item.name" :key="item.id"
              @change="handleRolesChange(item)">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="超级管理员">
          <el-switch v-model="userFrom.is_superuser" active-color="#ff4949" inactive-color="rgba(0, 0, 0, .14)"
            :active-value="false" :inactive-value="true" @change="handleSwitchSuperChange" />
        </el-form-item>
        <el-form-item label="禁用">
          <el-switch v-model="userFrom.is_active" active-color="#ff4949" inactive-color="rgba(0, 0, 0, .14)"
            :active-value="false" :inactive-value="true" @change="handleSwitchActiverChange" />
        </el-form-item>
      </el-form>
    </BaseDialog>
    <!-- 删除角色弹窗 -->
    <BaseDialog :visible.sync="dialogDelete" :showClose="showStatus" @confirm="handleDeleteConfirm()"
      header-visible="false">
      <div>
        <p style="text-align:center;color: #fff;">确定删除该角色吗?</p>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
  // https://blog.csdn.net/shsyzhzhgn/article/details/133877379 上传图片
  import BaseDialog from '@/components/BaseDialog';
  // import BaseTable from "@/components/BaseTable/indexs.vue";
  import BaseUserTable from './components/BaseUserTable';
  import BaseTableHead from '@/components/BaseTableHead'

  export default {
    components: {
      BaseDialog,
      BaseUserTable,
      BaseTableHead

    },
    data() {
      return {
        //新加用户
        titleName: '',
        roleList: [],//获取有那些角色
        //表格信息
        userTableList: [],
        //新建用户管理
        dialogUserVisible: false,
        titleName: '',
        userFrom: {
          avatar: "",
          roles: [],
          email: '',
          username: '',
          is_superuser: '',
          is_active: '',
          password: '',
          // confirmPassword: ''
        },
        rules: {
          username: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
          email: [{ required: true, message: '邮箱格式错误', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          // confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
          roles: [
            { type: 'array', required: true, message: '请至少选择一项', trigger: 'change' }
          ],
          avatar: [{ required: true, message: "请上传图片", trigger: "blur" }]

        },
        imageUrl: "",//上次头像
        checkedList: [], // 绑定选中的值
        Api_id: "",//点击要删除的id
        dialogDelete: false,//删除弹框
        showStatus: false,//弹窗是否显示叉号
        //编辑
        roleItem: {},//每一行表格的值

        //搜索
        //标题参数
        formFields: [
          { prop: 'username', label: '名称' },
          { prop: 'email', label: '邮箱' },

        ],
        formFieldsData: {},
        username: "",
        email: "",
        pageInfo: {
          page: 1,
          page_size: 10,
          total: 0,
        },




      }
    },
    mounted() {

      this.requestList();
      setTimeout(() => {
        this.getRolestList();//获取角色
      }, 10)

    },

    methods: {
      //请求角色列表接口
      getRolestList() {
        console.log("requestList", this.pageInfo)
        this.$api('system').roleList(this.pageInfo.page, this.pageInfo.page_size, '').then(res => {
          if (res && res.code && res.code == 200) {
            // this.tableData = res.data;
            res.data.forEach(element => {
              console.log(element)
              this.roleList.push({ name: element.name, id: element.id })
            });
            console.log(JSON.stringify(this.roleList))
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //请求user列表
      requestList() {
        this.$api('system').userList(this.pageInfo.page, this.pageInfo.page_size, this.username, this.email).then(res => {
          if (res && res.code && res.code == 200) {
            this.userTableList = res.data;
            this.pageInfo.page_size = res.page_size;
            this.pageInfo.page = res.page;
            this.pageInfo.total = res.total;
            console.log(JSON.stringify(this.userTableList))
          }
        }).catch(error => {
          console.log(error);
        });
      },
      addUserMask() {
        this.titleName = "新建用户";
        this.dialogUserVisible = true;

      },
      //选择的角色
      handleRolesChange(value) {
        let id = value.id;
        this.userFrom.roles.push(id);

      },
      //选择的超级用户的状态
      handleSwitchSuperChange(value) {
        this.userFrom.is_superuser = value;

      },
      //选择是否禁用的状态
      handleSwitchActiverChange(value) {
        this.userFrom.is_active = value;

      },
      //添加新建用户弹窗保存按钮 成功并请求角色列表
      handleConfirm(data) {
        console.log("保存按钮按钮", data)
        //新建角色
        if (this.titleName == "新建用户") {
          let createObj = {};
          // createObj.confirmPassword = data.confirmPassword;//确认密码
          createObj.email = data.email;
          createObj.is_active = data.is_active;
          createObj.is_superuser = data.is_superuser;
          createObj.password = data.password;
          createObj.roles = data.roles;
          createObj.username = data.username;
          console.log("createObj", createObj)
          //新建角色
          this.$api('system').createUser(createObj).then(res => {
            console.log(res)
            if (res && res.code && res.code == '200') {
            }
          }).catch(error => {
            console.log(error);
          });

        }
        if (this.titleName == '编辑用户') {
          console.log("data", data)
          this.roleItem.id = data.id;
          this.roleItem.email = data.email;
          this.roleItem.avatar = data.avatar;
          this.roleItem.username = data.username;
          this.roleItem.is_active = data.is_active;
          this.roleItem.is_superuser = data.is_superuser;
          this.roleItem.roles = data.roles;
          this.roleItem.id = this.Api_id;
          console.log("编辑用户==", this.roleItem)
          this.$api('system').updateUser(this.roleItem).then(res => {
            if (res && res.code && res.code == '200') {
              this.requestList();//创建成功之后请求列表接口
            }
          }).catch(error => {
            console.log(error);
          });
        }

      },
      // 更新user列表
      activeUpdateUser(data) {

        this.$api('system').updateUser(data).then(res => {
          console.log("更新接口成功", res)
          if (res && res.code && res.code == 200) {
            this.requestList();//用户管理列表
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //分页
      updatePagination() {
        this.pageInfo = newPagination;
      },
      //编辑角色弹窗
      handleEdit(row) {
        this.titleName = "编辑用户";
        console.log("编辑角色弹窗", row);
        this.dialogUserVisible = true;
        this.userFrom.username = row.username;
        this.userFrom.email = row.email;
        this.userFrom.is_superuser = row.is_superuser;
        this.userFrom.is_active = row.is_active;
        this.userFrom.avatar = row.avatar;
        this.Api_id = row.id;
      },
      //删除弹窗弹窗
      handleDelete(data) {
        console.log("data", data)
        this.Api_id = data.id;
        this.dialogDelete = true;
      },
      //删除角色接口
      handleDeleteConfirm() {
        this.$api('system').deleteUser(this.Api_id).then(res => {
          if (res && res.code && res.code == '200') {
            this.requestList();//创建成功之后请求列表接口
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //重置 路径 API简介 Tags 并请求列表接口
      resetSearchForm() {
        this.formFieldsData.username = '';//input的值重置为空
        this.formFieldsData.email = '';
        this.username = '';
        this.email = '';
        console.log("====", this.formFieldsData);
        this.requestList();
      },
      //拿到输入框的值
      onInputChange({ prop, value }) {
        this.formFieldsData[prop] = value;
        console.log("formFieldsData", this.formFieldsData);
      },
      //搜索 路径 API简介 Tags 并请求列表接口
      userSearchSubmit() {
        this.username = this.formFieldsData.username;
        this.email = this.formFieldsData.email;
        console.log("====", this.formFieldsData);
        this.requestList();
      },
      // 图片上传前的钩子
      beforeAvatarUpload(file) {
        this.$api('system').uploadImg().then(res => {
          console.log("====", res)
        }).catch(error => {
        })



        const isJPG = file.type === 'image/jpeg';
        const isLT2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLT2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLT2M;
      },
      // 图片上传成功的钩子
      handleAvatarSuccess(response, file, fileList) {
        // 假设服务器返回的是图片的URL
        this.imageUrl = URL.createObjectURL(file.raw);
      }



    }
  }
</script>
<style>
  .avatar-uploader {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .el-form-item__content {
    margin-left: 0px !important;

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
<style scoped lang="scss">
  .app-container {
    width: 100%;

    .wrap {
      padding: 0 30px;
    }

    /* header */
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      >h3 {
        color: #fff;
        font-family: '微软雅黑';
      }

      >div {
        padding: 10px 10px;
        background-color: #409EFF;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        >img {
          width: 20px;
          height: 20px;
        }

        >span {
          color: #fff;
          font-size: 14px;
          font-family: '微软雅黑';
        }
      }
    }

    /*table */
    .content {
      width: 100%;
      height: 700px;
      padding: 30px 30px;
      background: rgba(0, 0, 0, 0.18627450980392);
      border-radius: 8px;
      margin-top: 30px;

      .table_header {
        padding: 20px 30px;
        width: 100%;

        .searchForm {
          display: flex;
        }
      }
    }
  }

  ::v-deep .el-form-item__label {
    color: #fff;
  }

  ::v-deep .el-input__inner {
    background: rgba(0, 0, 0, 0.068627450980392) !important;
    border: 1px solid #797979;
    color: #fff;
  }

  .table_header ::v-deep .el-button {
    width: 90px;
    height: 40px;
    margin-right: 15px;
  }

  /* 设置权限弹窗样式 */
  .authority ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }

  .authority ::v-deep .right-side-dialog {
    margin-left: auto;
    margin-right: 0;
  }

  /* 背景颜色 */
  .authority ::v-deep .el-dialog,
  .el-pager li {
    background: #284693;
    border-radius: 10px;
  }

  /* title颜色 */
  .authority ::v-deep .el-dialog__title {
    color: #fff
  }

  /* 叉号 */
  .authority ::v-deep .el-dialog__headerbtn .el-dialog__close {
    color: #fff
  }

  .authority ::v-deep .el-tabs__item {
    color: #fff;
  }

  .authority ::v-deep .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  ::v-deep .el-dialog__wrapper {
    background: rgba(0, 0, 0, 0.068627450980392);
  }

  ::v-deep .el-checkbox {
    color: #fff;

  }
</style>