let userScoreList = [];

function scoreUpload(score){
    const name = thisMan.name;
    userScoreList.push({name, score})

    console.log(userScoreList)

    localStorage.setItem("score", userScoreList);
}