export const getters = {
  gettersSearch: state => {
    return {
      gettersSearch: state.searchData,
    }
  },
  gettersAnswerContent: state => {
    return {
      gettersAnswer: state.answerEchoContent,
    }
  },
};
