/**
 * 公共类
 */

export default {
  data () {
    return {

    }
  },
  methods: {
    scrollToTop(number = 0, time) {
      if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
      }
      const spacingTime = 20;
      let spacingINex = time / spacingTime;
      let nowTop = document.body.scrollTop + document.documentElement.scrollTop;
      let everTop = (number - nowTop) / spacingINex;
      let scrollTimer = setInterval(() => {
        if (spacingINex > 0) {
          spacingINex--;
          this.scrollToTop(nowTop += everTop);
        } else {
          clearInterval(scrollTimer);
        }
      }, spacingTime);
    }
  }
};
