// hunt The variables
let input = document.querySelector(".get-repos input");
let btnGet = document.querySelector(".get");
let showData = document.querySelector(".show-repos");
// let arr repos
let reposNames = [];
let visits = [];
let stars = [];
// trigger this function
GetToLocalStorage();
// btn Get
btnGet.onclick = function () {
  if (input.value === "") {
    showData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    getRepos();
  }
};
function getRepos() {
  fetch(`https://api.github.com/users/${input.value}/repos`)
    .then((repos) => {
      return repos.json();
    })
    .then((repos) => {
      if (repos.status == 404) {
        showData.innerHTML = "<span>Username Not Found</span>";
      } else {
        reposNames = [];
        visits = [];
        stars = [];
        showData.innerHTML = "";
        repos.forEach((ele) => {
          let div = document.createElement("div");
          div.className = "my-repo";
          let repoName = document.createElement("span");
          repoName.append(ele.name);
          reposNames.push(ele.name);
          window.localStorage.setItem("repoName", JSON.stringify(reposNames));
          repoName.classList.add("name-repo");
          let contVStar = document.createElement("div");
          contVStar.className = "visit-star";
          let visitTheRepo = document.createElement("a");
          visitTheRepo.append("visit");
          visits.push("visit");
          window.localStorage.setItem("visit", JSON.stringify(visits));
          let starsCount = document.createElement("span");
          starsCount.className = "star";
          starsCount.append(`stars ${ele.stargazers_count}`);
          stars.push(ele.stargazers_count);
          window.localStorage.setItem("stars", JSON.stringify(stars));
          visitTheRepo.href = `https://github.com/${input.value}/${ele.name}`;
          visitTheRepo.setAttribute("target", "_blank");
          contVStar.append(visitTheRepo);
          contVStar.append(starsCount);
          div.append(repoName);
          div.append(contVStar);
          showData.append(div);
        });
      }
    })
    .catch((reason) => {
      console.log(`The Reason Of Error Is: ${reason}`);
    });
}
// add repos to local storage
function GetToLocalStorage() {
  showData.innerHTML = "";
  if (
    localStorage.getItem("visit") &&
    localStorage.getItem("repoName") &&
    localStorage.getItem("stars")
  ) {
    reposNames = JSON.parse(localStorage.getItem("repoName"));
    visits = JSON.parse(localStorage.getItem("visit"));
    stars = JSON.parse(localStorage.getItem("stars"));
    for (let i = 0; i < reposNames.length; i++) {
      let div = document.createElement("div");
      div.className = "my-repo";
      let repoName = document.createElement("span");
      repoName.append(reposNames[i]);
      repoName.classList.add("name-repo");
      let contVStar = document.createElement("div");
      contVStar.className = "visit-star";
      let visitTheRepo = document.createElement("a");
      visitTheRepo.append(visits[i]);
      let starsCount = document.createElement("span");
      starsCount.className = "star";
      starsCount.append(`stars ${stars[i]}`);
      visitTheRepo.href = `https://github.com/${input.value}/${reposNames[i]}`;
      visitTheRepo.setAttribute("target", "_blank");
      contVStar.append(visitTheRepo);
      contVStar.append(starsCount);
      div.append(repoName);
      div.append(contVStar);
      showData.append(div);
    }
  }
}
