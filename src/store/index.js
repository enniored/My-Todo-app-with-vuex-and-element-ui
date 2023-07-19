import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  titleState: true,
  isLoading: true,
  matters: "",
  data: [],
  showSelectors: false,
  id: 0,
  title: ["All", " Todo", " completed"],
  page: "All",
  cc: null,
};
const actions = {
  loading(store) {
    setTimeout(() => {
      store.commit("loader");
    }, 2000);
  },
  blur(store) {
    setTimeout(() => {
      store.commit("changeVis", "blur");
    }, 200);
  }
};
const mutations = {
  changeVis(state, event) {
    state.titleState = event !== "write";
  },
  loader(state) {
    state.isLoading = false;
  },
  submit(state, val) {
    state.isWriting = !state.isWriting;
    state.matters = val;
    state.data.push({
      text: state.matters,
      isFinish: false,
      selected: false,
      id: state.matters + state.id
    });
    state.id++;
  },
  updated(state, arr) {
    if (state.page === " completed") {
      state.data.map(value => value.selected = value.isFinish)
    } else {
      state.data.map((item) => {
        if (arr.length === 0) {
          item.selected = false;
        } else if (arr.length === state.data.length) {
          item.selected = true;
        } else {
          item.selected = arr.some((value) => item.id === value.id);
        }
      });
    }
  },
  changeSelectors(state) {
    if (!state.showSelectors) {
      state.showSelectors = true;
    } else {
      const selectedRows = state.data.filter((value) => !value.selected);
      state.showSelectors = false;
      if (selectedRows.length > 0) {
        state.data = selectedRows;
      } else {
        state.data = [];
      }
    }
  },
  done(state, row) {
    state.data.forEach((item) => {
      if (item.id === row.id) {
        item.isFinish = !item.isFinish;
      }
    });
  },
  siftPage(state, now) {
    if (now !== undefined) {
      state.page = now;
    }
  }
};
const getters = {
  datas(state) {
    if (state.page === "All") {
      return state.data;
    } else if (state.page === " Todo") {
      return state.data.filter((value) => value.isFinish === false);
    } else {
      return state.data.filter((value) => value.isFinish === true);
    }
  }
};
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
