<template>
  <div class="q-pa-md" align="center">
    <span style="color: #9c9c9c">温馨提示：已阅消息将于30天后自动清理</span>
    <div class="row items-start q-gutter-md">
      <q-card flat style="margin-left: 6px">
        <q-card-section style="padding: 1px">
          <q-tabs
            v-model="tab"
            :switch-indicator="$q.screen.gt.xs ? true : false"
            class="text-secondary"
            :vertical="$q.screen.gt.xs ? true : false"
          >
            <q-tab name="AllMsg" icon="notifications" label="全部消息">
              <q-badge
                color="warning"
                floating
                align="middle"
                outline
                style="right: -8px"
                >40</q-badge
              >
            </q-tab>
            <q-tab name="Sysmsg" icon="record_voice_over" label="系统消息">
              <q-badge
                color="warning"
                floating
                outline
                align="middle"
                style="right: -8px"
                >15</q-badge
              >
            </q-tab>
            <q-tab name="UserMsg" icon="mail_outline" label="用户消息">
              <q-badge
                color="warning"
                floating
                outline
                align="middle"
                style="right: -8px"
                >20</q-badge
              >
            </q-tab>
            <q-tab name="SerMsg" icon="room_service" label="服务消息">
              <q-badge
                color="warning"
                floating
                outline
                align="middle"
                style="right: -8px"
                >5</q-badge
              >
            </q-tab>
          </q-tabs>
        </q-card-section>
      </q-card>
      <q-card flat style="max-width: 800px">
        <q-tab-panels
          v-model="tab"
          animated
          class="text-left"
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="AllMsg">
            <q-timeline
              :layout="!$q.screen.gt.xs ? 'dense' : 'comfortable'"
              side="right"
              color="secondary"
            >
              <!--          <q-timeline-entry heading class="text-left"-->
              <!--            ><font size="5">消息列表</font></q-timeline-entry-->
              <!--          >-->
              <q-timeline-entry
                class="text-left"
                title="XXX模块消息"
                subtitle="2020年4月22日 16：37"
                side="left"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              >
                <q-item v-ripple clickable>
                  <q-item-section>
                    关于聘任2020年度教学督导督查组成员的通知-各单位（部门）内部收文处理笺
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-item-section>
                </q-item>
              </q-timeline-entry>
              <q-timeline-entry
                class="text-left"
                title="XXX模块消息"
                subtitle="2020年4月22日 16：37"
                side="left"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              >
                <q-item v-ripple clickable>
                  <q-item-section>
                    关于聘任2020年度教学督导督查组成员的通知-各单位（部门）内部收文处理笺
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-item-section>
                </q-item>
              </q-timeline-entry>
              <q-timeline-entry
                class="text-left"
                title="XXX模块消息"
                subtitle="2020年4月22日 16：37"
                side="left"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              >
                <q-item v-ripple clickable>
                  <q-item-section>
                    关于聘任2020年度教学督导督查组成员的通知-各单位（部门）内部收文处理笺
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-item-section>
                </q-item>
              </q-timeline-entry>
              <q-timeline-entry
                class="text-left"
                title="XXX模块消息"
                subtitle="2020年4月22日 16：37"
                side="left"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              >
                <q-item v-ripple clickable>
                  <q-item-section>
                    关于聘任2020年度教学督导督查组成员的通知-各单位（部门）内部收文处理笺
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-item-section>
                </q-item>
              </q-timeline-entry>
            </q-timeline>
          </q-tab-panel>

          <q-tab-panel name="Sysmsg">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>

          <q-tab-panel name="UserMsg">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<style></style>

<script>
import { format } from "quasar";
export default {
  name: "Message",
  data() {
    return {
      splitterModel: 20,
      tab: "mails",
    };
  },
  created() {
    const { pad } = format;

    // (String) pad(String toPad, Number length, String paddingCharacter)
    // length默认是2
    // paddingCharacter默认是'0'
    console.log(pad("2", 4));
    // '0002'

    const { humanStorageSize } = format;

    console.log(humanStorageSize(13087));
    // 12.78 kB
  },
};
</script>

<style scoped>
.q-tab {
  padding: 0 14px;
}
</style>
