import { ref, onMounted } from "vue";

export function useBand(bandId: number) {
  const band = ref(null);

  const fetchBand = async () => {
    try {
      const res = await fetch(`/api/bands/${bandId}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        band.value = data[0];
      } else {
        console.error("Dados da banda não encontrados");
      }
    } catch (err) {
      console.error("Erro ao carregar banda:", err);
    }
  };

  onMounted(fetchBand);

  return { band };
}
