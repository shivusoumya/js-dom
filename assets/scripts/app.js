const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancleAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancleAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text')
const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movies.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));

    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}


const toggleBrackdrop = () => {
    backdrop.classList.toggle('visible');
}

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBrackdrop();
}

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
}

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInput();
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('please enter the valid values (ratings between 1 to 5)');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

const backdropClickHandler = () => {
    toggleMovieModal();
}

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancleAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);