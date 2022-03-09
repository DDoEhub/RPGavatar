const createIdPage = document.querySelector("#createId-Page");
const userId = createIdPage.querySelector("#create-id input");
const selectIdPage = document.querySelector("#selectId-Page");
const createdIdList = document.querySelector("#avatar-list")
const delIdListBtn = document.querySelector("#avatar-list li button")

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
    } else if(numOfLi > 0){
        createdIdList.style.justifyContent = "center";
    };
}

function saveUserIdList() {
    localStorage.setItem(USER_ID, JSON.stringify(userIdList));
}

function delList(event) {
    const li = event.target.parentElement;
    li.remove()
    SELECTpageLayout()
    userIdList = userIdList.filter((avatar) => avatar.id !== parseInt(li.id));
    saveUserIdList()
}

function paintList(avatarInfo) {
    const li = document.createElement("li");
    li.id = avatarInfo.id;
    const name = document.createElement("span");
    name.innerText = avatarInfo.name;
    const look = document.createElement("img");
    look.setAttribute("src", avatarInfo.look);
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
            look: "../src/img/male-blink.gif",
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

// change select page layout


// change page code (create id page <-> select id page)
const goToSelectPage = document.querySelector("#selectCreatedId-btn");
const goToCreatePage = document.querySelector("#createNewId-btn");

goToCreatePage.addEventListener("click", togglePageHidden)
goToSelectPage.addEventListener("click", togglePageHidden)