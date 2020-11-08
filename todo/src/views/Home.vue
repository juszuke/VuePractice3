<template>
  <div>
    <label v-for="label in options" :key="label.value">
      <input type="radio"
        v-model="current"
        :value="label.value">{{ label.label }}
    </label>

    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in computedTodos"
          :key="item.id"
          :class="{done:item.state}">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <button v-on:click="CHANGE_STATE(item.id)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <button v-on:click="DELETE_TODO(item.id)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>新規タスクの追加</h2>
    <form class="add-form" v-on:submit.prevent="createTask">
      コメント <input type="text" ref="comment">
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  data() {
    return {
      current: -1
    }
  },
  computed: {
    ...mapState([
      'todos',
      'options',
      'sequence'
    ]),

    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },

    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  },

  methods: {
    ...mapActions([
      types.ADD_TODO,
      types.CHANGE_STATE,
      types.DELETE_TODO
    ]),
    createTask () {
      var comment = this.$refs.comment
      let item = {
        comment: comment.value
      }
      this.$store.dispatch(types.ADD_TODO, item.comment)
      comment.value = ''
    }
  }
}
</script>
