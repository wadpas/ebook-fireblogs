import { createApp } from 'vue'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import AppDate from './components/AppDate.vue'
import PostList from './components/PostList.vue'
import PostEditor from './components/PostEditor.vue'
import ForumView from './views/ForumView.vue'
import ThreadList from './components/ThreadList.vue'

const app = createApp(App)
	.use(router)
	.component('AppDate', AppDate)
	.component('PostList', PostList)
	.component('PostEditor', PostEditor)
	.component('ForumView', ForumView)
	.component('ThreadList', ThreadList)
	.mount('#app')
