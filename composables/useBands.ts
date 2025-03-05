import {ref, onMounted} from "vue"
import {useAuthStore} from "@/stores/auth"
import {storeToRefs} from "pinia"

export function useBands(genre?: string){
  const authStore = useAuthStore()
  const { username, userID } = storeToRefs(authStore);

  authStore.loadUserFromLocalStorage();
  const bands = ref([])

  onMounted(() => {

    if (typeof window !== "undefined") {
      userID.value = localStorage.getItem("userID");
    }
  });

  const fetchBands = async () => {
    try {
      const res = await fetch(`api/bands/user/${userID.value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao carregar bandas");
      }

      let data = await res.json();

      if(genre){
        data = data.filter((band) => band.genre === genre)
      }

      bands.value = data;
      
    } catch(err) {
      console.error("Erro ao carregar bandas: ", err);
    }
  }

  onMounted(fetchBands);

  return {bands, fetchBands}
}