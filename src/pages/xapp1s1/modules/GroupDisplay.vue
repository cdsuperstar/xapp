<template>
    <div class="row justify-center items-center">
    <div class="column q-gutter-y-md   justify-center  col-xs-12 col-sm-8 col-md-6" >
<!-- 顶部 固定-->
<!-- Group的图片展示 -->
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom text-subtitle2 text-center">
          Title
        </div>
      </q-img>
    </q-card>
    <div class="text-left" style="padding: 10px;">
        <div class="text-bold" style="font-size: xx-large;">
            小组名
        </div>
<!-- Group相关介绍 -->
        <div class="text-weight-thin">
            <q-icon name="font_download" /> 地址：
            <br>
            <q-icon name="font_download" /> 成员数量：
            <br>
            <q-icon name="font_download" /> 创始人：    
        </div>
<!--Group分享  -->
        <div class="text-bold" style="font-size: medium;">
            <br>
            分享: <q-btn round color="primary" icon="shopping_cart" size="8px" unelevated style="margin: 5px;"/>
            <q-btn round color="primary" icon="shopping_cart" size="8px" unelevated style="margin: 5px;"/>
            <q-btn round color="primary" icon="shopping_cart" size="8px" unelevated style="margin: 5px;"/>
            <q-btn round color="primary" icon="shopping_cart" size="8px" unelevated style="margin: 5px;"/>
        </div>
<!--Group的参加  -->
    </div>
    <br>
    <div class="q-mx-md text-justify">
            <q-btn style="background: #FF0080; color: white ;width: 80%; margin-right: 10px;" label="参加该小组" rounded/>
            <q-btn style="background: #FF0080; color: white" label="更多" rounded/>
    </div>
<!-- 顶部 固定 -->
    <q-separator />
<div class=" q-gutter-y-md   " style="width: 100%;">
    <q-card class="no-shadow">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="center"
          narrow-indicator
        
          >
<!-- 虚拟滚动 选项按钮   -->
            <q-virtual-scroll
                :items="heavyList"
                virtual-scroll-horizontal
                v-slot="{ item, index }"
                :key="index"
            >
        <!-- item的内容无法用在label上 QAQ 只能用空的item -->
        {{ item}}
          <q-tab name="about" label= "小组内容" class="q-mb-xl"/>
          <q-tab name="events" label="活动内容" class="q-mb-xl"/>
          <q-tab name="members" label="小组成员" class="q-mb-xl"/>
          <q-tab name="photos" label="照片" class="q-mb-xl"/>
          <q-tab name="discussions" label="讨论内容" class="q-mb-xl"/>
          <q-tab name="more" label="更多" class="q-mb-xl"/>
          {{ item}}
        </q-virtual-scroll>
        </q-tabs>

<!-- 选项面板 -->
        <q-tab-panels v-model="tab" animated style="background-color: rgb(238, 238, 238);">
<!-- 小组的详情内容 -->
          <q-tab-panel name="about">
            <div class="text-bold" style="font-size: large;">我们的目标</div>
            <br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br>

            <!-- 即将举办的活动 虚拟滚动-->
            <div class=" q-pt-lg justify-center items-center" style="width: 100%;">
                <div class="text-bold " style="font-size: large;">即将举办的活动</div>
                        <q-virtual-scroll
                            :items="heavyList1"
                            virtual-scroll-horizontal
                            > 
                            <q-card
                            class="shadow-1"
                                style="margin: 5px; max-width: 300px;"
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
                                                    >
                                                        Reserve
                                                    </q-btn>
                                                </q-card-actions>
                            </q-card>                                          
                        </q-virtual-scroll>
            <p style="text-align:right;">
            <a href="">
                更多
            </a>
            </p>
            </div>
            <!--组织者  -->
            <div class="text-bold" style="font-size: large;">
                组织者
            </div>
           
                    <q-card class="my-card" >
                        <q-card-section>
                            {{ lorem }}
                        </q-card-section>
                    </q-card>
            
            <!-- 成员 -->
            <div class="text-bold" style="font-size: large;">
                成员
            </div>

                    <q-card class="my-card" >
                        <q-card-section>
                            {{ lorem }}
                        </q-card-section>
                    </q-card>
            
                    <p style="text-align:right;">
                        <a href="">
                             更多
                        </a>
                    </p>
            <!-- 相关话题 点击相关话题后 跳转到搜索界面 且搜索相关内容 -->
            <div>
                相关话题
            </div>
            <q-btn flat color="primary q-mx-sm  " style="background-color: white;" label="Flat" outline v-for="index in 3" :key="index"/>

            <!-- 附近的活动 虚拟滚动 -->
            <div class=" q-pt-lg justify-center items-center" style="width: 100%;">
                <div class="text-bold" style="font-size: large;">附近的活动</div>
                        <q-virtual-scroll
                            :items="heavyList1"
                            virtual-scroll-horizontal
                            > 
                            <q-card
                            class="shadow-1"
                                style="margin: 5px; max-width: 300px;"
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
                                                    >
                                                        Reserve
                                                    </q-btn>
                                                </q-card-actions>
                            </q-card>                                          
                        </q-virtual-scroll>
            <p style="text-align:right;">
            <a href="">
                更多
            </a>
            </p>
            </div>




          </q-tab-panel>


<!-- 小组举办的活动 -->
          <!-- 未完成选项名称动态变化 -->
          <q-tab-panel name="events">
                    <div>
                    <q-btn-dropdown label="活动" style="color:black;"  unelevated ripple=false outline class="q-mb-md">
                    <q-list>
                    <q-tabs
                                    v-model="tab1"
                                    dense
                                    class="text-grey"
                                    active-color="primary"
                                    indicator-color="primary"
                                    align="center"
                                    narrow-indicator
                                    >
                            
                        <q-item clickable v-close-popup >
                        <q-item-section>
                            <q-tab name="upcoming" label= "即将到来" class="q-my-xs" style="color: rgb(0, 136, 136);"/>
                            <q-tab name="past" label= "已经过去" class="q-my-xs" style="color: rgb(0, 136, 136);"/>
                        </q-item-section>
                        </q-item>
                    </q-tabs>
                    </q-list>
                    </q-btn-dropdown>


                    <q-separator />



                        <q-tab-panels v-model="tab1" animated style="background-color: rgb(238, 238, 238);">
                        
                            <q-tab-panel name="upcoming">
                            <q-card
                            class="shadow-1"
                                style="margin: 5px; max-width: 100%;"
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
                                                    >
                                                        Reserve
                                                    </q-btn>
                                                </q-card-actions>
                            </q-card>              
                            </q-tab-panel>

                            <q-tab-panel name="past">
                                <q-card
                            class="shadow-1"
                                style="margin: 5px; max-width: 100%;"
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
                                                    >
                                                        Reserve
                                                    </q-btn>
                                                </q-card-actions>
                            </q-card>              
                            </q-tab-panel>
                        </q-tab-panels>
                </div>
          </q-tab-panel>

          <q-tab-panel name="members">
            <!-- 成员筛选和搜索 -->
            <!-- 按成员姓名，成员职位，加入小组的时间顺序，搜索-->
            <div>

                
                <q-btn-dropdown label="成员列表" style="color:black;" unelevated ripple=false outline class="q-mb-md">
                    <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>
                                        所有人(2)
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>
                                        领导团队(1)
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>

              
                <q-input outlined v-model="text" :dense="dense">
                    <template v-slot:prepend>
                    <q-icon name="search" />
                    </template>
                </q-input>
            </div>
<!-- 小组成员卡片展示 -->
                <q-item clickable v-ripple >
                <q-item-section side>
                    <q-avatar rounded size="48px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                    <!-- <q-badge floating color="teal">new</q-badge> -->
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Mary</q-item-label>
                    <q-item-label caption>于xxx时间加入该小组</q-item-label>
                </q-item-section>
                <!-- <q-item-section side>
                    3 min ago
                </q-item-section> -->
                </q-item>

          </q-tab-panel>
<!--小组图片展示-->

          <q-tab-panel name="photos">
            <div class="text-bold" style="font-size: medium;"> 
                照片集
            </div>
            <br>
            
                <q-card class="my-card">
                <img src="https://cdn.quasar.dev/img/mountains.jpg">

                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ lorem }}
                </q-card-section>
                </q-card>


          </q-tab-panel>
<!-- 小组讨论 -->
    <!-- 暂时未完成文本居中 -->
          <q-tab-panel name="discussions">
            <div class="text-bold" style="font-size: large;">讨论</div>
            <q-card style="width: 100%;height: 100px ;background-color: rgb(231, 231, 231);align-items: center" class="no-shadow ">
                <div class="text-center text-weight-thin " >暂时没有讨论</div>
            </q-card>

            <q-card class="q-my-sm">
            <q-card-section>
                {{ lorem }}
            </q-card-section>
            </q-card>


          </q-tab-panel>
<!-- 个人用户给小组留言 -->
    <!--跳转页面 到输入界面 未完成  -->
          <q-tab-panel name="more">
            <div class="text-h6">更多</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      </div>
    </div>
    </div>
</template>

<script>
import { ref } from 'vue'
const maxSize = 1
const maxSize1 = 3
const heavyList = []
const heavyList1 = []
for (let i = 0; i < maxSize; i++) {
  heavyList.push(
  "")
}
for (let i = 0; i < maxSize1; i++) {
  heavyList1.push(
  "")
}

export default {
  setup () {
    return {
        tab: ref('about'),
        tab1:ref('upcoming'),
        heavyList,
        heavyList1,  
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script> 

<style lang="sass" scoped>
.my-card
  width: 100%
  shadow-1
</style>