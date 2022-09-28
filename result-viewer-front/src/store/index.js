import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    archive_csv_name: "",
    archive_csv: "",
    archive_txt_name: "",
    archive_txt: ""
  },
  
  getters: {
    
  },

  mutations: {
    update_csv(state, file) {
      state.archive_csv = file;
      // console.log(this.state.archive_csv)
    },

    update_csv_name(state, csv_name) {
      state.archive_csv_name = csv_name;
      // console.log(this.state.archive_csv_name)
    },

    update_txt(state, file) {
      state.archive_txt = file;
      // console.log(this.state.archive_txt)
    },

    update_txt_name(state, txt_name) {
      state.archive_txt_name = txt_name;
      // console.log(this.state.archive_txt_name)
    },
  },

  actions: {
  },

  modules: {
  }
})
