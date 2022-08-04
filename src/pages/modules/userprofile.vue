<template>
  <q-page class="q-pa-md align-content-center">
    <q-dialog v-model="DaddFiles" seamless>
      <q-item-section style="max-width: 300px; max-height: 50vh" class="scroll">
        <q-uploader
          style="max-width: 300px"
          :url="this.$axios.defaults.baseURL + '/zero/uploadMyTmpFiles'"
          method="POST"
          auto-expand
          color="primary"
          :filter="checkFileSize"
          :label="this.$t('article.attachment')"
          :headers="[
            {
              name: 'enctype',
              value: 'multipart/form-data',
            },
            { name: 'Authorization', value: 'Bearer ' + this.$auth.token() },
          ]"
          @uploaded="upfilished"
        >
          <template v-slot:list="scope">
            <div class="text-right">
              <q-btn
                v-close-popup
                flat
                round
                color="negative"
                size="sm"
                icon="close"
                title="关闭此窗口"
              />
            </div>
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="scope.removeFile(file)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-uploader>
      </q-item-section>
    </q-dialog>
    <q-dialog v-model="Duserprfile">
      <q-card class="chart-profile">
        <q-toolbar class="bg-primary text-white">
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            :title="this.$t('buttons.close')"
          />
          <q-toolbar-title>
            <span class="text-subtitle1 text-weight-bold">
              {{ $t("auth.users.profile.header") }}</span
            >
          </q-toolbar-title>
          <q-btn
            flat
            icon="save"
            :label="this.$t('buttons.confirm')"
            @click="changeprofile()"
          />
        </q-toolbar>
        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input
            v-model.trim="data.name"
            color="orange"
            :label="this.$t('auth.users.profile.nickname')"
          />
          <q-select
            v-model.trim="data.sex"
            color="orange"
            :options="data.sexoptions"
            :label="this.$t('auth.users.profile.sex')"
            emit-value
            map-options
          />
          <q-input
            v-model.trim="data.birth"
            color="orange"
            :label="this.$t('auth.users.profile.birthday')"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model.trim="data.birth"
                    color="orange"
                    mask="YYYY-MM-DD"
                    text-color="black"
                    first-day-of-week="1"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model.trim="data.phone"
            color="orange"
            mask="### - #### ####"
            hint="Mask:### - ### - #### ####"
            :label="this.$t('auth.users.profile.phone1')"
          />
          <q-input
            v-model.trim="data.tel"
            type="text"
            color="orange"
            :label="this.$t('auth.users.profile.phone2')"
          />
          <q-input
            v-model.trim="data.address"
            color="orange"
            :label="this.$t('auth.users.profile.address')"
          />
          <q-input
            v-model.trim="data.memo"
            type="textarea"
            color="orange"
            :label="this.$t('auth.users.profile.remark')"
          />
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>
    <div class="text-h5 q-ma-md text-primary">
      {{ $t("auth.users.profile.pheader") }}
    </div>
    <q-separator color="accent" />
    <div align="center" style="margin: 16px 1px">
      <div class="row q-gutter-md">
        <q-card class="userprile-list" flat>
          <q-card-section>
            <q-avatar size="100px" style="cursor: pointer">
              <img :src="data.avatar" @click="uploadFile()" />
            </q-avatar>
            <p class="text-weight-bold text-overline text-warning">
              {{ data.name }}
            </p>
            <p class="text-caption text-grey">
              {{ $t("auth.users.profile.sex") }}：
              {{
                data.sex === "m"
                  ? $t("auth.users.profile.male")
                  : $t("auth.users.profile.female")
              }}
            </p>
            <p><q-icon color="warning" name="cake" /> {{ data.birth }}</p>
          </q-card-section>

          <q-card-actions>
            <q-btn
              flat
              color="primary"
              :label="this.$t('auth.users.profile.header')"
              @click="modiprfile"
            />
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :title="this.$t('auth.users.profile.remark')"
              :icon="
                profileexpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
              "
              @click="profileexpanded = !profileexpanded"
            />
          </q-card-actions>
          <q-card-actions>
            <q-separator />
          </q-card-actions>
          <q-slide-transition>
            <div v-show="profileexpanded">
              <q-card-section class="text-subitle2 text-left">
                <q-item style="padding: 4px 4px">
                  <q-item-section>
                    &nbsp;&nbsp;&nbsp;&nbsp;{{ filterChar(data.memo) }}
                  </q-item-section>
                </q-item>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
        <q-card
          class="userprile-work"
          flat
          square
          style="border-left: 1px dashed var(--q-secondary)"
        >
          <q-card-section class="text-subitle2 text-left">
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="double_arrow" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.no") }}：{{ data.no }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="double_arrow" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.title") }}：{{ data.title }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="double_arrow" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.position") }}：{{ data.position }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="double_arrow" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.jobs") }}：{{ data.jobs }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="double_arrow" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.department") }}：{{
                  department
                }}&nbsp;{{ data.companyname }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="contact_phone" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.phone1") }}：{{ data.phone }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="phone" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.phone2") }}：{{ data.tel }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
            <q-item style="padding: 4px 4px">
              <q-item-section
                avatar
                style="padding-right: 4px; min-width: 35px"
              >
                <q-icon color="primary" name="home_work" />
              </q-item-section>
              <q-item-section>
                {{ $t("auth.users.profile.address") }}：{{ data.address }}
              </q-item-section>
            </q-item>
            <q-separator
              spaced
              inset="item"
              style="
                margin-left: 30px;
                width: calc(100% - 30px);
                margin-top: 1px;
                margin-bottom: 1px;
              "
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
// import {  required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "UserprofileVue",
  components: {},
  filters: {
    filterChar: function (value) {
      if (value && value.length > 120) {
        value = value.substring(0, 120) + "...";
      }
      return value;
    },
  },
  data() {
    return {
      DaddFiles: false,
      Duserprfile: false,
      profileexpanded: true,
      department: null,
      unitMap: null,
      data: {
        avatar: null,
        no: null,
        name: null,
        sex: null,
        position: null,
        title: null,
        jobs: null,
        unitid: null,
        phone: null,
        tel: null,
        birth: null,
        address: null,
        memo: null,
        sexoptions: [
          { label: this.$t("auth.users.profile.male"), value: "m" },
          { label: this.$t("auth.users.profile.female"), value: "f" },
        ],
      },
      loading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  loading: false,
  created() {
    this.data.id = this.$auth.user().id;
  },
  mounted() {
    this.getmyprofile();
  },
  computed: {},
  methods: {
    filterChar(value) {
      if (value && value.length > 120) {
        value = value.substring(0, 120) + "...";
      }
      return value;
    },
    getmyprofile() {
      this.$api
        .get("/profile/getMyProfile/")
        .then((res) => {
          if (res.data.success) {
            // 将性别赋过去
            res.data.data.sexoptions = this.data.sexoptions;
            this.data = res.data.data;
            this.$nextTick(() => {
              this.getunitname();
            });
          } else {
            this.$zglobal.showMessage(
              "red-5",
              "center",
              this.$t("auth.register.invalid_data")
            );
          }
        })
        .catch((e) => {});
    },
    getunitname() {
      // 得到机构数据
      this.$api.get("/z_unit/").then((res) => {
        if (res.data.success) {
          // value and label
          this.unitMap = res.data.data.map((val) => {
            return { value: val.id, label: val.title };
          });
          // id==>title
          // console.log(this.data.unitid, '=====', res.data.data)
          if (this.data.unitid) {
            this.department = res.data.data.reduce((acc, c) => {
              if (c.id === this.data.unitid) acc = c.title;
              return acc;
            }, "");
          } else {
            return null;
          }
        }
      });
    },
    changeprofile() {
      this.data.id = this.$auth.user().id;
      if (!this.data.birth) this.data.birth = "1996-06-06";
      // 用户头像
      // console.log(this.data)
      // var formData = new FormData()
      // for (const key in this.data) {
      //   formData.append(key, this.data[key])
      // }
      // formData.append('avatar', this.$refs.fileuper.files[0])
      // 用户头像结束
      this.v$.data.$touch();
      if (!this.v$.data.$error) {
        this.loading = true;
        // console.log('formData:', formData)
        this.$api.post("/profile/updateMyProfile/", this.data).then((res) => {
          // console.log(res)
          if (res.data.success === true) {
            this.loading = false;
            this.$zglobal.showMessage(
              "positive",
              "center",
              this.$t("auth.users.profile.success")
            );
            this.getmyprofile();
          } else {
            this.loading = false;
            this.$zglobal.showMessage(
              "red-5",
              "center",
              this.$t("auth.register.invalid_data") + ":" + res.data.code
            );
          }
        });
        this.loading = false;
      }
      this.Duserprfile = false;
    },
    modiprfile() {
      this.Duserprfile = true;
    },
    // 文件上传
    checkFileSize(files) {
      return files.filter((file) => file.size < 20480000);
    },
    uploadFile() {
      this.DaddFiles = true;
      this.data.files = [];
    },
    upfilished(info) {
      // console.log(info)
      this.data.files.push(info.files[0].name);
      this.changeprofile();
      this.DaddFiles = false;
    },
  },
  validations: {
    data: {},
  },
};
</script>
<style scoped>
.userprile-list {
  margin: 20px auto;
  width: 100%;
  max-width: 260px;
}
.userprile-work {
  margin: 20px auto;
  width: 100%;
  max-width: 650px;
}
.userprile-header {
  width: 100%;
}
.chart-profile {
  margin: 20px auto;
  width: 550px;
}
</style>
