import Vue from 'vue'
import Vuex from 'vuex'

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
    addTodo (state, comment) {
      const item = {
        id: state.sequence,
        comment: comment,
        state: 0
      }
      state.todos.push(item);
      state.sequence++;
    },
    changeState (state, id) {
      const index = state.todos.findIndex(item => item.id === id);
      if (state.todos[index].state === 0) {
        state.todos[index].state = 1
      } else if (state.todos[index].state === 1) {
        state.todos[index].state = 0
      }
    },
    deleteTodo (state, id) {
      const index = state.todos.findIndex(task => task.id === id);
      state.todos.splice(index, 1);
    }
  },
  
  actions: {
    addTodo ({ commit }, comment) {
      commit ('addTodo', comment)
    },
    changeState ({ commit }, id) {
      commit ('changeState', id)
    },
    deleteTodo ({ commit }, id) {
      commit ('deleteTodo', id)
    }
  }
})
