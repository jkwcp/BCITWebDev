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
    let cardDiv = document.createElement('div');
    let photoDiv = document.createElement('div');
    let profileDiv = document.createElement('div');

    let img = document.createElement('img');
    img.src = url;
    img.alt = "photo";

    let nameP = document.createElement('p');
    nameP.className = 'name';
    nameP.innerText = name;

    let descriptionP = document.createElement('p');
    descriptionP.className = 'description';
    descriptionP.innerText = description;

    photoDiv.className = 'photo';
    photoDiv.appendChild(img);
    profileDiv.className='profile';
    profileDiv.appendChild(nameP);
    profileDiv.appendChild(descriptionP);

    let deleteArtistDiv = document.createElement('div');
    deleteArtistDiv.className = 'deleteArtist';
    let deleteArtistButton = document.createElement('button');
    deleteArtistButton.className = 'deleteArtistButton';
    deleteArtistButton.type = 'button';
    deleteArtistButton.innerText = 'DELETE';
    deleteArtistButton.addEventListener("click", (e) => deleteArtist(e));

    deleteArtistDiv.appendChild(deleteArtistButton);

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