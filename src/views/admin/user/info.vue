<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-row v-if="passWordPermission">
        <el-col><span style="color: #bd2c00">密码过期,请修改密码!!!</span></el-col>
      </el-row>
      <template>

        <el-tabs @tab-click="switchTab" v-model="tabName">
          <el-tab-pane label='信息管理' name='userManager'>
            <el-col :span="12">
            <el-form :model="ruleForm2"
                     :rules="rules2"
                     ref="ruleForm2"
                     label-width="100px"

                     class="demo-ruleForm">
              <el-form-item label="用户名"
                            prop="username">
                <el-input type="text"
                          v-model="ruleForm2.username"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm2.phone" placeholder="验证码登录使用"></el-input>
              </el-form-item>
              <!-- <el-form-item label="图片地址"  >
               <el-input v-model="avatarUrl" placeholder="验证码登录使用"></el-input>
             </el-form-item> -->
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://218.59.189.50:12003/admin/user/upload"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                >
                  <img id="avatar" v-if="ruleForm2.avatar" :src="avatarUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="submitForm('ruleForm2')">提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label='密码管理' name='passwordManager'>
            <el-col :span="12">
              <el-form :model="ruleForm2"
                       :rules="rules2"
                       ref="ruleForm2"
                       label-width="100px"

                       class="demo-ruleForm">
                <el-form-item label="原密码"
                              prop="password">
                  <el-input type="password"
                            v-model="ruleForm2.password"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码"
                              prop="newpassword1">
                  <el-input type="password"
                            v-model="ruleForm2.newpassword1"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码"
                              prop="newpassword2">
                  <el-input type="password"
                            v-model="ruleForm2.newpassword2"
                            auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             @click="submitForm('ruleForm2')">提交
                  </el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>

          </el-tab-pane>
        </el-tabs>
      </template>

    </basic-container>
  </div>
</template>


<script>
  import {handleDown} from "@/api/admin/user";
  import {mapState} from 'vuex'
  import store from "@/store";
  import request from '@/router/axios'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.ruleForm2.password !== '') {
          if (value !== this.ruleForm2.newpassword1) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      };
      var passwordValue = function (rule, value, callback) {

        var regex = new RegExp("^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\\\W_!@#$%^&*`~()-+=]{8,30}$");
        if(!regex.test(value)){
          callback(new Error('密码必须同时包含大写、小写、数字和特殊字符其中三项且至少8位并不大于30位'));
        }else {
          callback()
        }
      };
      return {
        tabName:'',
        switchStatus: '',
        // avatarUrl: 'http://localhost:12005/uploads/asdf/123.png',
        avatarUrl: '',
        show: false,
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token
        },
        ruleForm2: {
          username: '',
          password: '',
          newpassword1: '',
          newpassword2: '',
          avatar: '',
          phone: ''
        },
        rules2: {
          password: [{required: true, min: 6, message: '原密码不能为空且不少于6位', trigger: 'blur'}],
          newpassword1: [
            {validator: passwordValue,trigger: 'blur'}
          ],
          newpassword2: [{ validator: validatePass, trigger: 'blur'}]
        },
        passWordPermission:store.getters.permissions.passWordExpire,

      }
    },
    created() {
      this.ruleForm2.username = this.userInfo.username
      this.ruleForm2.phone = this.userInfo.phone
      this.tabName = 'userManager'
      this.ruleForm2.avatar = this.userInfo.avatar
      this.avatarUrl = 'http://218.59.189.50:12005'+this.userInfo.avatar;
      if(store.getters.permissions.passWordExpire){
        this.tabName = "passwordManager";
        this.$message.info("密码过期，请修改密码！！！")
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
    },
    methods: {
      switchTab(tab, event) {
        this.tabName = tab.name
      },
      open1(){
        this.$message({
          message: '居中的文字',
          center: true,
          duration:0
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            request({
              url: '/admin/user/edit',
              method: 'put',
              data: this.ruleForm2
            }).then(response => {
              if (response.data.data) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                // 修改密码之后强制重新登录
                if (this.tabName === 'passwordManager') {
                  this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                }
              } else {
                this.$notify({
                  title: '失败',
                  message: response.data.msg,
                  type: 'error',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.$notify({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.ruleForm2.password='';
        this.ruleForm2.newpassword1='';
        this.ruleForm2.newpassword2='';
        this.ruleForm2.newpassword2='';
        this.ruleForm2.username = this.userInfo.username;
        this.ruleForm2.phone = this.userInfo.phone;
        this.ruleForm2.avatar = this.userInfo.avatar;

      },
      handleAvatarSuccess(res, file) {
        this.avatarUrl = URL.createObjectURL(file.raw);
        this.$forceUpdate()
        this.$notify({
              title: '成功',
              message: '头像上传成功',
              type: 'success',
              duration: 2000
            });
        this.ruleForm2.avatar = res.data.bucketName + "-" + res.data.fileName;
      },
       handlePictureCardPreview(file) {
        this.avatarUrl = file.url;
      }
    }
  }
</script>
<style>
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
    font-size: 28px!important;
    color: #8c939d!important;
    width: 178px!important;
    height: 178px!important;
    line-height: 178px!important;
    text-align: center!important;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
