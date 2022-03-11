const createIdPage = document.querySelector("#createId-Page");
const userId = createIdPage.querySelector("#create-id input");

const selectIdPage = document.querySelector("#selectId-Page");
const createdIdList = document.querySelector("#selectId-Page ol");
const delIdListBtn = document.querySelector("#selectId-Page ol li button");

const dressingroomPage = document.querySelector("#dressingroom-page");


let userIdList = [];

const USER_ID = "user-id";
const HIDDEN_KEY = "hidden";

const savedId = localStorage.getItem(USER_ID);

function togglePageHidden() {
    if (createIdPage.classList.contains(HIDDEN_KEY)) {
        selectIdPage.classList.add(HIDDEN_KEY);
        createIdPage.classList.remove(HIDDEN_KEY);
    } else {
        createIdPage.classList.add(HIDDEN_KEY);
        selectIdPage.classList.remove(HIDDEN_KEY);
    }
}

function SELECTpageLayout() {
    const numOfLi = createdIdList.childNodes.length;

    if (numOfLi > 3) {
        createdIdList.style.justifyContent = "flex-start";
    } else {
        createdIdList.style.justifyContent = "center";
    }
}

function saveUserIdList() {
    localStorage.setItem(USER_ID, JSON.stringify(userIdList));
}

function delList(event) {
    const li = event.target.parentElement;
    li.removeEventListener("click", goToDressingroom);
    li.remove()
    SELECTpageLayout()
    userIdList = userIdList.filter((avatar) => avatar.id !== parseInt(li.id));
    saveUserIdList()
}

function preLookSetting(thisAvatar) {
    const parts = Object.keys(thisAvatar.look).filter(element => element !== "basic");
    const partss = parts[0];
    console.log()


    for(let j = 0; j < parts.length; j++ ){
        let i = parts[j];
        let preLookPart = preLook.querySelector(`#${i}`);

        if (thisAvatar.look[i] === "") {
            preLookPart.setAttribute("src", `../src/img/closet/${i}-transparent.png`);
        } else {
            preLookPart.setAttribute("src", thisAvatar.look[i]);
        };
    };
}

function goToDressingroom(event) {
    const dressingroomPageTitle = document.querySelector("#dressingroom-page > h2");
    let thisAvatar = "";

    if (event.target.childNodes.length > 2) {
        thisAvatar = userIdList.find(element => {
            if (String(element.id) === event.target.id) {
                return true;
            }
        });
    } else {
        thisAvatar = userIdList.find(element => {
            if (String(element.id) === event.target.parentElement.id) {
                return true;
            }
        });
    };

    insideAvatar.push(thisAvatar.id)

    dressingroomPageTitle.innerText = `${thisAvatar.name}'s outfit`;

    preLookSetting(thisAvatar)

    selectIdPage.classList.add(HIDDEN_KEY);
    dressingroomPage.classList.remove(HIDDEN_KEY);
}

function paintList(avatarInfo) {
    const li = document.createElement("li");
    li.id = avatarInfo.id;
    li.addEventListener("click", goToDressingroom);
    const name = document.createElement("span");
    name.innerText = avatarInfo.name;
    const look = document.createElement("img");
    look.setAttribute("src", avatarInfo.look.basic);
    const del = document.createElement("button");
    del.innerText = "delete avatar";
    del.addEventListener("click", delList);

    li.appendChild(name);
    li.appendChild(look);
    li.appendChild(del);
    createdIdList.appendChild(li);

    SELECTpageLayout()
}

function takeUserId(event) {

    if (userId.value.length < 2 || userId.value.length > 8) {
        event.preventDefault();
        userId.value = "";
        userId.placeholder = "name length limit is 2~8";
    } else {
        event.preventDefault()

        const avatarName = userId.value;
        const avatarInfo = {
            name: avatarName,
            look: {
                basic: "../src/img/male-blink.gif",
                hat: "",
                cloth: "",
                shoes: ""
            },
            id: Date.now()
        }

        userIdList.push(avatarInfo);
        saveUserIdList();
        paintList(avatarInfo);

        togglePageHidden()
    }
}

// check generated avatar code
if (savedId === null || savedId === "[]") {
    createIdPage.classList.remove(HIDDEN_KEY);
} else {
    const savedIdList = JSON.parse(savedId);
    const parseIdList = JSON.parse(localStorage.getItem(USER_ID));

    userIdList = savedIdList;
    parseIdList.forEach(paintList);
    selectIdPage.classList.remove(HIDDEN_KEY);
}

// create new avatar code
createIdPage.addEventListener("submit", takeUserId);

// change page code (create id page <-> select id page)
const goToSelectPageBtn = document.querySelector("#selectCreatedId-btn");
const goToCreatePageBtn = document.querySelector("#createNewId-btn");

goToCreatePageBtn.addEventListener("click", togglePageHidden)
goToSelectPageBtn.addEventListener("click", togglePageHidden)