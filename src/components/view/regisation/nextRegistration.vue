<template>
  <el-row style = "width:100%;">
      <el-row style = "display:block;width:1200px;margin:20px auto;padding-top:30px;background:#fff;">

        <el-steps :active="active" finish-status="success" process-status = "finish" space = "40%" style = "width:1000px;margin:0 auto;" align-center>
            <el-step title="个人信息"  icon = "el-icon-time"></el-step>
            <el-step title="店铺信息" icon = "el-icon-time"></el-step>
            <el-step title="注册成功" icon = "el-icon-time"></el-step>
        </el-steps>


<el-col :span = "12" :offset = "7" style = "margin-top:30px;">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon class="demo-ruleForm">
  <el-form-item label="注册人姓名" prop="name">
    <el-input v-model="ruleForm.name" style = "width:220px;"></el-input>
  </el-form-item>
  <el-form-item label="注册人邮箱" prop="mail" style = "margin-top:30px;">
    <el-input v-model="ruleForm.mail" style = "width:220px;"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phone" style = "margin-top:30px;">
    <el-input v-model="ruleForm.phone"   style = "width:220px;" :disabled="true"></el-input>
  </el-form-item>
   <el-form-item label="身份证号" prop="idcard"  style = "margin-top:30px;">
    <el-input v-model="ruleForm.idcard" style = "width:220px;"></el-input>
  </el-form-item>

  <el-form-item label="身份证有效期" required  style = "margin-top:30px;">
    <el-col :span="16">
      <el-form-item prop="idcard_validate" >
        <el-date-picker @change="changeTime" type="date" placeholder="选择日期" v-model="ruleForm.idcard_validate" style="width: 220px;"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
     <div style = "margin-bottom:20px;margin-top:30px">
    <p class = "imgLabel">身份证头像面</p>
     <uploadComp  @imgReady = "img1Ready" :actionUrl = "actionUrl"/>
</div>
     <div  style = "margin-bottom:20px;margin-top:30px">
    <p  class = "imgLabel">身份证国徽面</p>
      <uploadComp  @imgReady = "img2Ready" :actionUrl = "actionUrl"/>
</div>
     <div style = "margin-bottom:20px;margin-top:30px">
    <p class = "imgLabel">手持身份证半身照</p>

     <uploadComp  @imgReady = "img3Ready" :actionUrl = "actionUrl"/>
</div>
<el-col style = "width:350px;margin:0 auto;padding-bottom:50px;">
                               <div class = "go-btn"  style = "margin-left:100px;" @click="goprev()">上一步</div> 
                               <div class = "go-btn" style = "margin-left:50px;"  @click="gonext('ruleForm')">下一步</div>                                

    
</el-col>

</el-form>
</el-col>    
</el-row>

    <el-row style="height:50px;"></el-row>
  </el-row>
</template>

<script>
import uploadComp from "../viewcomp/upload";
import { ufload } from "../../../api/upyun";
import { promiseAjax } from "../../../api/ajax";
import { base_IP, base_port,base_uploadUrl } from "../../../api/base";
export default {
  data() {
    return {
      active: 0,
      ruleForm: {
        // 姓名
        name: "",
        //身份证有效期
        idcard_validate: "",
        //手机
        phone: "",
        //邮箱
        mail: "",
        //身份证号
        idcard: "",
        photo_url1: "",
        photo_url2: "",
        photo_url3: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: false
          }
        ],
        mail: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.com+)+$/,
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        idcard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          },
          {
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/,
            message: "请输入正确的身份证号",
            trigger: "blur"
          }
        ]
      },
      actionUrl: "https://www.paile.com",

      up1fileName: "",
      up2fileName: "",
      up3fileName: "",
      loadingText: "",
      uploading: ""
    };
  },
  methods: {
    changeTime(val) {
      this.ruleForm.idcard_validate =
        val.getFullYear() + "-" + val.getMonth() + "-" + val.getDate();
    },
    img1Ready(attr) {
      this.up1fileName = attr;
    },
    img2Ready(attr) {
      this.up2fileName = attr;
    },
    img3Ready(attr) {
      this.up3fileName = attr;
    },

    loading() {
      this.uploading = this.$loading({
        lock: true,
        text: this.loadingText,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    imgUpLoadErr() {
      this.$message({
        type: "error",
        message: "上传图片失败",
        showClose: true,
        center: true
      });
    },
    gonext(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            typeof this.up1fileName == "object" &&
            typeof this.up1fileName == "object" &&
            typeof this.up1fileName == "object"
          ) {
            this.loadingText = "正在上传图片";
            this.loading();
            ufload(this.up1fileName)
              .then(data => {
                if (JSON.parse(data).code == 200) {
                  this.ruleForm.photo_url1 = `${base_uploadUrl}${JSON.parse(data).url}`;

                  this.loadingText = "正在上传图片";

                  // JSON.parse(data).url 图片上传的名字和路径
                  // window.localStorage.setItem('ycode',0);
                  // this.$router.push('/registration3')
                  setTimeout(() => {
                    ufload(this.up2fileName)
                      .then(data => {
                        if (JSON.parse(data).code == 200) {
                          this.ruleForm.photo_url2 =`${base_uploadUrl}${JSON.parse(data).url}`;
                          this.loadingText = "正在上传图片";

                          ufload(this.up3fileName)
                            .then(data => {
                              if (JSON.parse(data).code == 200) {
                                this.ruleForm.photo_url3 = `${base_uploadUrl}${JSON.parse(data).url}`;

                                this.uploading.close();
                                this.loadingText = "上传成功，正在整理";
                                this.loading();
                                setTimeout(() => {
                                  this.uploading.close();
                                  //在这里进行ajax操作;

                                  promiseAjax(
                                    `http://${base_IP}:${base_port}/paile-service/api/shopsHandler/createSaler`,
                                    this.ruleForm
                                  )
                                    .then(data => {
                                      if (data.code == "0") {
                                        localStorage.setItem(
                                          "token_two",
                                          data.code
                                        );
                                        localStorage.setItem(
                                          "datas",
                                          JSON.stringify(data.datas)
                                        );
                                                    let pailewang_token = {
              isLogin:true,
            }
            window.localStorage.setItem("pailewang_token", JSON.stringify(pailewang_token));

                                        this.$router.push("/registration2");
                                      }
                                    })
                                    .catch(err => {
                                      console.log(err);
                                    });
                                }, 500);
                              } else {
                                this.uploading.close();
                                this.imgUpLoadErr();
                              }
                            })
                            .catch(err => {
                              this.uploading.close();
                              this.imgUpLoadErr();
                            });
                        } else {
                          this.uploading.close();
                          this.imgUpLoadErr();
                          //  console.log(JSON.parse(data))
                        }
                      })
                      .catch(err => {
                        this.uploading.close();
                        this.imgUpLoadErr();
                      });
                  }, 1000);
                } else {
                  this.uploading.close();
                  this.imgUpLoadErr();
                  // console.log(JSON.parse(data))
                }
              })
              .catch(err => {
                this.uploading.close();
                this.imgUpLoadErr();
                // console.log(1,err);
              });
          } else {
            this.$message({
              type: "error",
              message: "请将身份证图片上传齐全",
              showClose: true
            });
            return false;
          }
        } else {
          window.scrollTo(0, 0);
        }
      });
    },
    goprev() {
      window.localStorage.clear();
                  let pailewang_token = {
              isLogin:true,
            }
            window.localStorage.setItem("pailewang_token", JSON.stringify(pailewang_token));
      this.$router.push("/registration");
    }
  },
  components: {
    uploadComp
  },
  created() {
    this.ruleForm.phone = JSON.parse(localStorage.token).phone;
  }
};
</script>

<style scoped>
.imgLabel{
      text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:150px;
    line-height: 110px;
}
.go-btn{
  width:100px;;
  float: left;
  margin-left:50px;
      display:block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    background:#d43636;
    color:#fff;
}
.go-btn:hover{
  background:#f78989
}
</style>
