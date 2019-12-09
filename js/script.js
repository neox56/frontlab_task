let userData;
window.onload = () => {
    fetch('https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture')
        .then(response => response.json())
        .then(response => {
            userData = response;
            load();
        })
};

// let request = new XMLHttpRequest();
// request.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);
// request.send();
// request.onload = () => {
//     userData = JSON.parse(request.response);
//     load();
// };

const load = () => {
    let output = '';
    userData.results.forEach((item, i) => {
        output += `
                 <div class="wrap-list" >
                 <div> <img  src="${userData["results"][i].picture.medium}" onclick="createPopup(id);showPopup()" id="${i}"> 
                 </div>
                 <div> ${userData["results"][i].name.title}. ${userData["results"][i].name.first} ${userData["results"][i].name.last}</div>
                 </div>
     			 `;
    });
    document.querySelector('#box').innerHTML = output;
};

const createPopup = (i) => {
    let output = '';
    userData.results.forEach(() => {
        output =
            `<ul class="wrap-active">
               <li> <img src="${userData["results"][i].picture.medium}"></li>
               <li> Name: ${userData["results"][i].name.title}. ${userData["results"][i].name.first} ${userData["results"][i].name.last}</li>
               <li>Gender: ${userData["results"][i].gender}</li>
               <li>State: ${userData["results"][i].location.state}</li>
               <li>City: ${userData["results"][i].location.city}</li> 
               <li>Address: ${userData["results"][i].location.street}</li>
               <li>Postcode: ${userData["results"][i].location.postcode}</li>
			   <li>Email: <span class="email">${userData["results"][i].email}</span> </li>
               <li>Phone: ${userData["results"][i].phone}</li>
               <button onclick="closePopup()" class="close">&times;</button>
               </ul>`;
    });
    document.querySelector('#popup').innerHTML = output;
};

const showPopup = () => {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.popup').style.display = ' block';

    /*Закрытие модального окна кнопкой Escape*/
    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            document.querySelector('.overlay').style.display = 'none';
            document.querySelector('.popup').style.display = 'none';
        }
    };
};

const closePopup = () => {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.popup').style.display = 'none';
};


const sortFirstName = () => {
    Array.prototype.sort.call(userData.results, (a, b) => {
        return a.name.first > b.name.first ? 1 : a.name.first < b.name.first ? -1 : 0;
    });
    let userWraper = document.querySelector('#box');
    userWraper.innerHTML = "";
    load();
};

const reverseFirstName = () => {
    Array.prototype.sort.call(userData.results, (a, b) => {
        return a.name.first < b.name.first ? 1 : a.name.first > b.name.first ? -1 : 0;
    });
    let userWraper = document.querySelector('#box');
    userWraper.innerHTML = "";
    load();
};

const sortLastName = () => {
    Array.prototype.sort.call(userData.results, (a, b) => {
        return a.name.last > b.name.last ? 1 : a.name.last < b.name.last ? -1 : 0;
    });
    let userWraper = document.querySelector('#box');
    userWraper.innerHTML = "";
    load();
};

const reverseLastName = () => {
    Array.prototype.sort.call(userData.results, (a, b) => {
        return a.name.last < b.name.last ? 1 : a.name.last > b.name.last ? -1 : 0;
    });
    let userWraper = document.querySelector('#box');
    userWraper.innerHTML = "";
    load();
};


document.querySelector('.sortButton').onclick = () => {
    let sortSelect = document.querySelector('.sortSelect');
    sortValue = sortSelect.value;
    switch (sortValue) {
        case 'firstName':
            sortFirstName();
            break;
        case 'reverseFirstName':
            reverseFirstName();
            break;
        case 'lastName':
            sortLastName();
            break;
        case 'reverseLastName':
            reverseLastName();
            break;
    }
};