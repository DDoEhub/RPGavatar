function countTime(){
    const timer = gamePage.querySelector(".timer");
    let minute = 0;
    let second = 0;
    let centisecond = 0;

    setInterval(element => {

        centisecond ++

        if( minute > 59 ){
            alert("Your win");
        } else if ( second > 59 ){
            second = 0;
            minute++
        }else if (centisecond > 99 ){
            centisecond = 0;
            second++
        }
        timer.innerHTML = `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}:${centisecond.toString().padStart(2, '0')}`;
    }, 10)
}

function calcHitbox(){
    const character = gamePage.querySelector("div[alt=player]");
    const meteo = gamePage.querySelectorAll("img[alt=meteo]");

    let hitBox = {// W = width, H = height, L = left, R = right, T = top, B = bottom
        WL: (parseFloat(character.style.left) + 1.5),
        WR: parseFloat(character.style.left) + 3.5,
        HT: parseFloat(character.style.top) + 1,
        HB: parseFloat(character.style.top) + 5.75
    };
    // meteo.filter( element => { 30 < parseFloat(element.style.top) < 36 } )
    meteo.forEach(element => {
        if( hitBox.HT < (parseFloat(element.style.top) + 6) && parseFloat(element.style.top) < hitBox.HB){
            if( hitBox.WR > parseFloat(element.style.left) && (parseFloat(element.style.left) + 5) > hitBox.WL ){
                alert("got ya")
                // console.log(hitBox)
            };
        };
    });
}

function meteo(){
    const meteo = document.createElement("img");

    meteo.setAttribute("alt", "meteo")
    meteo.setAttribute("src", "./src/img/meteo1.png")

    meteo.style.left = `${(Math.random() * 90) - 5}rem`;
    meteo.style.top = `-4rem`
    gamePage.appendChild(meteo)

    meteoMove = setInterval((e) => {
        let Y = parseInt(meteo.style.top);
        if( parseInt(meteo.style.top) > 40 ){
            meteo.remove()
        } else{
            meteo.style.top = `${Y + 1}rem`;
        }
    }, 100);
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
