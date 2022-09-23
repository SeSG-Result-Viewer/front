import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   archive_csv: "",
   archive_txt: "",
  },
  
  getters: {
  },

  mutations: {
    update_csv(state, file) {
      state.archive_csv = file;
      // console.log(this.state.update_csv)
    },
    update_txt(state, file) {
      state.archive_txt = file;
      // console.log(this.state.update_txt)
    }
  },

  actions: {
  },

  modules: {
  }
})
