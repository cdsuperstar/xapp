<template>
  <div class="ag-cell-with-height ag-cell-value cursor-pointer">
    <q-icon
      dense
      name="folder_open"
      class="text-grey-8"
      size="28px"
      style="padding-bottom: 3px"
    />
    <q-badge outline class="q-ml-xs" align="top" color="primary">
      {{
        typeof params.data[params.colDef.field] === "string"
          ? JSON.parse(params.data[params.colDef.field]).length
          : 0
      }}
    </q-badge>
    <q-popup-proxy dense>
      <q-list dense class="bg-white">
        <q-item-label
          v-if="typeof params.add === 'function'"
          header
          style="border-bottom: 1px dashed #ebebeb; padding: 8px"
          @click="addattach(params)"
        >
          <q-badge outline text-color="warning" style="cursor: pointer">
            <q-icon name="add" color="orange" class="q-ml-md" />
            &nbsp; ADDFILES &nbsp;
          </q-badge>
        </q-item-label>
        <div v-if="typeof params.data[params.colDef.field] === 'string'">
          <q-item
            v-for="f in JSON.parse(params.data[params.colDef.field])"
            :key="f.id"
            v-ripple
            clickable
            style="border-bottom: 1px dashed #ebebeb"
          >
            <q-item-section avatar top style="padding-right: 1px">
              <q-avatar
                icon="insert_drive_file"
                color="secondary"
                text-color="white"
                size="30px"
                style="margin-top: 3px"
              />
            </q-item-section>
            <q-item-section
              @click="downfile(params.data.id, f)"
              style="min-width: 100px"
            >
              <q-item-label lines="1" class="text-black">{{ f }}</q-item-label>
            </q-item-section>
            <q-item-section
              v-if="typeof params.del === 'function'"
              side
              style="cursor: pointer"
            >
              <q-icon
                name="cancel"
                color="grey-5"
                title="Del…"
                @click="deletefile(params.data.id, params.data, f)"
              />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-popup-proxy>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "AGattachmentCellRandervue",
  data() {},
  created() {
    // console.log(typeof this.params.del, '+++++++', this.params)
    // end
  },
  mounted() {},
  methods: {
    downfile(id, filename) {
      this.params.colDef.cellRendererParams.down(
        id,
        filename,
        this.params.colDef.field
      );
    },
    deletefile(id, data, filename) {
      this.params.colDef.cellRendererParams.del(id, data, filename);
    },
    addattach(data) {
      this.params.colDef.cellRendererParams.add(data);
    },
  },
});
</script>
