<template>
    <div class="row justify-center items-center">
        <div
            class="column q-gutter-y-md q-pa-md justify-center col-xs-12 col-sm-8 col-md-6"
        >
            <q-btn
                text-color="black"
                label="<-- 返回活动"
                style="width: 35%"
                unelevated
                dense
                size="15px"
                outline
                @click="goBack"
            />
            <div>
                <q-card style="width: 100%" class="no-shadow">
                    <div class="text-black q-pa-sm">
                        <div
                            class="text-bold"
                            style="font-size: xx-large; margin-bottom: 10px"
                        >
                            你要去！
                        </div>
                        <!-- 占位图片 -->
                        <!-- <q-card class="q-pa-sm no-shadow"> -->
                        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                            <div
                                class="absolute-bottom text-subtitle2 text-center"
                            >
                                Title
                            </div>
                        </q-img>
                        <!-- </q-card> -->
                    </div>

                    <div align="around" class="text-left q-pa-md">
                        <div style="font-size: large" class="text-bold">
                            活动名称:{{ active.name }}
                        </div>
                        <div class="text-weight-light">
                            <q-icon name="font_download" /> 活动时间:{{
                                active.timebegin
                            }}
                        </div>
                    </div>
                    <div class="text-center">
                        <q-btn
                            flat
                            style="
                                width: 100%;
                                background-color: rgb(39, 121, 121);
                            "
                            color="white"
                            rounded
                            >添加到日历</q-btn
                        >
                    </div>
                    <div class="text-center q-pa-md">
                        <q-btn outline style="width: 40%" class="q-mr-sm"
                            >进入聊天室</q-btn
                        >
                        <q-btn outline style="width: 40%" class="q-ml-sm"
                            >分享</q-btn
                        >
                    </div>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: JSON.parse(this.$route.query.active),
        };
    },
    methods: {
        goBack() {
            history.back();
        },
    },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 400px
</style>

Our C
