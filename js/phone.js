// Function to find each phone object from 'phones' array and to make a div for each phone object
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = " ";
  const loadMore = document.getElementById("load-more");
  if (phones.length > 10 && !isShowAll) {
    loadMore.classList.remove("hidden");
  } else {
    loadMore.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 10);
  }
  console.log("is show all", isShowAll);

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-green-200 shadow-sm p-5 `;
    phoneCard.innerHTML = `
          <figure>
                <img
                class="bg-gray-100 rounded-2xl" 
                  src="${phone.image}"
                  alt="Shoes" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>

                <div class="card-actions justify-end">
                  <button onclick="handledShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
              </div>
            `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// loadData Function for calling dynamic api
const loadPhones = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const dataObject = await res.json();
  const phones = dataObject.data;
  displayPhones(phones, isShowAll);
};
// buttonClicked function
const buttonClicked = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);
};

// Function to enable loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// Load more button onclick function
const showAll = () => {
  buttonClicked(true);
};

// Show Details functionality
const handledShowDetail = async (id) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  console.log(phone);
  const boardContainer = document.getElementById("board-container");
  boardContainer.innerHTML = `
              <div class="flex justify-center"> <img class="mb-3 object-cover" src="${phone.image}" alt="Image of the clicked mobile" /></div>
              <h1 class="text-2xl uppercase mb-1">${phone.name}</h1>
              <p class="mb-1"><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
              <p class="mb-1"><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
              <p class="mb-1"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
              <p class="mb-1"><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
              <p class="mb-1"><span class="font-bold">Slug: </span>${phone.slug}</p>
              <p class="mb-1"><span class="font-bold">Release date: </span>${phone.releaseDate}</p>
              <p><span class="font-bold">Brand: </span>${phone.brand}</p>`;

  //   function to show the board
  detailShowBoard.showModal();
};
loadPhones();
