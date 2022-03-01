const toogleFunction = (id, value) => {
    document.getElementById(id).style.display = value;
}

const displayDetails = (info) => {
    
    console.log(info.mainFeatures.sensors);
    toogleFunction('spinner', 'none');
    const parentDiv = document.getElementById('details-div');
    parentDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add("row", "border", "rounded", "py-4");
    div.innerHTML = `
        <div class="col-md-4 col-sm-12 p-4 text-center">
            <img class="w-75" src="${info.image}" alt="">
        </div>
        <div class="col-md-8 col-sm-12">
            <h4>${info.brand} ${info.name}</h4>
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
    toogleFunction('sensors-heading', 'none');
    toogleFunction('others-heading', 'none');
    for(const sensor of info.mainFeatures.sensors){
        toogleFunction('sensors-heading', 'block');
        console.log(sensor);
        const small = document.createElement('small');
        small.innerHTML = `
        <i class="fa-solid fa-angle-right me-1"></i>
        ${sensor}<br>`;
        sensorsInfoParent.appendChild(small);
    }
    
    for(const prop in info.others){
        toogleFunction('others-heading', 'block');
        const small = document.createElement('small');
        small.innerHTML = `
        <i class="fa-solid fa-angle-right me-1"></i>
        ${prop}: ${info.others[prop]}<br>`;
        othersInfoParent.appendChild(small);
    }

    if(info.releaseDate == ''){
        toogleFunction('no-release-date', 'block');
    }
    else{
        toogleFunction('no-release-date', 'none');
    }
    toogleFunction('pop-up-section', 'block');
}

const detailsInfo = (id) => {
    toogleFunction('spinner', 'block');
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data));
}


const displayItem = (items) => {
    toogleFunction('spinner', 'none');
    if(items.length === 0){
        toogleFunction('no-result', 'block');
    }
    else{
        toogleFunction('no-result', 'none');
        const parentDiv = document.getElementById('content-div');
        parentDiv.textContent = "";
        let phoneCount = 0;
        items.forEach(item => {
            if(phoneCount < 20){
                const div = document.createElement('div');
                div.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-sm-12");
                div.innerHTML = `
                    <div class="card p-3 rounded">
                        <img src="${item.image}" class="p-4 img-fluid rounded" alt="...">
                        <div class="pt-3">
                            <h4 class="card-title">${item.phone_name}</h4>
                            <span class="mb-2">Brand: ${item.brand}</span>
                            <br>
                            <button onclick="detailsInfo('${item.slug}')" data-toggle="modal" data-target="#myModal" class="mt-3 btn button">Details</button>                        
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
    

}

const searchItem = () => {
    toogleFunction('no-result', 'none');
    toogleFunction('spinner', 'block');
    document.getElementById('details-div').textContent = '';
    document.getElementById('content-div').textContent = '';
    toogleFunction('pop-up-section', 'none');

    const searchText = document.getElementById('search-field').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayItem(data.data));
    document.getElementById('search-field').value = '';
    
}