import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ],
    sequence: 1,
  },

  mutations: {
    [types.ADD_TODO] (state, comment) {
      const item = {
        id: state.sequence,
        comment: comment,
        state: 0
      }
      state.todos.push(item);
      state.sequence++;
    },
    [types.CHANGE_STATE] (state, id) {
      const index = state.todos.findIndex(item => item.id === id);
      if (state.todos[index].state === 0) {
        state.todos[index].state = 1
      } else if (state.todos[index].state === 1) {
        state.todos[index].state = 0
      }
    },
    [types.DELETE_TODO] (state, id) {
      const index = state.todos.findIndex(task => task.id === id);
      state.todos.splice(index, 1);
    }
  },
  
  actions: {
    [types.ADD_TODO] ({ commit }, comment) {
      commit (types.ADD_TODO, comment)
    },
    [types.CHANGE_STATE] ({ commit }, id) {
      commit (types.CHANGE_STATE, id)
    },
    [types.DELETE_TODO] ({ commit }, id) {
      commit (types.DELETE_TODO, id)
    }
  }
})
