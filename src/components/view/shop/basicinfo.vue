<template>
    <el-col  :span = "24" :offset = "0" class = "info bower">
        <el-col :span = "22" :offset = "1" style = "margin-top:20px;">
            <el-row style = "line-height:50px;">
                <el-col :span = "4" class = "Text_title" style = "text-align:right">店铺名称 : </el-col>
                <el-col :span = "16" :offset = "1">{{shopName}}</el-col>
            </el-row>
            <el-row style = "line-height:50px;">
                <el-col :span = "4" class = "Text_title"  style = "text-align:right">店铺认证 : </el-col>
                <el-col :span = "16" :offset = "1">{{shopAuth}}</el-col>
            </el-row>  
            <el-row style = "line-height:50px;">
                <el-col :span = "4" class = "Text_title"  style = "text-align:right">店铺保证金 : </el-col>
                <el-col :span = "16" :offset = "1">{{shopBond}}元</el-col>
            </el-row>  
            <el-row style = "line-height:50px;">
                <el-col :span = "4" class = "Text_title"  style = "text-align:right">主营类目 : </el-col>
                <el-col :span = "16" :offset = "1">{{MainCategory}}</el-col>
            </el-row>
            <el-row style = "line-height:50px;">
                <el-col  :span = "4" class = "Text_title"  style = "text-align:right;line-height:100px">店铺头像 : </el-col>
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :file-list="fileList"
                    :multiple = "false"
                    :limit = "uploadlimit"
                    :on-change = "checkImg"
                    >
                     <el-col :span = "16" :offset="8"> 
                          <img v-bind:src="imgUrl" alt="" width = "100px" height = "100px" style="margin-left:8px">
                    </el-col>
                </el-upload>
      
            </el-row>
            <el-row style = "margin-top:20px">
                <el-col class = "Text_title"  :span = "4"  style = "text-align:right;line-height:60px">*店铺地址:</el-col>
                <el-col :span = "16" :offset = "1">
                    <el-input clearable v-model.lazy="shop.addres" style = "margin-top:10px;"></el-input>    
                </el-col>    
            </el-row>    
             <el-row style = "margin-top:20px">
                <el-col :span = "4" class = "Text_title"   style = "text-align:right;line-height:50px">*管理员姓名:</el-col>
                <el-col :span = "16" :offset = "1">
                    <el-input clearable v-model.lazy="shop.name" style = "margin-top:10px;"></el-input>    
                </el-col>    
            </el-row>   
                <el-row style = "margin-top:20px">
                    <el-col :span = "4" class = "Text_title"   style = "text-align:right;line-height:50px">*管理员邮箱:</el-col>
                <el-col :span = "16" :offset = "1">
                    <el-input clearable v-model.lazy="shop.email" style = "margin-top:10px;"></el-input>    
                </el-col>    
            </el-row>  
              <el-row style = "margin-top:20px">
                <el-col :span = "4" class = "Text_title"   style = "text-align:right;line-height:50px">管理员手机号:</el-col>
                <el-col :span = "16" :offset = "1">
                    <el-input clearable v-model.lazy="shop.phone" disabled style = "margin-top:10px;"></el-input>    
                </el-col>    
            </el-row>  
             <el-row style = "margin-top:20px">
                <el-col :span = "4" class = "Text_title"   style = "text-align:right;line-height:50px">备用联系人姓名:</el-col>
                <el-col :span = "16" :offset = "1">
                    <el-input clearable v-model.lazy="shop.spareName" disabled style = "margin-top:10px;"></el-input>    
                </el-col>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            </el-row>  
             <el-row style = "margin-top:20px">
                <el-col :span = "4"  class = "Text_title"  style = "text-align:right;line-height:50px">备用联系人手机:</el-col>
                <el-col :span = "16" :offset = "1">
                    <el-input clearable v-model.lazy="shop.sparePhone" disabled style = "margin-top:10px;"></el-input>    
                </el-col>    
            </el-row> 
            <el-row style = "margin-top:30px;margin-bottom:50px;text-align:center">
                  <el-button style=" width:150px;margin-left:40px;margin-top:10px;" type="danger" @click = "save" >保存</el-button>    
            </el-row> 
        </el-col>
    </el-col>
</template>

<script>
import {ufload} from '@/api/upyun'
export default {
    data(){
        return {
            shopName :　"啊什顿",
            shopAuth : "个人/企业",
            shopBond : 100,
            MainCategory:'水果生鲜',
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            imgUrl : "http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg",
            initImgUrl:"http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg",
            uploadlimit:1,
            shop : {
                addres : "啊什顿",
                name : "啊什顿",
                email : "123@qq.com",
                phone : "151515151",
                spareName:"",
                sparePhone:""

            },
            imgAttr : '',
        }
    },
    methods:{
        submitUpload() {
        this.$refs.upload.submit();
        },
        checkImg(file, fileList){
            this.$refs.upload.clearFiles();
            this.imgUrl = file.url;
            this.imgAttr = file.raw;
        },
        save(){
            if(this.shop.addres == "" || this.shop.name == "" || this.shop.email == ""){
                 this.$message({
                        message: '您还有字段没有填写完整',
                        showClose: true,
                        type: 'warning',
                        center:true,
                });
                return false;
            }
            /***@augments 
             * 在这里执行交互操作，回调中执行this.$message
             */
            if(this.imgUrl != this.initImgUrl){
                    ufload(this.imgAttr).then((data)=>{
                        if(JSON.parse(data).code == 200){
                           
                            this.$message({
                                message: '恭喜您提交成功',
                                showClose: true,
                                type: 'success',
                                center:true,
                            });
                        }else{
                            
                            this.$message({
                                message: '提交失败',
                                showClose: true,
                                type: 'error',
                                center:true,
                            }); 
                        }
                        
                    }).catch((err)=>{
                        console.log(err);
                    })
            }

            
             
        }
    }

}
</script>

<style lang = "scss"  scoped>
    .info {
        height:610px;
        background:#ecf1f5;
    }
     .Text_title{
        font-weight: 800;
        font-size:16px;
        color:#333;
        /* text-shadow:1px 1px 3px #999; */
        
    }
        
.bower {
  height: 610px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px; /*滚动条宽度*/
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px; /*滚动条的背景区域的圆角*/
    background-color: rgba(255, 255, 255, 0); /*滚动条的背景颜色*/
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 15px; /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0); /*滚动条的背景颜色*/
  }
}
</style>
