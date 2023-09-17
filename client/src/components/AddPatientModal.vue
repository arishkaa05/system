<!-- <template>
  <div>
    <button class="btn m-3" onclick="my_modal_4.showModal()">Добавить пациента</button>
    <dialog id="my_modal_4" class="modal modal-top-sm">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h2 class="text-2xl mb-3">Добавьте пациента</h2>
        <input type="text" placeholder="Иванов Иван Иванович" v-model="name" class="input input-bordered w-full my-3 max-w-xs" />
        <p v-if="isSubmit">Уникальный идентификатор: {{ uniqueId }}</p>
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
import { v4 as uuidv4 } from 'uuid';
import usePostPatient from "@/hooks/usePostPatient";

export default {

  name: 'add-area',
  components: {

  },
  computed: {
    uniqueId() {
      const uuid = uuidv4(); // Генерация уникального идентификатора
      console.log(uuid)
      return uuid;
    },
  },
  data() {
  return {
      isSubmit: false,
      name: '',
      name_area: '',
      formula_area: '',
      hash_area: '',
    };
  },
  methods: {
    async saveChanges() {
      let newPatient = {
        uq_people: this.uniqueId,
        first_name_people: this.name.split(' ')[0],
        last_name_people: this.name.split(' ')[1],
        fathert_name_people: this.name.split(' ')[2],
      }
      usePostPatient(newPatient)
      this.isSubmit = true;
      console.log(newPatient)
    },
  },

}
</script>

<style>

</style> -->