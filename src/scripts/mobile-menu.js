import Vue from 'vue';
import { runInThisContext } from 'vm';

new Vue ({
    el: "#burger-component",
    template: "#burger-menu",
    methods: {
        handleMenu() {
            var menu = document.querySelector('.header__menu');
            var menuBtn = document.querySelector('.burger-menu');
            menu.classList.toggle('open');
            menuBtn.classList.toggle('open');
        }
    }
})