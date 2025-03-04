import {ref, onMounted} from "vue"

export function useBands(genre?: string){
  const bands = ref([])

  const fetchBands = async () => {
    try {
      const res = await fetch("api/bands", {
        method: "GET",
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