<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" class="demo-tabs">
        <el-tab-pane label="基本设置">
          <div class="title">基本设置</div>
          <el-row gutter="36" style="margin-left: 40px">
            <el-col :span="12">
              <el-form
                :model="baseSetData"
                label-position="top"
                :rules="baseSetRules"
                ref="ruleFormRef"
              >
                <el-form-item label="姓名" label-width="330px">
                  <el-input
                    v-model="baseSetData.user_name"
                    :placeholder="adminInfo.user_name"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                  <el-input
                    v-model="baseSetData.createtime"
                    :placeholder="adminInfo.creat_time"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="管理员权限">
                  <el-input
                    v-model="baseSetData.admin"
                    :placeholder="adminInfo.admin"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="baseSetData.email" clearable></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                  <el-input
                    v-model="baseSetData.desc"
                    clearable
                    type="textarea"
                    :rows="3"
                  ></el-input>
                </el-form-item>
                <el-form-item label="国家/地区">
                  <el-input :placeholder="adminInfo.city" disabled></el-input>
                </el-form-item>
                <el-form-item label="所在街道">
                  <el-input
                    v-model="baseSetData.street"
                    :placeholder="adminInfo.street"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                  <el-input
                    v-model="baseSetData.phone"
                    :placeholder="
                      adminInfo.phone ? adminInfo.phone : '请输入联系电话'
                    "
                    clearable
                  >
                    <template #prepend>
                      <el-icon><Iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('ruleFormRef')"
                    style="width: 100%"
                    >提交</el-button
                  >
                </el-form-item>
              </el-form>
            </el-col>

            <el-col :span="12">
              <div class="content-right">
                <div class="avatar-title">更换头像</div>
                <el-upload
                  :action="baseUrl + '/admin/updata/avatar/' + adminInfo.id"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-avatar
                    :size="250"
                    :src="baseImagePath + adminInfo.avatar"
                    class="avatar"
                    v-if="adminInfo.avatar"
                  />
                  <el-icon class="avatar-uploader-icon" v-else>
                    <Plus />
                  </el-icon>
                </el-upload></div
            ></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="安全设置">
          <el-empty description="Description"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="账号绑定">
          <el-empty description="No Data"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <el-empty description="Description"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import options from "@/config/options.js";
import { mapState, mapActions } from "vuex";
import { Iphone, Plus } from "@element-plus/icons-vue";
import env from "@/config/env.js";
import { updataAdmin } from "@/api/getData.js";

export default {
  components: {
    Iphone,
    Plus,
  },
  data() {
    return {
      tabPosition: "left",
      baseSetData: {
        user_name: "",
        createtime: "",
        admin: "",
        id: "",
        email: "",
        desc: "",
        options: options,
        street: "",
        phone: "",
      },
      baseSetRules: {
        phone: [
          {
            required: true,
            min: 11,
            max: 11,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur",
          },
        ],
      },
      baseUrl: env.baseUrl,
      baseImagePath: env.baseImgPath,
    };
  },
  computed: {
    ...mapState(["adminInfo"]),
  },
  created() {
    this.getAdminData();
  },
  methods: {
    ...mapActions(["getAdminData"]),
    handleAvatarSuccess(res, file) {
      if (res.status === 1) {
        this.getAdminData();
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      // 限制5M
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
        return false;
      }

      if (!["jpg", "jpeg", "png"].includes(file.type.split("/")[1])) {
        this.$message.error("上传头像图片只能是 JPG、JPEG、PNG 格式!");
        return false;
      }
      return true;
    },
    submitForm(form) {
      if (this.baseSetData.phone === "") {
        this.baseSetData.phone = this.adminInfo.phone;
      }
      this.$refs[form].validate(async (valid) => {
        Object.entries(this.baseSetData).forEach(([key, value]) => {
          if (value === "") {
            this.baseSetData[key] = this.adminInfo[key]
              ? this.adminInfo[key]
              : "";
          }
        });
        if (valid) {
          const res = await updataAdmin(this.baseSetData);
          if (res.status === 1) {
            this.$message.success("更新成功");
            this.getAdminData();
          } else {
            this.$message.error("更新失败");
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

::v-deep .el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.title {
  margin-left: 58px;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.content-right {
  padding-left: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .avatar-title {
    height: 22px;
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    text-align: center;
  }
  .avatar {
    margin-bottom: 12px;
    overflow: hidden;
    display: flex;
  }
}
</style>