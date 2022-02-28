const allPhoneUrl = `https://openapi.programming-hero.com/api/phones?search=`;


const displayPhones = (phones) => {
    let phoneCount = 0;
    phones.forEach(phone => {
        if(phoneCount < 20){
            console.log(phone);
            phoneCount++;
        }
        else{
            return;
        }
    });
}


const loadPhones = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhones(data.data));
}


onload = loadPhones(allPhoneUrl);