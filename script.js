const accessKey = '8NopAPPe6BrZH8IUrLZAvG3McJpWSXPTurNiQz6LojE';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');

// ✅ Input validation: only letters and space, min 3 characters
function isValidKeyword(keyword) {
  const regex = /^[a-zA-Z\s]{3,}$/;
  return regex.test(keyword.trim());
}

const fetchImages = async (query) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    imagesContainer.innerHTML = ''; // Clear previous content

    if (data.results.length === 0) {
      imagesContainer.innerHTML = '<h2>No images found. Try a different keyword.</h2>';
      return;
    }

    data.results.forEach(photo => {
      const imageElement = document.createElement('div');
      imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" />`;
      imagesContainer.appendChild(imageElement);
    });
  } catch (error) {
    imagesContainer.innerHTML = '<h2>Error fetching images. Please try again later.</h2>';
  }
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();

  if (!isValidKeyword(inputText)) {
    imagesContainer.innerHTML = '<h2>Please enter a valid keyword (only letters, min 3 characters).</h2>';
    return;
  }

  fetchImages(inputText);
});
