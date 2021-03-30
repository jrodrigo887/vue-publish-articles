import Vue from 'vue'

export const baseUrl = 'https://localhost:5001/api'

export function showError(e) {
    if (e && e.reponse && e.reponse.data) {
        Vue.toasted.global.defaultError({msg : e.reponse.data})

    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({msg : e})
    } else {
        Vue.toasted.global.defaultError()
    }
}