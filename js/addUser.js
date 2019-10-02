function addArtist() {
    const name = document.getElementById("add_artist_name").value;
    const description = document.getElementById("add_artist_description").value;
    const image = document.getElementById("add_artist_image").value;

    if (name === "" || description === "" || image === "") {
        return;
    }

    let newNode = createArtistCard(name, description, image);

    document.getElementById("artistList").appendChild(newNode);
    clearForm();

}

clearForm = () => {
    document.getElementById("add_artist_name").value="";
    document.getElementById("add_artist_description").value="";
    document.getElementById("add_artist_image").value="";
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