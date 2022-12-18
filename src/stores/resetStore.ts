import cloneDeep from 'lodash.clonedeep'
import { Store } from 'pinia'

export function resetStore({ store: storeToReset }: { store: Store }) {
    const initialState = cloneDeep(storeToReset.$state)
    storeToReset.$reset = () => storeToReset.$patch(cloneDeep(initialState))
}