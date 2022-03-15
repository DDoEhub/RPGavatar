const closet = document.querySelector("#closet");
const preLook = document.querySelector("#pre-look");
const closetList = {
    hat: [
        "hat-transparent.png",
        "hat-warrior.png",
        "hat-archer.png",
        "hat-wizard.png",
        "hat-assassin-beanie.png",
        "hat-assassin-mask.png"],

    cloth: [
        "cloth-transparent.png",
        "cloth-warrior.png",
        "cloth-archer.png",
        "cloth-wizard.png",
        "cloth-assassin.png"],

    shoes: [
        "shoes-transparent.png",
        "shoes-warrior.png",
        "shoes-archer.png",
        "shoes-wizard.png",
        "shoes-assassin.png"]
}

const insideAvatar = [];

function changeOutfit(event){
    let src = "";
    let alt = "";
    let thisMan = userIdList.find(element => {
        if (element.id === insideAvatar[0]) {
            return true;
        }
    })

    if(event.target.attributes.length === 0){
        src = event.target.children[0].attributes.src.value;
        alt = event.target.children[0].attributes.alt.value;
    }else{
        src = event.target.attributes.src.value;
        alt = event.target.attributes.alt.value;
    };

    const preLookPart = preLook.querySelector(`.${alt}`);
    const listLook = document.getElementById(`${thisMan.id}`);
    const listLookPart = listLook.querySelector(`.${alt}`);
    preLookPart.setAttribute("src", src)
    thisMan.look[alt] = src;

    listLookPart.setAttribute("src", src)

    saveUserIdList();

}

function createClosetList() {
    const liList = [];

    for (const i in closetList) {
        for (j = 0; j < closetList[i].length; j++) {
            const li = document.createElement("li");
            const img = document.createElement("img");  

            liList.push({ src: `./src/img/closet/${closetList[i][j]}`, alt: i });
            li.addEventListener("click", changeOutfit)
            closet.appendChild(li)
            img.setAttribute("src", liList[`${liList.length - 1}`].src);
            img.setAttribute("alt", liList[`${liList.length - 1}`].alt);
            li.appendChild(img)
        };
    };
};

createClosetList()

// change page code (dressingroom page -> select id page)
const backToSelectPageBtn = document.querySelector("#dressingroom-page>button:first-of-type");

function backToSelectPage(event){
    insideAvatar.pop()

    dressingroomPage.classList.add(HIDDEN_KEY);
    selectIdPage.classList.remove(HIDDEN_KEY);
}

backToSelectPageBtn.addEventListener("click", backToSelectPage);