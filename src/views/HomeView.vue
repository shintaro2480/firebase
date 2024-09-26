<template>
  <div>
    <h1>Slack Clone</h1>
    <p>ログイン中</p>
    <div>
      <button class="py-1 px-4 bg-gray-800 text-white rounded" @click="signOut">サインアウト</button>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"; // 必要な関数をインポート

export default {
  methods: {
    async signOut() {
      const auth = getAuth(); // Firebase Authのインスタンスを取得
      try {
        await signOut(auth); // サインアウトを実行
        this.$router.push("/signin"); // サインアウト後にサインインページへリダイレクト
      } catch (error) {
        console.error("Error during sign out:", error); // エラーハンドリング
      }
    }
  }
};
</script>
