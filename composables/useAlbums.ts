import {ref, onMounted} from "vue"
import {useFetch} from "#app"

export function useAlbums(bandId: number){
	const albums = ref([])

	const fetchAlbums = async() => {
		try {
			const res = await fetch(
		`/api/albums?bandId=${bandId}`)
			let data = await res.json();

			albums.value = data
		} catch(err){
			console.error("Erro ao carregar albuns: ", err)
		}
	}

	onMounted(fetchAlbums)

	return {albums, fetchAlbums}
}