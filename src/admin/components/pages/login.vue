<template lang="pug">
  .login
    .login__content
      form.login__form(@submit.prevent="login")
        .login__form-title Авторизация
        button.login__form-close
        .login__row
          app-input(
            title="Логин"
            icon="user"
            v-model="user.name"
            :errorText="validation.firstError('user.name')"
          )
        .login__row
          app-input(
            title="Пароль"
            icon="key"
            type="password"
            v-model="user.password"
            :errorText="validation.firstError('user.password')"
          )
        .login__btn
          button(
            type="submit"
            :disabled="disableSubmit"
          ).login__send-data Отправить
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { setToken, setAuthHttpHeaderToAxios } from "@/helpers/token.js";
import axiosInstance from "@/requests.js";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": value => {
      return Validator.value(value).required("Введите пароль");
    }
  },
  components: {
    appInput: () => import("components/input.vue")
  },
  data() {
    return {
      disableSubmit: false,
      user: {
        name: "lk032019",
        password: "ryssia123"
      }
    };
  },
  computed: {
    ...mapGetters("user", ["userIsLogged"])
  },
  methods: {
    ...mapActions("user", ["loginUser"]),
    ...mapActions("tooltips", ["showTooltip"]),
    async login() {
      if ((await this.$validate()) === false) return;
      this.disableSubmit = true;
      try {
        const response = await this.loginUser(this.user);
        const token = response.data.token;
        setToken(token);
        setAuthHttpHeaderToAxios(axiosInstance, token);

        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          type: "error",
          text: error.message
        });
      } finally {
        this.disableSubmit = false;
        this.validation.reset();
      }
    }
  }
};
</script>

<style lang="postcss">
@import "../../../styles/mixins.pcss";
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~images/bg/admin.jpg") center center / cover no-repeat;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background: $text-color;
  }
}

.login__form-title {
  font-size: 36px;
  text-align: center;
  font-weight: 600;
}

.login__content {
  position: relative;

  @include phones {
    height: 100%;
    width: 100%;
  }
}

.login__row {
  margin-bottom: 35px;
}

.login__btn {
  display: flex;
  width: 100%;
  padding: 0 8%;
  justify-content: center;
}

.login__send-data {
  width: 100%;
  padding: 30px;
  background-image: linear-gradient(to right, #ad00ed, #5500f2);
  border-radius: 40px 0 40px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;

  &[disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}

.login__form {
  width: 563px;
  padding: 50px 77px 60px;
  background: #fff;

  @include phones {
    width: 100%;
    padding-right: 7%;
    padding-left: 7%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>


