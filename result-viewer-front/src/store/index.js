import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    archive_csv_name: "",
    archive_csv: "",
    archive_csv_metrics: "",
    archive_txt_name: "",
    archive_txt: "",
    gs_size: "",
    upload_name: "",
  },

  mutations: {
    update_csv_name(state, csv_name) {
      state.archive_csv_name = csv_name;
      // console.log(this.state.archive_csv_name)
    },

    update_csv(state, file) {
      state.archive_csv = file;
      // console.log(this.state.archive_csv)
    },

    update_csv_metrics(state, file) {
      state.archive_csv_metrics = file;
      // console.log(this.state.archive_csv_metrics)
    },

    update_txt_name(state, txt_name) {
      state.archive_txt_name = txt_name;
      // console.log(this.state.archive_txt_name)
    },

    update_txt(state, file) {
      state.archive_txt = file;
      // console.log(this.state.archive_txt)
    },

    update_gs_size(state, gs_size) {
      state.gs_size = gs_size;
      // console.log(this.state.gs_size)
    },

    update_upload_name(state, upload_name) {
      state.upload_name = upload_name;
      // console.log(this.state.upload_name)
    },
  },
})
