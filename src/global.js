import Vue from 'vue'


export const userKey = '__knowledge_user'
export const baseUrl = 'https://localhost:5001/api'

const verifyErros = (keys) => {

    Object.values(keys).map(vl => {

        vl.forEach(msg => {
            Vue.toasted.global.defaultError({ msg })
        })
    })
}



export function showError(e) {
    
    if (e && e.reponse && e.reponse.data) {   
        Vue.toasted.global.defaultError({msg : e.reponse.data})
        
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({msg : e})
    } else {
        const keys = e.response.data.errors;
        verifyErros(keys);
    }

}

export default {showError, baseUrl, userKey }

