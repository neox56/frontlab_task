const url =  'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture'
   




function getUsers() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2>People</h2>';
            data.results.forEach(function (data) {
                output += `
                <img  src = "${data.picture.medium} ">
                 <ul>
                 <li> ${data.name.title} ${data.name.first} ${data.name.last} </li>
                 </ul>
                `;
            });
            document.getElementById('output').innerHTML = output;
        })
}