import {ref, onMounted} from "vue"
import {useFetch} from "#app"

export function useSongs(albumId: number){
	const songs = ref([])

	const fetchSongs = async() => {
		try {
			const res = await fetch(`/api/songs?albumId=${albumId}`)
			let data = await res.json()

			songs.value = data
		} catch (err) {
			console.error("Erro ao carregar songs: ", err)
		}
	}

	onMounted(fetchSongs)
	return {songs, fetchSongs}
}