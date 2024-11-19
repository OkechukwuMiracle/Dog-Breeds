document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const breedSelect = document.getElementById('breedSelect');
    const slideshowImage = document.getElementById('slideshowImage');
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.getElementById('searchBtn');
    const listContainer = document.getElementById('list-container');
    let slideshowInterval;


    // Show loading indicator
    loading.style.display = 'block';

    // Fetch dog breeds and populate dropdown
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching dog list');
            }
            return response.json();
        })
        .then(data => {
            const breeds = data.message;
            for (const breed in breeds) {

                // Add to dropdown
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedSelect.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error Fetching Data', error);
        })
        .finally(() => {
            loading.style.display = 'none';
        });

    // Start slideshow on breed selection
    breedSelect.addEventListener('change', () => {
        const breed = breedSelect.value;
        if (breed) {
            startSlideshow(breed);
            listContainer.style.display = 'none';
        } else {
            stopSlideshow();
            listContainer.style.display = 'flex';
        }
    });

    // Start the slideshow by fetching breed images
    function startSlideshow(breed) {
        stopSlideshow(); // Clear any previous interval
        slideshowInterval = setInterval(() => fetchBreedImage(breed), 3000);
    }

    // Stop the slideshow
    function stopSlideshow() {
        clearInterval(slideshowInterval);
        slideshowImage.src = ''; // Clear the image when no breed is selected
        slideshowImage.alt = ''; // Clear the image alt text when no breed is selected
    }

    // Fetch and display a random image of the selected breed
    function fetchBreedImage(breed) {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to fetch image');
                }
                return response.json();
            })
            .then(data => {
                slideshowImage.src = data.message;
                slideshowImage.alt = `${breed} image`;
            })
            .catch(error => {
                console.error('Error fetching image', error);
            });
    }

    searchBtn.addEventListener('click', ()=> {
        const search = searchBar.value.toLowerCase().trim();
        if (search){
            startSlideshow(search);
            listContainer.style.display = 'none';
        } else {
            stopSlideshow();
            alert('Please enter a breed name');
            listContainer.style.display = 'flex';
        }
    });
    
});

