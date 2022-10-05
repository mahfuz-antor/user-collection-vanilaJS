// import { data } from "./data.js";
const getData = (job = "All") => {
  fetch("./data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayUsers(
        job === "All" ? data : data.filter((el) => el.job === job),
        data
      );
    });
  // displayUsers(
  //   job === "All" ? data : data.filter((el) => el.job === job),
  //   data
  // );
};
getData();

const displayUsers = (users, allUsers) => {
  const ul = document.getElementById("userUL");
  const jobs = ["All"];

  allUsers.map((user) => {
    if (jobs.indexOf(user.job) === -1) {
      jobs.push(user.job);
    }
  });

  ul.innerHTML = `
    ${users.reduce(
      (acc, work) =>
        acc +
        `<li class="bg-gray-50 py-5 px-3 text-center"><img class="w-40 h-40 rounded-full mx-auto" src=${work.image}/> <span class="text-xl font-bold"> Name: ${work.name} </span> </li>`,
      ""
    )}
  `;

  const userCategory = jobs.filter((category) => category);
  console.log(userCategory);

  const li2 = document.createElement("li");
  const parentDiv = document.getElementById("button");
  li2.style.color = "gray";
  li2.style.margin = "10px";

  parentDiv.innerHTML = `
    ${userCategory.reduce(
      (acc, job) =>
        acc +
        `<button class="bg-sky-500 py-5 px-3" id=${job.toLocaleLowerCase()}> ${job}  </button>`,
      ""
    )}
  `;

  userCategory.map((job) => {
    const btn = document.getElementById(job.toLocaleLowerCase());
    btn.addEventListener("click", () => {
      getData(job);
    });
  });
};
