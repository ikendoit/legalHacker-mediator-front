import { init } from '@rematch/core'
import * as models from './index'

const store = init({
	name: 'data',
	models,
})

export const { dispatch, getState } = store
export default store
