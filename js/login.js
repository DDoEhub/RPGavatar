const loginForm = document.querySelector("#log-in");
const userId = loginForm.querySelector("input")
const userIdList = [];

const USER_ID = "user-id";
const HIDDEN_KEY = "hidden"

const savedId = localStorage.getItem(USER_ID);

console.log(userIdList)

if(savedId === null){
}else{
    userIdList.push(JSON.parse(savedId));
}

console.log(userIdList)

function takeUserId(event) {
    event.preventDefault()

    userIdList.push(userId.value);
    localStorage.setItem(USER_ID, JSON.stringify(userIdList))

    loginForm.classList.add(HIDDEN_KEY)
}

loginForm.addEventListener("submit", takeUserId);