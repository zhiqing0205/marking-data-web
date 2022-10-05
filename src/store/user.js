import Storage from '../utils/Storagehandle'

let TOKEN = 'token'
let USER_INFO = 'user_info'
let USER_NAME = 'user_name'

export default{
    state:{
        token: Storage.get(TOKEN) || '',
        userInfo: Storage.get(USER_INFO) || {},
		userName: Storage.get(USER_NAME) || '',
    },
    mutations:{
        setToken(state, val){
            state.token  = val
            Storage.set(TOKEN, val)
        },
        clearToken(state){
            state.token = ''
            Storage.remove(TOKEN)
        },
        getToken(state){
            state.token= state.token || Storage.get(TOKEN)
        },
        setUserInfo(state, val){
            state.userInfo = val
            Storage.set(USER_INFO,val)
        },
        clearUserInfo(state){
            state.userInfo = {}
            Storage.remove(USER_INFO)
        },
        getUserInfo(state) {
            state.userInfo = state.userInfo || Storage.get(USER_INFO)
        },
		setUserName(state, val){
			state.userName  = val
			Storage.set(USER_NAME, val)
		},
		clearUserName(state){
			state.userName = ''
			Storage.remove(USER_NAME)
		},
		getUserName(state){
			state.userName= state.userName || Storage.get(USER_NAME)
		},
    }
}