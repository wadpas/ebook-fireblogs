import { createApp } from 'vue'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import AppDate from './components/AppDate.vue'
import PostList from './components/PostList.vue'
import PostEditor from './components/PostEditor.vue'
import ForumView from './views/ForumView.vue'
import ThreadList from './components/ThreadList.vue'
import ForumList from './components/ForumList.vue'

createApp(App)
	.use(store)
	.use(router)
	.component('AppDate', AppDate)
	.component('PostList', PostList)
	.component('PostEditor', PostEditor)
	.component('ForumView', ForumView)
	.component('ThreadList', ThreadList)
	.component('ForumList', ForumList)
	.mount('#app')
