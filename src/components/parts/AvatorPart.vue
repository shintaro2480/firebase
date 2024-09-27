
<template>
    <div>
        <img :src="avator_url" class="rounded" />
    </div>
</template>
  
<script>
  export default {
    name: "AvatorPart", //他のコンポーネントから呼び出すために、名前を定義してexportしないといけない。
    props: ["user"], //userという文字列を、親から受け取れることにする。
    computed: {
      avator_url() {
        return "https://i.pravatar.cc/50?u=" + this.user;
      }
    }
  };
</script>