<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between p-4 border-b items-center">
      <h1 class="font-semibold text-xl leading-tight">Slack Clone</h1>
      <button class="py-1 px-4 border-2 border-green-800 rounded">
        <router-link to="/signin">サインイン</router-link>
      </button>
    </header>
    <div class="bg-gray-100 flex-auto">
      <div class="flex justify-center mt-16">
        <div class="w-2/5 border bg-white">
          <div class="my-12 text-center">
            <h2 class="text-4xl font-bold">ユーザの登録</h2>
            <p class="my-4">
              <span class="font-semibold">メールアドレス</span>と
              <span class="font-semibold">パスワード</span>を入力してください。
            </p>
            <form @submit.prevent="registerUser">
              <div class="mb-2">
                <input type="email" v-model="email" placeholder="you@example.com"
                  class="text-xl w-3/5 p-3 border rounded" />
              </div>
              <div class="mb-2">
                <input type="password" v-model="password" class="text-xl w-3/5 p-3 border rounded"
                  placeholder="パスワード" />
              </div>

              <!-- プロフィール画像のアップロード -->
<!--               <div class="mb-2">
                <input type="file" @change="handleFileChange" accept="image/*" class="text-xl w-3/5 p-3 border rounded" />
              </div>
            -->

              <div v-if="errors.length">
                <ul class="my-4">
                  <li
                    v-for="(error, index) in errors"
                    :key="index"
                    class="font-semibold text-red-700"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>

              <button type="submit" class="text-xl w-3/5 bg-green-800 text-white py-2 rounded">ユーザの登録</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { auth, storage } from "../firebase"; // firebase.jsからインポート
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebaseの新規ユーザ作成メソッドをインポート
//import { ref } from 'vue'; // Vue 3のrefをインポート
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      profileImage: null, // プロフィール画像を保存する変数
      errors: []
    };
  },
  methods: {

    async registerUser() {
      console.log(this.email);
      console.log(this.password);
      try {
        const response = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = response.user;
        
        console.log(user);

      // Realtime Databaseにユーザー情報を保存
      await set(ref(db, `users/${user.uid}`), {
        user_id: user.uid,
        email: user.email
      });

        this.$router.push("/");
      } catch (e) {
        console.log(e);
        if (e.code == "auth/email-already-in-use") {
          this.errors.push("入力したメールアドレスは登録済みです。");
        } else {
          this.errors.push("入力したメールアドレスかパスワードに問題があります。");
        }
      }
    }
  }
};
</script>
