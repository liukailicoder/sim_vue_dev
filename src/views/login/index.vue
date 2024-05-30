<template>
  <div class="login-container">
    <!-- label-position="left" -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="right"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- 用户名称 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 输入密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 校证码 -->
      <div class="captcha_box">
        <el-form-item prop="captcha">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="captcha"
            v-model="loginForm.captcha_code"
            type="text"
            placeholder="请输入右侧校验码"
            tabindex="3"
            auto-complete="on"
          ></el-input>
        </el-form-item>
        <img
          class="captcha_btn"
          :src="captcha"
          alt=""
          @click="changeCaptcha"
        />
        <!-- trace -->
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { nanoid } from "nanoid";
export default {
  name: "Login",
  computed: {
    // /api/v1/base/captcha
    captcha() {
      return (
        "http://ss_test.i996.work/" +
        "api/v1/base/captcha?trace=" +
        this.loginForm.trace
      );
    },
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    let trace = nanoid(32);
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        captcha_code: "",
        trace,
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    changeCaptcha() {
      this.loginForm.trace = nanoid(32);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      // return console.log('当前token', this.$store.getters.token);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
              this.$message.error(err.msg || "未知错误");
            });
        }
      });
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error("The password can not be less than 6 digits"));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: "admin",
          password: "123456",
          captcha: "5302", //校验码
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", validator: validateUsername },
          ],
          password: [
            { required: true, trigger: "blur", validator: validatePassword },
          ],
        },
        loading: false,
        passwordType: "password",
        redirect: undefined,
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true,
      },
    },
    methods: {
      showPwd() {
        if (this.passwordType === "password") {
          this.passwordType = "";
        } else {
          this.passwordType = "password";
        }
        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      },
      handleLogin() {
        // return console.log('当前token', this.$store.getters.token);
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log("");
                this.$message.error(err.msg || "未知错误");
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #00a4f1;

.login-container {
  min-height: 100%;
  width: 100%;
  /* background-color: $bg; */
  background-image: url("~@/assets/login_images/login_bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;

  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 130px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    position: absolute;
    top: 20%;
    right: 14%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .captcha_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-form-item {
      width: 70%;
    }

    /* .el-input {
        height: 47px;

      } */
    ::v-deep .el-button:hover {
      background-color: #fff !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
      color: #454545 !important;
      /* pointer-events: none; */
    }

    ::v-deep .el-button:focus {
      background-color: #fff !important;
      border-color: rgba(255, 255, 255, 0.1) !important;
      color: #454545 !important;
    }

    .captcha_btn {
      width: 100px;
      height: 54px;
      /* line-height: 54px; */
      text-align: center;
      background: #fff;
      margin-bottom: 22px;
      border-radius: 5px;
    }
  }
}
</style>