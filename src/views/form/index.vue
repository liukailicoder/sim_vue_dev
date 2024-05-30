<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" v-for="item in keyObjs" :key="item.name">
      <el-form-item label="Activity name" :prop="form.name" :rules="getRules">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyObjs: [{ name: "name", rule: "varchar(16)", require: true }],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    getRules() {
      const item = {
        default_value: null,
        extra_info: "",
        is_nullable: "YES",
        is_primary_key: "",
        length: "255",
        name: "Step",
        type: "varchar",
      };
      let rules = [];
      if (item.is_nullable == "YES")
        rules.push({ require: true, message: `字段${item.name}不可为空` });
      if (this[`${item.type}RuleGet`])
        rules.concat(this[`${item.type}RuleGet`](item));
      return rules;
    },
    varcharRuleGet(item) {
      let rules = [
        {
          validater: (value, cb) => this.checkLength(value, item.length) ? cb(new Error(`长度不可超过${item.length}`)) : cb(),
          message: `字段${item.name}不可为空`,
        },
      ];
      return rules;
    },
    checkLength(value) {
      return value.length > item.length
    },
    float(item) {},
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

