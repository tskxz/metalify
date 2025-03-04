import {db} from "./index";
import {bands, albums, songs} from "./schema"

async function deleteData(){
	console.log("A apagar os dados...")
	await db.delete(songs)
	await db.delete(albums)
	await db.delete(bands)
	console.log("Dados apagados")
}

async function seed(){

	await deleteData()

	console.log("A iniciar os seeders...")

	const bandsData = [
		{
			id: 1,
			name: "Korn",
			genre: "Nu-Metal",
			imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e253b4c-9d15-41b0-91ae-819440c216d1/d3evldd-27efa750-95e3-4054-8080-4ff2f3dbde18.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBlMjUzYjRjLTlkMTUtNDFiMC05MWFlLTgxOTQ0MGMyMTZkMVwvZDNldmxkZC0yN2VmYTc1MC05NWUzLTQwNTQtODA4MC00ZmYyZjNkYmRlMTguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ncXCH0m28RP_WqYmjecT8ufabel0kG-fOGmCmswPshg"
		},
		{
			id: 2,
			name: "Slipknot",
			genre: "Nu-Metal",
			imageUrl: "https://blog.logomyway.com/wp-content/uploads/2021/07/slipknot-logo-2.jpg"
		},
		{
			id: 3,
			name: "Metallica",
			genre: "Thrash-Metal",
			imageUrl: "https://www.studsandspikes.com/media/catalog/product/cache/ac0a2306909b95a5b7078e2821ec5639/9/p/9pts22meta01_design.jpg"
		},
		{
			id: 4,
			name: "Linking Park",
			genre: "Nu-Metal",
			imageUrl: "https://band-logos.com/wp-content/uploads/2024/09/linkin-park-band-logo-symbol.png"
		}
	];

	await db.insert(bands).values(bandsData);
	console.log("Bandas inseridas");

	const albumsData = [
		{
	      id: 1,
	      title: "Follow the Leader",
	      bandId: 1,
	      imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/52/Korn_follow_the_leader.jpg",
	    },
	    {
	      id: 2,
	      title: "Iowa",
	      bandId: 2,
	      imageUrl: "https://upload.wikimedia.org/wikipedia/pt/3/3a/SlipknotIowaCapa.jpg",
	    },
	    {
	      id: 3,
	      title: "Master of Puppets",
	      bandId: 3,
	      imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg",
	    },
	    {
	    	id: 4,
	    	title: "Meteora",
	    	bandId: 4,
	    	imageUrl: "https://upload.wikimedia.org/wikipedia/pt/8/83/Linkin_park-meteora_a.jpg"

	    },
	    {
	    	id: 5,
	    	title: "Hybrid Theory",
	    	bandId: 4,
	    	imageUrl: "https://upload.wikimedia.org/wikipedia/pt/2/23/Linkin_Park_Hybrid_Theory.jpg"

	    },
	];

	await db.insert(albums).values(albumsData);
	console.log("Albums inseridos")
	const songsData = [
	    {
	      id: 1,
	      title: "Freak on a Leash",
	      albumId: 1,
	      bandId: 1,
	      youtubeUrl: "https://www.youtube.com/watch?v=jRGrNDV2mKc",
	    },
	    {
	      id: 2,
	      title: "Got the Life",
	      albumId: 1,
	      bandId: 1,
	      youtubeUrl: "https://www.youtube.com/watch?v=VAWjsVoDpm0",
	    },
	    {
	      id: 3,
	      title: "My Plague",
	      albumId: 2,
	      bandId: 2,
	      youtubeUrl: "https://www.youtube.com/watch?v=lRNYp1IiUuE",
	    },
	    {
	      id: 4,
	      title: "Disasterpiece",
	      albumId: 2,
	      bandId: 2,
	      youtubeUrl: "https://www.youtube.com/watch?v=TPSenKymLwk",
	    },
	    {
	      id: 5,
	      title: "Battery",
	      albumId: 3,
	      bandId: 3,
	      youtubeUrl: "https://www.youtube.com/watch?v=md3B3I7Nmvw",
	    },
	    {
	      id: 6,
	      title: "Master of Puppets",
	      albumId: 3,
	      bandId: 3,
	      youtubeUrl: "https://www.youtube.com/watch?v=E0ozmU9cJDg",
	    },
	    {
	    	id: 7,
	    	title: "Somewhere I Belong",
	    	albumId: 4,
	    	bandId: 4,
	    	youtubeUrl: "https://www.youtube.com/watch?v=zsCD5XCu6CM"
	    },
	    {
	    	id: 8,
	    	title: "Numb",
	    	albumId: 4,
	    	bandId: 4,
	    	youtubeUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU"
	    },
	    {
	    	id: 9,
	    	title: "In the End",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/eVTXPUF4Oz4"
	    },
	    {
	    	id: 10,
	    	title: "One Step Closer",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/4qlCC1GOwFw"
	    },
	    {
	    	id: 11,
	    	title: "Points of Authority",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/jZSPAp8kCl4?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 12,
	    	title: "A Place For My Head",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/3t2WkCudwfY?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 13,
	    	title: "Papercut",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/vjVkXlxsO8Q?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 14,
	    	title: "With You",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/M8UTS2iFXOo?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 15,
	    	title: "Crawling",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/Gd9OhYroLN0?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 16,
	    	title: "Runaway",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/ig-fyQqf510?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 17,
	    	title: "By Myself",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/ig-fyQqf510?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },
	    {
	    	id: 18,
	    	title: "Forgotten",
	    	albumId: 5,
	    	bandId: 4,
	    	youtubeUrl: "https://youtu.be/HNCgBuI2eJc?list=OLAK5uy_lSMQPNivp-Z7pyTLWNVS5Po6aXRFqYR7U"
	    },


  	];

  	await db.insert(songs).values(songsData);
  	console.log("Musicas inseridas!")

  	console.log("Seeders finalizado")

}

// usar --delete para apagar os dados
const args = process.argv.slice(2)
if(args.includes("--delete")){
	deleteData()
		.catch((err) => {
			console.error("Erro aoa apagar dados: ", err)
		})
		.finally(() => process.exit())
} else {
	seed().catch((err) => console.error("Erro ao rodar seeders:", err))
	.finally(() => process.exit());
}