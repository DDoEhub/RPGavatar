function meteo(){
    const meteo = document.createElement("img");

    meteo.setAttribute("alt", "meteo")
    meteo.setAttribute("src", "./src/img/meteo1.png")

    meteo.style.left = `${(Math.random() * 90) - 5}rem`;
    meteo.style.top = `0rem`
    gamePage.appendChild(meteo)

    setInterval((e) => {
        let Y = parseInt(meteo.style.top);
        meteo.style.top = `${Y + 1}rem`
    }, 100);
    setTimeout((e) => {
        meteo.remove()
    }, 5000)
}

function playerLocation(element, X, Y) {
    if ( X < 0 || 65 < X ) {
        return;
    } else if ( X !== 0 && Y !== 0 ) {
        element.setAttribute("data-left", `${X}rem`);
        element.style.left = element.dataset.left;
        element.setAttribute("data-top", `${Y}rem`);
        element.style.top = element.dataset.top;
    } else if( Y === 0 ){
        element.setAttribute("data-left", `${X}rem`);
        element.style.left = element.dataset.left;
    } else if( X === 0 ){
        element.setAttribute("data-top", `${Y}rem`);
        element.style.top = element.dataset.top;
    }
}

function createPlayer() {
    const player = document.createElement("div");
    player.setAttribute("alt", "player");
    playerLocation(player, 32.5, 30); /* first location */

    for (let i in thisMan.look) {
        const make = document.createElement("img");
        make.setAttribute("alt", `${i}`);
        make.setAttribute("src", thisMan.look[i]);
        player.appendChild(make);
    }

    const name = document.createElement("p");
    name.innerHTML = `${thisMan.name}`;
    player.appendChild(name);

    gamePage.appendChild(player);
}

function movePlayer(event) {
    const character = gamePage.querySelector("div[alt=player]");
    let X = parseFloat(character.dataset.left)
    let Y = parseFloat(character.dataset.top)
    event.shiftKey

    if (event.key === "ArrowLeft") {
        if (event.shiftKey) {
            X = X - 12;
        } else {
            X = X - 2;
        }
        playerLocation(character, X, 0)
        character.classList.remove("turn");
    } else if (event.key === "ArrowRight") {
        if (event.shiftKey) {
            X = X + 12;
        } else {
            X = X + 2;
        }
        playerLocation(character, X, 0)
        character.classList.add("turn");
    };
}