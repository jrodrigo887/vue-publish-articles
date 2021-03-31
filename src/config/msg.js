import Vue from 'vue'
import VueToast from 'vue-toasted'

Vue.use(VueToast, {
    iconPack:'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ?  'Operação realizada com sucesso!' : payload.msg,
    {type: 'success', icon: 'check'}
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops Erro inesperado.' : payload.msg,
    {type: 'error', icon: 'time'}
)