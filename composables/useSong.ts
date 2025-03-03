import {ref, onMounted} from "vue"
export function useSong(songId: number){
	const song = ref(null)

	const fetchSong = async () => {
		try {
			const res = await fetch(`/api/songs/${songId}`)
			const data = await res.json()

			if(Array.isArray(data) && data.length > 0){
				song.value = data[0]
			} else {
				console.error("Dados da musica nao encontrado")
			}
		} catch (error) {
			console.error("Erro ao carregar som: ", error)
		}
	}

	onMounted(fetchSong)
	return {song}
}