<template>
  <div class="flex h-screen">

    <div class="w-1.5/5 bg-gray-800 text-white pt-3 px-4">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl leading-tight">Slack Clone</h1>
        <Notification />
      </div>

      <div class="flex items-center">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <span class="opacity-50">{{ user.email }}</span>
      </div>

      <div class="mt-5 flex justify-between items-center">
        <div class="font-bold opacity-50 text-lg">チャンネル</div>
        <PlusCircle />
      </div>

      <!-- dataをもとにループをv-forで回す -->
      <div
        class="opacity-50 mt-1 text-left"
        v-for="channel in channels"
        :key="channel.id"
      ># {{ channel.channel_name }}</div>

      <div class="mt-5 flex justify-between items-center">
        <div class="font-bold opacity-50 text-lg">ダイレクトメッセージ</div>
        <PlusCircle />
      </div>
      <div class="mt-2 flex items-center" v-for="user in users" :key="user.user_id">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <span class="opacity-50">{{ user.email }}</span>
      </div>

    </div>
    <div class="flex-grow bg-gray-100">
      <header class="border-b">
        <div class="flex justify-between m-3">
          <div class="font-bold text-lg">{{ user.email}}</div>
          <div>
            <button class="py-1 px-4 bg-gray-800 text-white rounded hover:bg-gray-700" @click="signOut">サインアウト</button>
          </div>
        </div>
      </header>
      <p>ログイン中</p>
      <div>
        <button class="py-1 px-4 bg-gray-800 text-white rounded">サインアウト</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"; // 必要な関数をインポート
import Notification from "../components/icons/NotificationIcon";
import PlusCircle from "../components/icons/PlusCircleIcon";

export default {
  data() {
    return {
      user: "",
      users: [
        {
          user_id: 11,
          email: "john@example.com"
        },
        {
          user_id: 12,
          email: "kevin@test.com"
        },
        {
          user_id: 13,
          email: "susan@test.com"
        }
      ],
      channels: [
        {
          id: 1,
          channel_name: "営業"
        },
        {
          id: 2,
          channel_name: "マーケティング"
        },
        {
          id: 3,
          channel_name: "情シス"
        }
      ]
    }
  },
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
  },
  components: {
    Notification,
    PlusCircle
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
    console.log(this.user);
  }

};
</script>
