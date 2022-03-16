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

    if (event.key === "ArrowLeft") {
        X = X - 4;
        playerLocation(character, X, 0)
    } else if (event.key === "ArrowRight") {
        X = X + 4;
        playerLocation(character, X, 0)
    };
}