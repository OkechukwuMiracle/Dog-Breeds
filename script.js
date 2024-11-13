// fetch the dog list from the api
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
         if(!response.ok){
             throw new Error('Error fetching dog list')
         }
         return response.json();
    })
    .then(data => {
        console.log('Dog list', data.message);

        const breeds = data.message;
        const breedsList = document.getElementById('breedsList')

        for(const breed in breeds) {
            const breedItem = document.createElement('div');
            breedItem.classList.add('breed-item');
            breedItem.style.listStyle = 'none'
            breedItem.textContent = breed;
            breedItem.style.marginTop = '10%'
            breedItem.addEventListener('click', () => fetchBreedImage(breed, breedItem));

            breedsList.appendChild(breedItem);
        }
    })
    .catch(error => {
        console.error('Error Fetching Data', error);
    })
    .finally(() => {
        loading.style.display = 'none';
    })

});

// fetch random image from the api
function fetchBreedImage(breed, breedItem) {
    fetch('https://dog.ceo/api/breeds/image/random')
.then(response => {
    if (!response.ok){
        throw new Error('Unable to fetch image');
    }
    return response.json();
})
 .then(data => {
    const dogImage = document.createElement('img');
    dogImage.src = data.message;
    dogImage.alt = `${breed} image`;
    dogImage.style.maxWidth = '100%'
    dogImage.style.borderRadius = '10px'

    breedItem.appendChild(dogImage);
  })
  .catch (error => {
    console.error('Error fetching image',  error);
  });
};

// filter the breeds as the user types
const searchBreed = document.getElementById('searchBreed');
    searchBreed.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const breedItem = document.querySelectorAll('.breed-item');
        breedItem.forEach(item => {
            const breedText = item.textContent.toLowerCase();
            item.style.display = breedText.includes(query) ? 'inline' : 'none';
        });
    });