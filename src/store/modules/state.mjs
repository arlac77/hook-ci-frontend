
async getNodes() {
  try {
    const data = await fetch("api/state");
    return await data.json();
  } catch (e) {
    return [{
      name: "not connected",
      version: "unknown",
      platform: "unknown",
      uptime: 0,
      memory: { heapUsed: 0 }
    }];
  }
}

const state = {
  nodes: []
}

const getters = {}

const actions = {
  async getAllNodes ({ commit }) {
    commit('setNodes', await getNodes());
  }
};

const mutations = {
  setNodes (state, nodes) {
    state.nodes = nodes;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
