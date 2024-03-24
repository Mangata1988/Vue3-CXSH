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
                    v-model="baseSetData.username"
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
                    placeholder="请输入电话号码"
                    clearable
                  >
                    <template #prepend>
                      <el-icon><Iphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
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
import { mapState } from "vuex";
import { Iphone } from "@element-plus/icons-vue";
export default {
  components: {
    Iphone,
  },
  data() {
    return {
      tabPosition: "left",
      baseSetData: {
        username: "",
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
            min: 12,
            max: 12,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["adminInfo"]),
  },
  mounted() {
    console.log(this.adminInfo);
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
</style>