<template>
    <div class="user-dropdown">
        <div class="user-bottom">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar  :email="user.email" alt="user" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <a href="#"> <i class="fa fa-cogs"></i>Administrador</a>
            <a href="#"> <i class="fa fa-sign-out"></i>Sair</a>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropDown',
    components: {
        Gravatar
    },
    computed: mapState(['user'])

}
</script>
<style>

.user-dropdown {
    position: relative;
    height: 100%;
}

.user-dropdown:hover {
    background-color: rgba(0, 0, 0, .2);
}

.user-bottom {
    display: flex;
    align-items: center;
    color: #fff;
    font-weight: 100;
    height: 100%;
    padding: 0px 20px;
}

.user-dropdown-img {
    margin: 0px 10px;
}

.user-dropdown-img > img {
    max-height: 32px;
    border-radius: 100%;
}

.user-dropdown-content {
    position: absolute;
    right: 0px;
    background-color: #f9f9f9;
    min-width: 170px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, .2);
    /* padding: 15px; */
    z-index: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown-content a {
    text-decoration: none;
    text-decoration-style: none;
    color: #000;
    padding: 12px 20px;
}

.user-dropdown-content i {
    margin-right: 6px;
}

.user-dropdown-content a:hover {
     text-decoration: none;
    text-decoration-style: none;
    color: #000;
    background-color: #ededed;
}

.user-dropdown:hover .user-dropdown-content {
    visibility: visible;
    opacity: 1;
    transition: visibility 1s, opacity 1 linear;

}


    
</style>