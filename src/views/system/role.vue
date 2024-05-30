<!--
 * @Descripttion: 
 * @version: 
 * @Author: 曹盼盼
 * @Date: 2024-05-21 19:23:13
 * @LastEditors: 曹盼盼
 * @LastEditTime: 2024-05-23 20:27:08
-->
<template>
  <div class="app-container">
    <div class="wrap">
      <div class="role_header">
        <h3>角色列表</h3>
        <div @click="addRoleMask">
          <img src="@/assets/role_images/add.png" alt="" /><span>新建角色</span>
        </div>
      </div>
      <div class="role_content">
        <!-- table 表头  -->
        <BaseTableHead
          :formData="formFieldsData"
          :fields="formFields"
          @input-change="onInputChange"
        >
          <el-form-item>
            <el-button @click="resetSearchForm()">重置</el-button>
            <el-button type="primary" @click="roleSearchSubmit">搜索</el-button>
          </el-form-item>
        </BaseTableHead>
        <!-- table表格 -->
        <div class="base-table" style="margin-top: 20px">
          <baseTable
            :columns="tableColumns"
            :data="tableData"
            :pagination="pageInfo"
            @update:pagination="updatePagination"
          >
            <template #actions="{ row }">
              <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="handleDelete(row)"
                >删除</el-button
              >
              <el-button size="mini" type="danger" @click="handlePower(row)"
                >设置权限</el-button
              >
            </template>
          </baseTable>
        </div>
      </div>
    </div>
    <!-- 新建 编辑角色 角色弹窗 -->
    <BaseDialog
      :visible.sync="dialogFormVisible"
      :title="roleName"
      @confirm="handleConfirm(ruleForm)"
      confirmText="保存"
      cancelText="取消"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入角色名称"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="ruleForm.desc"
            placeholder="请输入角色描述"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
    </BaseDialog>
    <!-- 删除角色弹窗 -->
    <BaseDialog
      :visible.sync="dialogDelete"
      :showClose="showStatus"
      @confirm="handleDeleteConfirm()"
      header-visible="false"
    >
      <div>
        <p style="text-align: center; color: #fff">确定删除该角色吗?</p>
      </div>
    </BaseDialog>
    <el-drawer
      title="设置权限"
      :visible.sync="dialogMask"
      direction="rtl"
      v-loading="authLoading"
    >
      <el-form
        :model="authorityForm"
        ref="authorityForm"
        label-width="100px"
        class="searchForm"
      >
        <el-form-item prop="names">
          <el-input
            v-model="authorityForm.names"
            autocomplete="off"
            style="width: 260px"
            placeholder="筛选"
          ></el-input>
          <el-button type="primary" @click="setAuth" style="margin-left: 10px"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handlePowerClick">
        <el-tab-pane label="菜单权限" name="first">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :check-strictly="true"
            @check="checkMenu"
            :default-checked-keys="menu_ids"
            :props="{
              label: 'name',
            }"
          >
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="接口权限" name="second"
          ><el-tree
            :data="apiList"
            show-checkbox
            node-key="id"
            default-expand-all
            :check-strictly="true"
            @check="checkApi"
            :default-checked-keys="api_ids"
            :props="{
              label: 'summary',
            }"
          >
          </el-tree
        ></el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import BaseTable from "@/components/BaseTable/indexs.vue";
import BaseDialog from "@/components/BaseDialog";
import BaseTableHead from "@/components/BaseTableHead";
import { mapMutations } from "vuex";
export default {
  name: "role",
  components: {
    BaseTable,
    BaseDialog,
    BaseTableHead,
  },
  computed: {
    apiTree() {
      // 预留 先不用
      let api_root = new Set(this.apiList.map((e) => e.tags));
      return [];
    },
  },
  data() {
    return {
      //新增、编辑、删除角色参数
      dialogFormVisible: false,
      roleName: "", //弹窗title
      ruleForm: {
        name: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      dialogDelete: false, //删除table弹窗
      showStatus: false, //弹窗是否显示叉号
      role_id: "", //每一条信息的 id
      roleItem: {}, //每一行表格的值
      //标题参数
      formFields: [{ prop: "username", label: "角色名" }],
      formFieldsData: {},
      role_name: "",
      //tab表格内容
      tableColumns: [
        { label: "角色名", prop: "name" },
        { label: "角色描述", prop: "desc" },
        { label: "创建时间", prop: "created_at" },
      ],
      tableData: [], //表格数据

      // 设置权限弹窗
      dialogMask: false,
      authorityForm: {
        name: "",
      },
      activeName: "first",
      pageInfo: {
        page: 1,
        page_size: 10,
        total: 0,
      },
      authLoading: false,

      menuList: [],
      apiList: [],
      menu_ids: [], // 选中的menus
      api_ids: [],
      authData: void 0, // 当前选中用户的权限
    };
  },
  mounted() {
    //请求接口地址
    this.requestList();
  },
  created() {},
  watch: {
    // 监听打开抽屉状态 来请求数据
  },
  methods: {
    checkMenu(e1, e2) {
      console.log("选择了", e1, e2);
      this.menu_ids = e2.checkedKeys;
    },
    checkApi(e1, e2) {
      this.api_ids = e2.checkedKeys;
      // api_infos
    },
    setAuth() {
      // menu_ids api_infos: {path: "/api/v1/base/access_token", method: "POST"}
      
      this.$api("system").setAuthorized({
        id: this.authData.id,
        menu_ids: this.menu_ids,
        api_infos: this.apiList
          .filter((e) => this.api_ids.indexOf(e.id) >= 0)
          .map((e) => ({ path: e.path, method: e.method })),
      }).then(res => {
        if (res.code == 200) {
          this.dialogMask = false;
          return this.$message.success(res.msg)
        };
        return this.$message.error(res.msg);
      }).catch(error => {
        return this.$message.error(error.msg||'未知错误');
      });
    },
    getAuthData(id) {
      this.authLoading = true;
      let queue = [
        this.$api("system").menuList(),
        this.$api("system").APIList(),
        this.$api("system").getAuthorized(id),
      ];
      Promise.all(queue)
        .then((res) => {
          this.authLoading = false;
          console.log("拿到的数据", res);
          for (let i = 0; i < res.length; i++) {
            const e = res[i];
            if (e.code != 200)
              return this.$message.error(e.msg || "网络错误");
          }
          this.authData = res[2].data;
          this.menuList = res[0].data;
          this.apiList = res[1].data;
          // 设置默认数据
          this.menu_ids = this.authData.menus.map((e) => e.id);
          this.api_ids = this.authData.apis.map((e) => e.id);
        })
        .catch((error) => {
          this.authLoading = false;
          this.$message.error(error.msg || "网络错误");
        });
    },
    //请求角色列表接口
    requestList() {
      console.log("requestList", this.pageInfo);
      this.$api("system")
        .roleList(this.pageInfo.page, this.pageInfo.page_size, this.role_name)
        .then((res) => {
          if (res && res.code && res.code == 200) {
            this.tableData = res.data;
            this.pageInfo.page_size = res.page_size;
            this.pageInfo.page = res.page;
            this.pageInfo.total = res.total;
            console.log(JSON.stringify(this.tableData));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //添加角色弹框
    addRoleMask() {
      this.roleName = "新增角色";
      this.dialogFormVisible = true;
    },
    //添加角色弹窗保存按钮 成功并请求角色列表
    handleConfirm(data) {
      console.log("保存按钮", data);
      if (this.roleName == "新增角色") {
        //新建角色
        this.$api("system")
          .createRole(data)
          .then((res) => {
            if (res && res.code && res.code == "200") {
              this.requestList(); //创建成功之后请求列表接口
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (this.roleName == "编辑角色") {
        this.roleItem.name = data.name;
        this.roleItem.desc = data.desc;
        this.$api("system")
          .updateRole(this.roleItem)
          .then((res) => {
            if (res && res.code && res.code == "200") {
              this.requestList(); //创建成功之后请求列表接口
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //编辑角色弹窗
    handleEdit(row) {
      this.roleName = "编辑角色";
      this.dialogFormVisible = true;
      this.ruleForm.name = row.name;
      this.ruleForm.desc = row.desc;
      this.roleItem = row;
    },
    //删除弹窗弹窗
    handleDelete(data) {
      this.role_id = data.id;
      this.dialogDelete = true;
    },
    //删除角色接口
    handleDeleteConfirm() {
      this.$api("system")
        .deleteRole(this.role_id)
        .then((res) => {
          if (res && res.code && res.code == "200") {
            this.requestList(); //创建成功之后请求列表接口
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //编辑权限
    handlePower(row) {
      console.log("权限", row);
      this.dialogMask = true;
      this.getAuthData(row.id);
    },
    // 更新表单数据
    onInputChange({ prop, value }) {
      this.formFieldsData[prop] = value;
      // console.log('this.formFieldsData[prop]', this.formFieldsData)
      // 可以在这里执行其他逻辑，如验证、提交等
    },
    //角色名搜索并请求角色列表接口
    roleSearchSubmit() {
      this.role_name = this.formFieldsData.username;
      console.log("====", this.formFieldsData);
      this.requestList();
    },
    //角色名重置并请求角色列表接口
    resetSearchForm() {
      this.formFieldsData.username = ""; //input的值重置为空
      this.role_name = ""; //角色名称为空
      this.requestList();
    },
    //设置权限
    handlePowerClick() {},
    //分页
    updatePagination(newPagination) {
      console.log("分页updatePagination", newPagination);
      this.pageInfo = newPagination;
      // 这里可以执行更多的逻辑，比如发送请求获取数据
    },
  },
};
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;

  .wrap {
    padding: 0 30px;
  }

  /* 角色header */
  .role_header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    > h3 {
      color: #fff;
      font-family: "微软雅黑";
    }

    > div {
      padding: 10px 10px;
      background-color: #409eff;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        width: 20px;
        height: 20px;
      }

      > span {
        color: #fff;
        font-size: 14px;
        font-family: "微软雅黑";
      }
    }
  }

  /* 角色table */
  .role_content {
    width: 100%;
    height: 700px;
    padding: 30px 30px;
    background: rgba(0, 0, 0, 0.18627450980392);
    border-radius: 8px;
    // margin-top: 30px;

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
  color: #fff;
}

/* 叉号 */
.authority ::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
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
</style>