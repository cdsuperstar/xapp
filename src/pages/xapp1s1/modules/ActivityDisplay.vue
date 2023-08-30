<template>
    <q-page>
        <div class="row justify-center items-center">
            <div
                class="column q-gutter-y-md justify-center items-center col-xs-12 col-sm-8 col-md-6"
                style="background-color: rgb(238, 238, 238)"
            >
                <!-- 活动名字及部分内容 -->
                <div
                    class="justify-center items-center"
                    style="
                        max-width: auto;
                        width: 100%;
                        background-color: white;
                    "
                >
                    <div
                        class="text-bold"
                        style="font-size: xx-large; padding: 10px"
                    >
                        活动名:{{ aaa.active.name }}
                    </div>
                    <div>
                        <q-item clickable v-ripple>
                            <q-item-section side>
                                <q-avatar
                                    rounded
                                    size="48px"
                                    style="padding: 0px"
                                >
                                    <img
                                        src="https://cdn.quasar.dev/img/avatar.png"
                                    />
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label caption style="padding: 0px">
                                    主办方</q-item-label
                                >
                                <q-item-label style="padding: 0px">
                                    小组的ID:{{ aaa.active.xapp1s1shop_id }}
                                    <!-- <UserProfile :user_id="1"></UserProfile> -->
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                    <!-- </div> -->

                    <!-- 活动的具体内容-->

                    <!-- <div class="  q-pt-sm justify-center items-center shadow-1" style="max-width: auto; width: 100%;background-color: white;">  -->
                    <div style="margin: 15px">
                        <q-avatar
                            color="red"
                            text-color="white"
                            icon="directions"
                            size="sm"
                        />时间:{{ aaa.active.timebegin }}至{{
                            aaa.active.timeend
                        }}
                    </div>
                    <!-- <div style="margin: 15px; margin-bottom: 20px">
                        <q-avatar
                            color="red"
                            text-color="white"
                            icon="directions"
                            size="sm"
                        />举办方式:线上举办(数据库中暂无)
                    </div> -->
                    <div style="margin: 15px; margin-bottom: 20px">
                        <q-avatar
                            color="red"
                            text-color="white"
                            icon="directions"
                            size="sm"
                        />举办地点:{{ aaa.active.address }}
                    </div>
                    <q-separator />

                    <div class="text-center" style="margin: 15px">
                        <q-btn
                            style="
                                background: #ff0080;
                                color: white;
                                width: 80%;
                            "
                            @click="
                                ChangeToSignUp(this.aaa.active, this.aaa.id)
                            "
                            label="参加活动"
                            rounded
                        />
                    </div>

                    <q-separator />

                    <q-item clickable v-ripple style="margin-top: 15px">
                        <q-item-section side>
                            <q-avatar rounded size="48px">
                                <img
                                    src="https://cdn.quasar.dev/img/avatar.png"
                                />
                                <!-- <q-badge floating color="teal">new</q-badge> -->
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label
                                >小组名:{{
                                    aaa.active.xapp1s1shop_id
                                }}</q-item-label
                            >
                            <q-item-label caption
                                >有关小组更多信息</q-item-label
                            >
                        </q-item-section>
                    </q-item>

                    <q-card class="my-card no-shadow">
                        {{ aaa.active.media }}这里是上传的图片
                        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                            <div
                                class="absolute-bottom text-subtitle2 text-center"
                            >
                                Title
                            </div>
                        </q-img>
                    </q-card>
                    <div>
                        <!-- 此处写活动的具体内容 -->
                        <div class="text-center">
                            活动内容:{{ aaa.active.description }}
                        </div>
                    </div>
                </div>

                <q-separator />
                <!-- 参加者列表 -->
                <div
                    class="q-px-md q-pt-lg justify-center items-center"
                    style="max-width: auto; width: 100%"
                >
                    <div class="text-bold" style="font-size: large">
                        参加者({{ aaa.active.slot }})
                    </div>
                    <q-virtual-scroll
                        :items="heavyList"
                        virtual-scroll-horizontal
                        virtual-scroll-slice-size="30"
                        v-slot="{ items, index }"
                        :key="index"
                    >
                        <q-card
                            style="margin: 5px; max-width: 300px; height: 200px"
                            v-for="n in 10"
                            :key="n"
                        >
                            <q-item>
                                <q-item-section
                                    class="item-center justify-center"
                                >
                                    <img
                                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                                        style="width: 100%; height: 70px"
                                    />
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label class="text-center"
                                        >{{ items }} 成员名：{{ aaa.id }}
                                    </q-item-label>
                                    <q-item-label caption class="text-center"
                                        >成员职位</q-item-label
                                    >
                                </q-item-section>
                            </q-item>
                        </q-card>
                    </q-virtual-scroll>

                    <p style="text-align: right">
                        <a href=""> 更多 </a>
                    </p>
                </div>
                <!-- 图片列表 -->
                <div
                    class="q-px-md q-pt-lg justify-center items-center"
                    style="max-width: auto; width: 100%"
                >
                    <div class="text-bold" style="font-size: large">照片集</div>

                    <div>
                        <q-card class="my-card">
                            <q-img
                                src="https://cdn.quasar.dev/img/parallax2.jpg"
                            >
                                <div
                                    class="absolute-bottom text-subtitle2 text-center"
                                >
                                    Title
                                </div>
                            </q-img>
                        </q-card>
                    </div>
                    <p style="text-align: right">
                        <a href=""> 更多 </a>
                    </p>
                </div>
                <!-- 小组卡片 -->
                <div
                    class="q-pt-lg"
                    style="max-width: auto; width: 100%; margin-bottom: 30px"
                >
                    <q-card class="my-card no-shadow">
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h6">
                                小组名:{{ aaa.active.xapp1s1shop_id }}
                            </div>
                            <div class="text-subtitle2">组织者:某某</div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                            <q-btn
                                flat
                                @click="
                                    ChangeToGroupDisplay(
                                        aaa.active.xapp1s1shop_id
                                    )
                                "
                                >更多活动</q-btn
                            >
                            <q-btn
                                flat
                                @click="ChangeToGroupDisplay(xapp1s1shop_id)"
                                >小组信息</q-btn
                            >
                        </q-card-actions>
                    </q-card>
                </div>
                <q-separator />
                <div
                    class="q-px-md q-pt-lg justify-center items-center shadow-1"
                    style="max-width: auto; width: 100%"
                >
                    <div class="text-bold" style="font-size: large">
                        附近的活动
                    </div>
                    <q-virtual-scroll
                        :items="heavyList"
                        virtual-scroll-horizontal
                    >
                        <q-card class="my-card2" style="margin: 5px">
                            <q-card-section horizontal>
                                <q-img
                                    class="col-5"
                                    src="https://cdn.quasar.dev/img/parallax1.jpg"
                                />

                                <q-card-section>
                                    {{ lorem }}{{}}
                                </q-card-section>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions>
                                <q-btn flat round icon="event" />
                                <q-btn flat> 5:30PM </q-btn>
                                <q-btn flat> 7:00PM </q-btn>
                                <q-btn flat color="primary"> Reserve </q-btn>
                            </q-card-actions>
                        </q-card>
                    </q-virtual-scroll>
                    <p style="text-align: right">
                        <a href=""> 更多 </a>
                    </p>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
const heavyList = [];
heavyList.push({});
export default {
    data() {
        return {
            aaa: JSON.parse(this.$route.query.aaa),
            shop_id: "",
            myProfile: {},
            user_id: "",
        };
    },
    setup() {
        return {
            heavyList,
            lorem: "laboris nisi ut aliquip ex ea commodo consequat.",
        };
    },
    created() {
        this.$api.get("xapp1s1/profile/getMyProfile").then((res) => {
            if (res.data.success === true) {
                this.myProfile = res.data.data;
                //console.log(this.myProfile);
                this.user_id = this.myProfile.user_id;
                //console.log(this.user_id);
            }
        });
    },
    methods: {
        ChangeToGroupDisplay(e) {
            this.$router.push({
                path: "/user/xapp1s1GroupDisplay/",
                query: { id: JSON.stringify(e) },
            });
        },
        ChangeToSignUp(e, m) {
            this.$api
                .post("/xapp1s1/activates/signupTheActivate/" + m)
                .then((res) => {
                    if (res.data.success) {
                        this.$router.push({
                            path: "/user/xapp1s1SignUp/",
                            query: { active: JSON.stringify(e) },
                        });
                    } else {
                    }
                });
        },
    },
};
</script>

<style lang="sass" scoped>

// .column > div
//   padding: 10px 15px
.my-card
  width: 100%
  margin-top: 15px
.my-card1
    width: 30%
    height: 95%
    .my-card2
        width: 100px
        height: 100px
</style>
