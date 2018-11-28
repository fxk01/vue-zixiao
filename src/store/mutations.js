export const mutations = {
  searchFormation(state, json) {
    state.searchData = [...json.res.data];
  },
  writeAnswerMutations(state, json) {
    state.answerEchoContent = json.data.content;
  }
};
