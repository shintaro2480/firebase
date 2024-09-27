<template>
  <div class="flex h-screen">

    <div class="w-1.5/5 bg-gray-800 text-white pt-3 px-4">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl leading-tight">Slack Clone</h1>
        <Notification />
      </div>

      <div class="flex items-center">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <span class="opacity-50">{{ channel_name }}</span>
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
      <div class="mt-2 flex items-center cursor-pointer" v-for="user in users" :key="user.user_id">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <span class="opacity-50" @click="directMessage(user)">{{ user.email }}</span>
      </div>

    </div>
    <div class="flex-grow bg-gray-100">
      <header class="border-b">
        <div class="flex justify-between m-3">
          <div class="font-bold text-lg">{{ user.email }}</div>
          <div>
            <button class="py-1 px-4 bg-gray-800 text-white rounded hover:bg-gray-700" @click="signOut">サインアウト</button>
          </div>
        </div>
      </header>

      <div class="mt-2 mb-4 flex" v-for="message in messages" :key="message.key">
        <Avator :user="message.user" />
        <div class="ml-2 text-left">
          <div class="font-bold">{{ message.user }}</div>
          <div>{{ message.content }}</div>
        </div>
      </div>

      <main class="overflow-y-scroll flex-grow">
        <div class="flex flex-col ml-6 h-full">
          <div class="flex-grow overflow-y-scroll">
            <p>メッセージ一覧</p>
          </div>

          <!--
          <div class="loop-test">testtesttest
            <div v-for="(message) in messages" :key="message.key">
              <p><strong>User:</strong> {{ message.user }}</p>
              <p><strong>Message:</strong> {{ message.content }}</p>
              <p><strong>Created At:</strong> {{ formatDate(message.createdAt) }}</p>
              <hr />
            </div>
          </div>
          -->

          <div class="border border-gray-900 rounded mb-4">
            <textarea :placeholder="placeholder" v-model="message" class="w-full pt-4 pl-8 outline-none"></textarea>
            <div class="bg-gray-100 p-2">
              <button @click="sendMessage" class="bg-green-900 text-sm text-white font-bold py-1 px-2 rounded">送信</button>
            </div>
          </div>
        </div>
      </main> 


<!--
      <p>ログイン中</p>
      <div>
        <button class="py-1 px-4 bg-gray-800 text-white rounded">サインアウト</button>
      </div>
-->
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"; // 必要な関数をインポート
import Notification from "../components/icons/NotificationIcon";
import PlusCircle from "../components/icons/PlusCircleIcon";
import Avator from "../components/parts/AvatorPart";

//ユーザー一覧取得用
import { getDatabase, ref, onChildAdded, off, onValue,
  push, set, serverTimestamp} from "firebase/database"; // FirebaseのDatabase関連の関数を個別にインポート
//import { Mounted } from 'vue'; // Vueのライフサイクルフックをインポート

export default {
  data() {
    return {
      user: "",
      users: [],
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
      ],
      channel_id: "",
      channel_name: '',
      message: "",
      messages: [], //プライベートな会話のやりとり
      messagesObject : [],
      placeholder: ""
    }
  },
  methods: {
    formatDate(date) {
      // 日付のフォーマット処理
      return new Date(date).toLocaleDateString(); // 任意のフォーマットに調整
    },
    async signOut() {
      const auth = getAuth(); // Firebase Authのインスタンスを取得
      try {
        await signOut(auth); // サインアウトを実行
        this.$router.push("/signin"); // サインアウト後にサインインページへリダイレクト
      } catch (error) {
        console.error("Error during sign out:", error); // エラーハンドリング
      }
    },
    directMessage(user) {
  // messages配列を初期化
  this.messages = [];

  // 2人のユーザーIDから一意のchannel_idを作成
  this.user.uid > user.user_id
    ? (this.channel_id = this.user.uid + "-" + user.user_id)
    : (this.channel_id = user.user_id + "-" + this.user.uid);

  // UI設定
  this.channel_name = user.email;
  this.placeholder = this.email + "へのメッセージ";

  // Firebase Realtime Databaseの参照を作成
  const db = getDatabase();
  const messagesRef = ref(db, `messages/${this.channel_id}`);

  // データ取得処理
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      // オブジェクトを配列に変換して、messagesにセット
      this.messages = Object.keys(data).map(key => {
        return {
          key: key, // メッセージのキー（FirebaseのプッシュID）
          ...data[key] // 各メッセージの内容を展開
        };
      });
    }
    console.log(JSON.stringify(this.messages));
  })
    },
    sendMessage() {
      const db = getDatabase(); // データベースのインスタンスを取得
      const newMessageRef = ref(db, `messages/${this.channel_id}`); // チャンネルIDの参照を作成
      const newMessage = push(newMessageRef); // 新しいメッセージの参照を作成

      const key_id = newMessage.key; // 新しいメッセージのキーを取得

      // 新しいメッセージをデータベースに保存
      set(newMessage, {
        key: key_id,
        content: this.message,
        user: this.user.email,
        createdAt: serverTimestamp() // サーバーのタイムスタンプを使用
      });

      this.message = ""; // メッセージをクリア
    },

  },
  components: {
    Notification,
    PlusCircle,
    Avator 
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
    console.log(this.user);

    // Firebase Realtime Databaseのインスタンスを取得
    const db = getDatabase();
    const usersRef = ref(db, 'users'); // 'users'ノードへの参照を作成

    // 'child_added'イベントをリッスン
    onChildAdded(usersRef, (snapshot) => {
      this.users.push(snapshot.val()); // 取得したユーザー情報を配列に追加
    });

  },
  beforeUnmount() { // Vue 3では `beforeUnmount` が `beforeDestroy` の代わり
    const db = getDatabase();
    const usersRef = ref(db, 'users'); // 'users'ノードの参照を作成
    off(usersRef); // リスナーを解除
  }

};
</script>
