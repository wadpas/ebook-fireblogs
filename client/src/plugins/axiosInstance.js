import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api/v1',
})

axiosInstance.interceptors.request.use(
	(config) => {
		const localToken = JSON.parse(localStorage.getItem('token')) || ''
		config.headers.authorization = `Bearer ${localToken}`
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosInstance
