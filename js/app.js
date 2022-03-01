const cssDisplayFunction = (id, value) => {
    document.getElementById(id).style.display = value;
}

window.onload = cssDisplayFunction('show-all-btn-div', 'none');

// details display function
const displayDetails = (info) => {
    
    cssDisplayFunction('spinner', 'none');
    const parentDiv = document.getElementById('details-div');
    parentDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add("row", "border", "rounded", "py-4");
    div.innerHTML = `
        <div class="col-md-4 col-sm-12 p-4 text-center">
            <img class="w-75" src="${info.image}" alt="">
        </div>
        <div class="col-md-8 col-sm-12">
            <h2>${info.brand} ${info.name}</h2>
            <small id="no-release-date">Release date not available</small>
            <small>${info.releaseDate}</small>
            <p class="fw-bold my-2">Main Feature:</p>
            <small>
                <i class="fa-solid fa-circle-chevron-right me-1"></i>
                <b>Chipset:</b> ${info.mainFeatures.chipSet}</small><br>
            <small>
                <i class="fa-solid fa-circle-chevron-right me-1"></i>
                <b>Display:</b> ${info.mainFeatures.displaySize}</small><br>
            <small>
                <i class="fa-solid fa-circle-chevron-right me-1"></i>
                <b>Memory:</b> ${info.mainFeatures.memory}</small><br>
            <small>
                <i class="fa-solid fa-circle-chevron-right me-1"></i>
                <b>Storage:</b> ${info.mainFeatures.storage}
            </small><br>

            <div class="row mt-2">
                <div id="sensors-info" class="col-md-4 col-sm-12">
                    <p id="sensors-heading" class="fw-bold my-2">Sensor Information</p>
                    <div>
                    
                    </div>
                </div>
                <div id="others-info" class="col-md-8 col-sm-12">
                    <p id="others-heading" class="fw-bold my-2">Others Information</p>
                    <div>
                    
                    </div>
                </div>
            </div>
        </div>
    `;
    parentDiv.appendChild(div);
    
    const sensorsInfoParent = document.getElementById('sensors-info');
    const othersInfoParent = document.getElementById('others-info');
    cssDisplayFunction('sensors-heading', 'none');
    cssDisplayFunction('others-heading', 'none');

    // loading sensor information
    for(const sensor of info.mainFeatures.sensors){
        cssDisplayFunction('sensors-heading', 'block');
        const small = document.createElement('small');
        small.innerHTML = `
        <i class="fa-solid fa-angle-right me-1"></i>
        ${sensor}<br>`;
        sensorsInfoParent.appendChild(small);
    }
    
    // loading others information
    for(const prop in info.others){
        cssDisplayFunction('others-heading', 'block');
        const small = document.createElement('small');
        small.innerHTML = `
        <i class="fa-solid fa-angle-right me-1"></i>
        ${prop}: ${info.others[prop]}<br>`;
        othersInfoParent.appendChild(small);
    }
    // checking release date availability
    if(info.releaseDate == ''){
        cssDisplayFunction('no-release-date', 'block');
    }
    else{
        cssDisplayFunction('no-release-date', 'none');
    }
    cssDisplayFunction('pop-up-section', 'block');
}

// details button function
const detailsInfo = (id) => {
    cssDisplayFunction('spinner', 'block');

    // fetching all details for specific device
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data));
}

// search result display function
const displayItems = (items) => {
    cssDisplayFunction('spinner', 'none');

    // checking if seach value is empty
    if(items.length === 0){
        cssDisplayFunction('no-result', 'block');
    }
    else{
        cssDisplayFunction('no-result', 'none');
        const parentDiv = document.getElementById('content-div');
        parentDiv.textContent = "";
        let phoneCount = 0;

        // search result display function
        const displayEachDevice = (item) => {
            const div = document.createElement('div');
            div.classList.add("col-lg-4", "col-md-6", "col-sm-12");
            div.innerHTML = `
                    <div class="card p-3 rounded text-center">
                        <img src="${item.image}" class="p-4 img-fluid rounded" alt="...">
                        <div class="card-body pt-3">
                            <h4 class="card-title">${item.phone_name}</h4>
                            <span class="mb-2">Brand: ${item.brand}</span>
                            <br>
                            <a onclick="detailsInfo('${item.slug}')" class="mt-3 btn button" href="#header">Details</a>
                        </div>
                    </div>
                `;
                parentDiv.appendChild(div);
        }

        // loop for displaying max 20 search result
        items.forEach(item => {
            if(phoneCount < 20){
                displayEachDevice(item);
                phoneCount++;
            }
            else{
                return;
            }

            if(phoneCount >= 20){
                cssDisplayFunction('show-all-btn-div', 'block');
            }
        });

        // show all button function
        document.getElementById('show-all-btn').addEventListener('click', function(){

            const parentDiv = document.getElementById('content-div');
            parentDiv.textContent = "";
            // loop for displaying all search result
            items.forEach(item => {
                displayEachDevice(item);
            });
            cssDisplayFunction('show-all-btn-div', 'none');
        });
    }
}


// search button function
const searchItem = () => {
    cssDisplayFunction('no-result', 'none');
    cssDisplayFunction('spinner', 'block');
    document.getElementById('details-div').textContent = '';
    document.getElementById('content-div').textContent = '';
    cssDisplayFunction('pop-up-section', 'none');
    cssDisplayFunction('show-all-btn-div', 'none');

    // receiving searchvalue and fetching data
    const searchText = document.getElementById('search-field').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayItems(data.data));
    document.getElementById('search-field').value = '';
    
}