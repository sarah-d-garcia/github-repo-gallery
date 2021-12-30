//-----Global Variables---------------------------------------

//div were porfile info will appear
const overview = document.querySelector(".overview");

//my github username 
const username = "sarah-d-garcia";

//Select unordered list to display the repos
const repoList =  document.querySelector(".repo-list");



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
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };
