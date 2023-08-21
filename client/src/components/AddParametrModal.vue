<template>
  <div>
    <button class="btn m-3" onclick="my_modal_1.showModal()">Добавить параметр</button>
    <dialog id="my_modal_1" class="modal modal-top-sm">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h2 class="text-2xl mb-3">Добавьте пациента</h2>
        <input type="text" placeholder="Введите название параметра" v-model="parametrName" class="input input-bordered w-full my-3 max-w-xs" />
        <div class="join">
          <div>
            <div>
              <input class="input input-bordered join-item input-sm" v-model="parametrMin" placeholder="минимум"/>
            </div>
          </div>
          <div>
            <div>
              <input class="input input-bordered join-item input-sm" v-model="parametrMax" placeholder="максимум"/>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button type="button" class="btn btn-primary" @click="saveChanges">Добавить</button>
          <button class="btn">Close</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import usePostParametr from '@/hooks/usePostParametr';

export default {
  name: 'add-parmetr-modal',
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
  return {
    };
  },
  methods: {
    async saveChanges() {
      const newParam = {
        parametrName: this.parametrName,
        parametrMin: this.parametrMin,
        parametrMax: this.parametrMax
      };
      console.log(newParam);
      usePostParametr(newParam)
    }
  },

}
</script>

<style>

</style>