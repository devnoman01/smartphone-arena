const allPhoneUrl = `https://openapi.programming-hero.com/api/phones?search=`;


const displayDetails = (info) => {
    const parentDiv = document.getElementById('details-div');
    parentDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add("row", "border", "rounded", "py-3");
    div.innerHTML = `
        <div class="col-md-4 col-sm-12 p-4 text-center">
            <img class="w-75" src="${info.image}" alt="">
        </div>
        <div class="col-md-8 col-sm-12">
            <h4>${info.name}</h4>
            <small>${info.releaseDate}</small>
            <p class="fw-bold my-2">Main Feature:</p>
            <li><small>${info.mainFeatures.chipSet}</small></li>
            <li><small>${info.mainFeatures.displaySize}</small></li>
            <li><small>${info.mainFeatures.memory}</small></li>
            <li><small>${info.mainFeatures.storage}</small></li>
        </div>
    `;
    parentDiv.appendChild(div);
    document.getElementById('pop-up-section').style.display = "block";
}

const detailsInfo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data));
}


const displayPhones = (phones) => {
    const parentDiv = document.getElementById('content-div');
    parentDiv.textContent = "";
    let phoneCount = 0;
    phones.forEach(phone => {
        if(phoneCount < 20){
            const div = document.createElement('div');
            div.classList.add("col-lg-4", "col-md-6", "col-sm-12");
            div.innerHTML = `
                <div class="card p-3 rounded">
                    <img src="${phone.image}" class="p-4 img-fluid rounded" alt="...">
                    <div class="pt-3">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <span class="mb-2">Brand: ${phone.brand}</span>
                        <br>
                        <button onclick="detailsInfo('${phone.slug}')" data-toggle="modal" data-target="#myModal" class="mt-3 btn button">Details</button>                        
                    </div>
                </div>
            `;
            parentDiv.appendChild(div);
            phoneCount++;
        }
        else{
            return;
        }
    });
}

const searchItem = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhones(data.data));
    document.getElementById('search-field').value = '';
}


const loadPhones = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhones(data.data));
}


onload = loadPhones(allPhoneUrl);