<template>
  <q-page>
<div class="row justify-center items-center">
    <div class="column q-gutter-y-md   justify-center items-center col-xs-12 col-sm-8 col-md-6" >
        <!-- <q-footer reveal elevated>
        <q-toolbar>

          <q-toolbar-title>
            <strong>Quasar</strong> Framework
          </q-toolbar-title>
          
        </q-toolbar>
      </q-footer> -->
<!-- 粘性 -->



    <div class="shadow-1 justify-center items-center" style="max-width: auto; width: 100%">
        <div style="margin: 10px;"><strong><h4 > {{ activity }}</h4> </strong> </div>
                <div>
                     <q-item clickable v-ripple>
                    <q-item-section side>
                        <q-avatar rounded size="48px" style="padding: 0px;">
                        <img src="https://cdn.quasar.dev/img/avatar.png" />
                        <q-badge floating color="teal">new</q-badge>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section >
                        <q-item-label caption style="padding: 0px;">Hosted by</q-item-label>
                        <q-item-label style="padding: 0px;">Mary</q-item-label>
                    </q-item-section>
                    </q-item> 
                 </div> 
    </div>

    <q-separator />

    <div class=" q-px-lg q-pt-sm justify-center items-center" style="max-width: auto; width: 100%"> 
        <q-separator />
        <div>举办内容:xxxxxxxxxxxxxxxxx</div>
        <div>举办方式:XXXXXXXXXXXXXXXXX</div>
        <div>小组内容:xxxxxxxxxxxxxxxxx</div>
        <div>具体内容:xxxxxxxxxxxxxxxxx</div>
        <q-separator />
    </div> 
    
        <q-separator />
        <div class=" q-px-lg q-pt-lg justify-center items-center" style="max-width: auto; width: 100%">Attendees(n) 
            
            <q-virtual-scroll
                :items="heavyList"
                virtual-scroll-horizontal
                v-slot="{ item, index }"
                virtual-scroll-slice-size="30"
                > 
                                           
                            <!-- <q-card style="width: 300px;"
                                        :key="index">
                            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"  >
                                <div class="absolute-bottom text-h6">
                                {{item.title}}
                                </div>
                            </q-img>
                            <q-card-section>
                                {{ lorem }}
                            </q-card-section>
                            </q-card> -->

                            <q-card
                                class="my-card2"
                                style="margin: 5px"
                                :key="index"
                            >
                                                <q-card-section horizontal>
                                                    <q-img
                                                        class="col-5"
                                                        src="https://cdn.quasar.dev/img/parallax1.jpg"
                                                    />

                                                    <q-card-section>
                                                        {{ item.title }}
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

        <div class=" q-px-lg q-pt-lg justify-center items-center" style="max-width: auto; width: 100%"> Photos(n) 
                    <div>
                            
                            <q-card class="my-card" >
                                <q-card-section>
                                    {{ lorem }}
                                </q-card-section>
                            </q-card>

                    </div>
                        <p style="text-align:right;">
                            <a href="">
                                更多
                            </a>
                        </p>
        </div>

        <div class="col q-px-lg q-pt-lg justify-center items-center" style="max-width: auto; width: 100%">
                <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">group name</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat>更多活动</q-btn>
                    <q-btn flat>小组信息</q-btn>
                </q-card-actions>
                </q-card>
        </div>
        <q-separator />
        <div class="q-px-lg q-pt-lg justify-center items-center" style="max-width: auto; width: 100%">
            similar evnets nearby
                        <q-virtual-scroll
                            :items="heavyList"
                            virtual-scroll-horizontal
                            > 
                            <q-card
                                class="my-card2"
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
      </div>
    </div>   

</q-page>
 



</template>

<script>
const maxSize = 5
const heavyList = []
for (let i = 0; i < maxSize; i++){
heavyList.push({title:"test"});
}
export default {
    data(){
        return{
            activity:"这是活动名",
           

        }
    },
    setup(){
        return{
            heavyList,
            lorem: ' laboris nisi ut aliquip ex ea commodo consequat.'
        }
    }
}
</script>

<style lang="sass" scoped>

// .column > div
//   padding: 10px 15px
.my-card
  width: 100%
.my-card1
    width: 30%
    height: 95%
    .my-card2
        width: 100px
        height: 100px
</style>