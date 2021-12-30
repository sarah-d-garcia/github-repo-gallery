//-----Global Variables---------------------------------------

//div were porfile info will appear
    const overview = document.querySelector(".overview");
//my github username 
    const username = "sarah-d-garcia";
//Select unordered list to display the repos
    const repoList =  document.querySelector(".repo-list");
//Selects class where all reop information appears
    const allReposContainer = document.querySelector(".repos");
//selects class where indivual repo data will appear
    const repoData = document.querySelector(".repo-data");
//selets the back to repo button
    const viewReposButton = document.querySelector(".view-repos");
//selects the input for searh by name
    const filterInput = document.querySelector(".filter-repos");


//-----async function to get my data-----------------------------
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();


//Funciton to display the data fected
const displayUserInfo = function (data) {
    const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = 
  `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

  overview.append(div);  
  gitUserRepos();
};


//-----Async function to get my repos--------------------------------
const gitUserRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};


//Function to display the repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
     
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
};


//Click event to view each repo
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
      const repoName = e.target.innerText;
      getRepoInfo(repoName);
    }
});


//function to get specific repo info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    //Array for a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

//function to display specifi repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    viewReposButton.classList.remove("hide");

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
};


//Back button click event
viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

//Create a search function
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();
 
    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
  });
