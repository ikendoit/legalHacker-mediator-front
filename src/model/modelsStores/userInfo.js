export default {
  state: {
    userAccount: null,
    userSchedule: null
  },
  reducers: {
    setUserAccount(state, payload) {
      return {userAccount: payload}
    },
    setUserSchedule(state, payload) {
      return {userSchedule: payload}
    }
  },
  effects: (dispatch) => ({
    async login(payload, rootState) {
    },
    async signup(payload, rootState) {
    }
  })
}
