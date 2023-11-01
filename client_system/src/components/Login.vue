

<template>
  <div>
    <div
      class="text-sm flex justify-center font-medium text-center text-gray-500"
    >
      <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
          <a
            href="#"
            @click="active = !active"
            :class="{ 'text-blue-600 border-blue-600 ': active }"
            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-blue-300"
            >Войти</a
          >
        </li>
        <li class="mr-2">
          <a
            href="#"
            :class="{ 'text-blue-600 border-blue-600 ': !active }"
            @click="active = !active"
            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-blue-300"
            aria-current="page"
            >Зарегистрироваться</a
          >
        </li>
      </ul>
    </div>
    <div
      v-if="active"
      class="flex my-1 flex-col items-center mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Вход в систему
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Логин</label
              >
              <input
                v-model="login"
                type="text"
                name=""
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@etu.ru"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Пароль</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              type="submit"
              @submit="sendData()"
              class="w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500">
              Нет аккаунта?
              <a
                href="#"
                @click="active = !active"
                class="font-medium text-primary-600 hover:text-gray-900"
                >Зарегистрируйтесь</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
    <div
      v-if="!active"
      class="flex my-1 flex-col items-center mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Регистрация
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Имя</label
              >
              <input
                v-model="name"
                type="text"
                name=""
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Иван"
                required
              />
            </div>
            <div>
              <label
                for="lastname"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Фамилия</label
              >
              <input
                v-model="lastname"
                type="text"
                name=""
                id="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Иванов"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Логин</label
              >
              <input
                v-model="login"
                type="text"
                name=""
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@etu.ru"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Пароль</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              type="submit"
              @submit="registration()"
              class="w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { loginUser, createUser } from "../hooks/useUser";
import { toast } from "vue3-toastify";
import { useUserStore } from "../stores/userStore";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();

const active = ref(false);
let login = ref<String>("");
let password = ref<String>("");
let name = ref<String>("");
let lastname = ref<String>("");

const sendData = async () => {
  const logUser = {
    username: login.value,
    password: password.value,
  };
  const result = await loginUser(logUser);
  if (result.status === 200) {
    // localStorage.setItem("jwt", result.data.jwt);
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 14);

    // Формируем строку куки
    let cookieValue =
      "jwt=" +
      result.data.jwt +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
    let cookieName =
      "name=" +
      result.data.name +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
    let cookieRole =
      "role=" +
      result.data.role +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";

    // Устанавливаем куки
    document.cookie = cookieValue;
    document.cookie = cookieName;
    document.cookie = cookieRole;
    router.push("/");
    userStore.setUserData(result.data.role, result.data.name);
  } else {
    toast.error(`${result.response.data.message}`, {
      autoClose: 3000,
    });
  }
  login.value = "";
  password.value = "";
};

const registration = async () => {
  const newUser = {
    username: login.value,
    password: password.value,
    name: name.value,
    lastname: lastname.value,
  };

  const result = await createUser(newUser);
  if (result.role) {
    toast.success(`Пользователь успешно создан`, {
      autoClose: 3000,
    });
  } else {
    toast.error(`Не удалось создать пользователя`, {
      autoClose: 3000,
    });
  }
};
</script>

<style scoped>
</style>