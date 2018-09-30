export default {
  state: {
    userAccount: null
  },
  reducers: {
    setUserAccount(state, payload) {
      return {userAccount: payload}
    }
  },
  effects: (dispatch) => ({
    async login(payload, rootState) {
      try {
        const {firstName, password} = rootState
        const result = await fetch('http://localhost:8181', {
          method: 'POST',
          body: {
            firstName,
            password
          }
        });
      } catch(err) {
        console.log(err)
      }
    },
    async signup(payload, rootState) {
      try {
        const {firstName, password} = rootState
        const result = await fetch('http://localhost:8181', {
          method: 'POST',
          body: {
            firstName,
            password
          }
        });
      } catch(err) {
        console.log(err)
      }
    }
  })
}
