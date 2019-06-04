import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     questionsType:[],  // 题目类型列表
     departments:[],    // 科室列表
     papers:[],         // 试卷列表
     testListScroll:0,  // 移动端试卷列表滚动高度标记
  },
  getters:{

  },
  mutations: {
     setQuestionsType (state,data=[]) {
        state.questionsType=data;
     },
     setDepartments (state,data=[]) {
        state.departments=data;
     },
     setPapers (state,data=[]){
        state.papers=data;
     },
     setTestListScroll (state,data=0) {
        state.testListScroll=data;
     }
  },
  actions: {
      setQuestionsType ({commit},data=[]) {
          commit('setQuestionsType',data);
      },
      setDepartments ({commit},data=[]) {
          commit('setDepartments',data);
      },
      setPapers ({commit},data=[]) {
          commit('setPapers',data);
      },
      setTestListScroll ({commit},data=0) {
          commit('setTestListScroll',data);
      }

  }
})
