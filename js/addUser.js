init = () => {
    document.getElementById("add-artist-submit").addEventListener('click', addArtist);
    document.getElementById("triggerAddArtist").addEventListener('click', toggleArtistForm);
    document.getElementById("searchArtist").addEventListener('click', searchArtist);
    let artistList = readArtistList();
    showArtistLists(artistList);
}

showArtistLists = (artistList) => {
    for (let i = 0; i < artistList.length; i++) {
        let artist = artistList[i];
        let newNode = createArtistCard(artist.name, artist.description, artist.image);
        document.getElementById("artistList").appendChild(newNode);
    }
}

readArtistList = () => {
    var artistList = JSON.parse(localStorage.getItem("artistList"));
    if (artistList == null) {
        artistList = [];
    } else if (artistList.length === undefined) {
        artistList = [artistList];
    }
    return artistList;
}

addToArtistList = (name, description, image) => {
    let artist = makeArtist(name,description, image);
    let artistList = readArtistList();
    artistList.push(artist);
    setArtistList(artistList);
}

removeFromArtistList = (name) => {
    let artistList = readArtistList();
    
    for (let i = 0; i < artistList.length; i++) {
        let artist = artistList[i];
        if (artist.name === name) {
            artistList.splice(i, 1);
            i--;
        }
    }
    setArtistList(artistList);
}

searchFromArtistList = (name) => {
    let artistList = readArtistList();
    let searchResult = [];

    for (let i = 0; i < artistList.length; i++) {
        let artist = artistList[i];
        if (artist.name.includes(name)) {
            searchResult.push(artist);
        }
    }

    return searchResult;
}

setArtistList = (artistList) => {
    localStorage.setItem("artistList", JSON.stringify(artistList));
}

makeArtist = (name, description, image) => {
    return {
        name: name,
        description: description,
        image: image
    };
}

function searchArtist() {
    let name = document.getElementById("search-artist").value;
    if (name === "" || name === null) return;
    let artistPanel = document.getElementById("artistList");
    while (artistPanel.firstChild) {
        artistPanel.removeChild(artistPanel.firstChild);
    }
    let result = searchFromArtistList(name);
    showArtistLists(result);

}

function addArtist() {
    const name = document.getElementById("add-artist-name").value;
    const description = document.getElementById("add-artist-description").value;
    const image = document.getElementById("add-artist-image").value;

    if (name === "" || description === "" || image === "") {
        return;
    }

    let newNode = createArtistCard(name, description, image);
    document.getElementById("artistList").appendChild(newNode);
    addToArtistList(name,description,image);
    clearForm();
}



clearForm = () => {
    document.getElementById("add-artist-name").value="";
    document.getElementById("add-artist-description").value="";
    document.getElementById("add-artist-image").value="";
    document.getElementById("add-artist-panel").style.display = "none";
}


function createArtistCard(name,description, url) {
    // init card
    let cardDiv = document.createElement('div');

    // init photoDiv and children
    let photoDiv = document.createElement('div');
    let img = document.createElement('img');

    // init profileDiv and children
    let profileDiv = document.createElement('div');
    let nameP = document.createElement('p');
    let descriptionP = document.createElement('p');

    // init deleteArtistDiv and children
    let deleteArtistDiv = document.createElement('div');
    let deleteArtistButton = document.createElement('button');
    
    //photo
    photoDiv.className = 'photo';
    photoDiv.appendChild(img);
    
    img.src = url;
    img.alt = "photo";
   
    //profile
    profileDiv.className='profile';
    profileDiv.appendChild(nameP);
    profileDiv.appendChild(descriptionP);

    nameP.className = 'name';
    nameP.innerText = name;
   
    descriptionP.className = 'description';
    descriptionP.innerText = description;


    // deleteArtist
    deleteArtistDiv.className = 'deleteArtist';   
    deleteArtistButton.className = 'deleteArtistButton';
    deleteArtistButton.type = 'button';
    deleteArtistButton.innerText = 'DELETE';
    deleteArtistButton.addEventListener("click", (e) => deleteArtist(e));
    deleteArtistDiv.appendChild(deleteArtistButton);

    // card
    cardDiv.className="card";
    cardDiv.appendChild(photoDiv);
    cardDiv.appendChild(profileDiv);
    cardDiv.appendChild(deleteArtistDiv);

    return cardDiv;
}

function deleteArtist(e) {
    const artistDiv = e.target.parentElement.parentElement;
    let name = artistDiv.querySelector(".name").innerText;
    removeFromArtistList(name);
    artistDiv.parentElement.removeChild(artistDiv);
}

function toggleArtistForm() {
    const display = document.getElementById("add-artist-panel").style.display;
    if(display !== "block") {
        document.getElementById("add-artist-panel").style.display = "block";
    } else {
        document.getElementById("add-artist-panel").style.display = "none";
    }
}