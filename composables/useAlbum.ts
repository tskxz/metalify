import {ref, onMounted} from "vue"

export function useAlbum(albumId: number){
	const album = ref(null);

	const fetchAlbum = async () => {
		try {
			const res = await fetch(`/api/albums/${albumId}`)
			const data = await res.json()
			
			if(Array.isArray(data) && data.length > 0){
				album.value = data[0]
				console.log(album.value)
			} else {
				console.error("Dados do album nao encootrado")
			}
		} catch(e) {
			console.error("Erro ao carregar album:", e)
		}
	}

	onMounted(fetchAlbum)
	return {album}
}