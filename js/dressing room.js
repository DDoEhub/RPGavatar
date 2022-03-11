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

function changeOutfit(event){
    let src = null;
    let alt = null;

    if(event.target.attributes.length === 0){
        src = event.target.children[0].attributes.src.value;
        alt = event.target.children[0].attributes.alt.value;
    }else{
        src = event.target.attributes.src.value;
        alt = event.target.attributes.alt.value;
    };
    const preLookChildren = preLook.querySelector(`#${alt}`);
    preLookChildren.setAttribute("src", src)
}

function createClosetList() {
    const liList = [];

    for (const i in closetList) {
        for (j = 0; j < closetList[i].length; j++) {
            const li = document.createElement("li");
            const img = document.createElement("img");  

            liList.push({ src: `../src/img/closet/${closetList[i][j]}`, alt: i });
            li.addEventListener("click", changeOutfit)
            closet.appendChild(li)
            img.setAttribute("src", liList[`${liList.length - 1}`].src);
            img.setAttribute("alt", liList[`${liList.length - 1}`].alt);
            li.appendChild(img)
        };
    };
};

createClosetList()

