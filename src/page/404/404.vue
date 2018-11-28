<template>
  <div class="page">
    <div class="error">
      <h1 class="header">
        <a href="/#/walk" class="logo">
          资晓
        </a>
        - 404
      </h1>
      <div class="content">
        <p>
          <strong>你似乎来到了没有知识存在的荒原…</strong>
        </p>
        <p>来源链接是否正确？用户、话题或问题是否存在？</p>
        <hr>
        <p>
          <a href="/#/walk">返回首页</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.error {
  margin: 169px auto 0;
  width: 404px;

  .header {
    overflow: hidden;
    font-size: 1.8em;
    line-height: 1.2;
    margin: 0 0 .33em .33em;
  }

  .content {
    padding: 2em 1.25em;
    border: 1px solid #babbbc;
    border-radius: 5px;
    background: #f7f7f7;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: #105cb6;
  }

  p {
    margin: 0 0 1.7em;
    color: #999;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-size: 1.1em;
    color: #000;
  }
}
</style>
<script>
  export default{
    data() {
      return {
      }
    },

    methods: {

    }

  }
</script>
