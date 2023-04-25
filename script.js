const form = document.querySelector('form')
const result = document.querySelector('.result')
const boardgame= document.querySelector(".boardgame")
const detail= document.querySelector(".detail")

form.addEventListener('input', (event) => {
    event.preventDefault();
    
    getInfosAPI(boardgame)
})


function getInfosAPI(boardgame){
    const result = document.querySelector('.result')

    fetch("https://api.boardgameatlas.com/api/search?name="+boardgame.value+"&client_id=JLBr5npPhV&limit=10")
    .then((response) => response.json())
    .then((data) => {
        const arr = data.games
        result.innerHTML = " "
       

       arr.forEach((game) => {
       //console.log(game.handle)
        result.innerHTML += "<option>" + game.handle + "</option>"
       })

        
     })
        
     .catch((error) => result.innerHTML = error)
}


function getInfos(selectedGame){
    const detail= document.querySelector(".detail")
    
    fetch("https://api.boardgameatlas.com/api/search?name="+selectedGame+"&client_id=JLBr5npPhV&limit=1&exact=true")  
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        
        detail.innerHTML = "<h2>" + data.games[0].name + "</h2>"
        detail.innerHTML += "<p> De " +data.games[0].min_players + " à " + data.games[0].max_players + " joueurs </p>"
        detail.innerHTML += data.games[0].description
        detail.innerHTML += "<img src="+data.games[0].images.medium+"><img>" 
})
.catch((error) => detail.innerHTML = error)
}

result.addEventListener("change", () => {
    const selectedGame = result.value;
    console.log(result.value)
    getInfos(selectedGame)
});