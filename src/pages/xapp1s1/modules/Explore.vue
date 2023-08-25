<template>
    <q-page>
        <q-input
            v-model="searchParams.nameOrDescription"
            debounce="500"
            filled
            outlined
            :placeholder="this.$t('xapp1s1.activate.search')"
            @change="searchActivates"
        >
            <template v-slot:append>
                <q-icon name="search" />
            </template>
        </q-input>
        <q-separator />

        <q-separator />

        <div class="row justify-center">
            <div
                class="q-gutter-sm column justify-center items-center col-xs-12 col-sm-8 col-md-6"
            >
                <!-- <div class="row justify-center q-gutter-sm "> -->
                <!-- <q-intersection v-for="index in 10" :key="index" class="example-item">
          <q-card class="q-ma-sm" style="width: 15vh">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />

            <q-card-section>
              <div class="text-h6">Card #{{ index }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </q-intersection> -->
                <!-- </div> -->

                
                <div class="q-gutter-y-md">
                    <strong
                        ><h5>
                            {{ message }} near the {{ localplace }}
                        </h5></strong
                    >
                </div>

                <div class="q-gutter-y-md" style="max-width: auto; width: 100%">
                    <q-card class="no-shadow">
                        <q-tabs
                            v-model="tab"
                            dense
                            class="text-grey"
                            active-color="primary"
                            indicator-color="primary"
                            align=""
                            narrow-indicator
                        >
                            <q-tab
                                name="Events"
                                label="Events"
                                @click="changemessage1"
                            />
                            <q-tab
                                name="Groups"
                                label="Groups"
                                @click="changemessage2"
                            />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels
                            v-model="tab"
                            animated
                            style="margin: 0px"
                        >
                            <q-tab-panel name="Events">
                                <q-virtual-scroll
                                    :items="heavyList"
                                    virtual-scroll-horizontal
                                >
                                    <q-btn-dropdown
                                        label="1"
                                        class="unelevated"
                                        style="
                                            background-color: silver;
                                            margin: 5px;
                                            margin-bottom: 15px;
                                        "
                                        unelevated
                                        rounded
                                        v-for="index in 3"
                                        :key="index"
                                    >
                                        <q-list>
                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Photos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Videos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Articles</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-btn-dropdown>

                                    <q-btn-dropdown
                                        label="3"
                                        style="
                                            background-color: darkslategray;
                                            margin: 5px;
                                            margin-bottom: 15px;
                                        "
                                        unelevated
                                        rounded
                                    >
                                        <q-list>
                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Photos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Videos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Articles</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-btn-dropdown>

                                    <q-btn
                                        color="white"
                                        text-color="black"
                                        label="reset filters"
                                        unelevated
                                        dense
                                        rounded
                                        no-caps
                                    />
                                </q-virtual-scroll>

                                <q-separator />

                                <div class="q-py-sm">
                                    <q-infinite-scroll
                                        @load="onLoad"
                                        :offset="250"
                                    >
                                        <div
                                            v-for="index in 5"
                                            :key="index"
                                            class="example-item"
                                        >
                                            <q-card
                                                class="my-card"
                                                style="margin: 5px"
                                            >
                                                <q-card-section horizontal>
                                                    <q-img
                                                        class="col-5"
                                                        src="https://cdn.quasar.dev/img/parallax1.jpg"
                                                    />

                                                    <q-card-section>
                                                        {{ lorem }}
                                                    </q-card-section>
                                                </q-card-section>

                                                <q-separator />

                                                <q-card-actions>
                                                    <q-btn
                                                        flat
                                                        round
                                                        icon="event"
                                                    />
                                                    <q-btn flat> 5:30PM </q-btn>
                                                    <q-btn flat> 7:00PM </q-btn>
                                                    <q-btn flat color="primary" @click=" ChangeToActivityDisplay">
                                                        Reserve
                                                    </q-btn>
                                                </q-card-actions>
                                            </q-card>
                                        </div>
                                        <template v-slot:loading>
                                            <div
                                                class="row justify-center q-my-md"
                                            >
                                                <q-spinner-dots
                                                    color="primary"
                                                    size="40px"
                                                />
                                            </div>
                                        </template>
                                    </q-infinite-scroll>
                                </div>
                            </q-tab-panel>

                            <q-tab-panel name="Groups">
                                <q-virtual-scroll
                                    :items="heavyList"
                                    virtual-scroll-horizontal
                                >
                                    <q-btn-dropdown
                                        label="1"
                                        class="unelevated"
                                        style="
                                            background-color: silver;
                                            margin: 5px;
                                            margin-bottom: 15px;
                                        "
                                        unelevated
                                        rounded
                                        v-for="index in 3"
                                        :key="index"
                                    >
                                        <q-list>
                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Photos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Videos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Articles</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-btn-dropdown>

                                    <q-btn-dropdown
                                        label="3"
                                        style="
                                            background-color: darkslategray;
                                            margin: 5px;
                                            margin-bottom: 15px;
                                        "
                                        unelevated
                                        rounded
                                    >
                                        <q-list>
                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Photos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Videos</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>

                                            <q-item
                                                clickable
                                                v-close-popup
                                                @click="onItemClick"
                                            >
                                                <q-item-section>
                                                    <q-item-label
                                                        >Articles</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-btn-dropdown>
                                    <q-btn
                                        color="white"
                                        text-color="black"
                                        label="reset filters"
                                        unelevated
                                        dense
                                        rounded
                                        no-caps
                                    />
                                </q-virtual-scroll>

                                <q-separator />

                                <div class="q-py-sm">
                                    <q-infinite-scroll
                                        @load="onLoad"
                                        :offset="10"
                                    >
                                        <div
                                            v-for="index in 10"
                                            :key="index"
                                            class="caption"
                                        >
                                            <q-card
                                                class="my-card"
                                                style="margin: 5px"
                                            >
                                                <q-card-section horizontal>
                                                    <q-img
                                                        class="col-5"
                                                        src="https://cdn.quasar.dev/img/parallax1.jpg"
                                                    />

                                                    <q-card-section>
                                                        {{ lorem }}
                                                    </q-card-section>
                                                </q-card-section>

                                                <q-separator />

                                                <q-card-actions>
                                                    <q-btn
                                                        flat
                                                        round
                                                        icon="event"
                                                    />
                                                    <q-btn flat> 5:30PM </q-btn>
                                                    <q-btn flat> 7:00PM </q-btn>
                                                    <q-btn
                                                        flat
                                                        color="primary"
                                                        @click="
                                                           ChangeToGroupDisplay
                                                        "
                                                    >
                                                        Reserve
                                                    </q-btn>
                                                </q-card-actions>
                                            </q-card>
                                        </div>
                                        <template v-slot:loading>
                                            <div
                                                class="row justify-center q-my-md"
                                            >
                                                <q-spinner-dots
                                                    color="primary"
                                                    size="40px"
                                                />
                                            </div>
                                        </template>
                                    </q-infinite-scroll>
                                </div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </div>
            </div>

            <!-- <div class="col-xs-12 col-sm-6 col-md-2 q-pl-md">这里是地图Image</div> -->
        </div>
    </q-page>
</template>

<script>
import { ref } from "vue";
import ActivityDemoVue from "./ActivityDisplay.vue";
// 水平滚动
const heavyList = [];

heavyList.push({});

export default {
    name: "Explore",

    setup() {
        // 无限滚动的scipt
        const items = ref([{}, {}, {}, {}, {}, {}, {}]);
        return {
            //选项面板的scipt
            tab: ref("Events"),
            items,
            heavyList,
            onLoad(index, done) {
                setTimeout(() => {
                    items.value.push({}, {}, {}, {}, {}, {}, {});
                    done();
                }, 2000);
            },
            //card内的文字
            lorem: "活动介绍",
        };
    },

    mounted() {
        this.$api.post("/xapp1s1/activates").then((res) => {
            console.log(res);
        });
    },
    data() {
        return {
            message: "Events",
            localplace: "localplace",
            searchParams: {
                nameOrDescription: null,
            },
            listActivates: [],
        };
    },
    methods: {
        searchActivates() {
            this.$api
                .post("/xapp1s1/activates/searchFitActivates", {
                    searchParams: this.searchParams,
                })
                .then((res) => {
                    if (res.data.success) {
                        this.listActivates = res.data.data;
                        console.log("Seached : ", this.listActivates);
                    } else {
                    }
                });
        },
        changemessage1() {
            return (this.message = "Events");
        },
        changemessage2() {
            return (this.message = "Groups");
        },
        ChangeToActivityDisplay() {
            
            this.$router.push('/user/xapp1s1ActivityDisplay');
        },
        ChangeToGroupDisplay(){
            this.$router.push('/user/xapp1s1GroupDisplay')
        },
    },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto
</style>

Overline
