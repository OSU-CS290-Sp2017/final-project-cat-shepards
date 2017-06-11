// var catContainer = document.getElementsByClassName ('cat-container');
// catContainer.addEventListener ('click', function openCatModal(){
// 	if(event.target.classList.contains("cat-item")){
//
// 	}

/*************** Make the modal appear upon click **************/

var modalBackdrop = document.getElementById('modal-backdrop');
var addCatModal = document.getElementById('create-cat-modal');

function handleAddCatButtonClick (event) {
	/*=== Make backdrop appear upon click ===*/
	modalBackdrop.classList.remove('hidden');

	/*=== Make add cat modal appear upon click ===*/
	addCatModal.classList.remove('hidden');
}

var addCatButton = document.getElementById('add-cat-button');
addCatButton.addEventListener('click', handleAddCatButtonClick);

/************** Hide add cat modal ***************************/
function handleModalCloseButtonClick(event) {
	/*=== Make modal & backdrop hidden && clear out text fields ===*/
	modalBackdrop.classList.add('hidden');

	/*=== Make add cat modal hidden ===*/
	addCatModal.classList.add('hidden');
	newCatURL.value = null;
	newCatDescription.value = null;
	newCatAuthor.value = null;
}

var modalCloseButton = document.querySelector('.modal-close-button');
modalCloseButton.addEventListener('click', handleModalCloseButtonClick);

function handleModalCancelButtonClick(event) {
	/*=== Make modal & backdrop hidden && clear out  fields ===*/
	modalBackdrop.classList.add('hidden');

	/*=== Make add cat modal hidden ===*/
	addCatModal.classList.add('hidden');
	newCatURL.value = null;
	newCatDescription.value = null;
	newCatAuthor.value = null;
}

var modalCancelButton = document.querySelector('.modal-cancel-button');
modalCancelButton.addEventListener('click', handleModalCancelButtonClick);

var newCatURL = document.getElementById('cat-url-input');
var newCatDescription = document.getElementById('cat-description-input');
var newCatAuthor = document.getElementById('cat-author-input');

/*********** STILL NEED TO HANDLE 'modal-accept-button' CLICKS ********************/



/*************** Search bar stuff ********************/

function handleSearchInput(event) {

	var arrayOfCats = document.getElementsByClassName('cat-card');
	var arrayOfCatCaptions = document.getElementsByClassName('cat-caption');
	var arrayOfCatAuthors = document.getElementsByClassName('cat-author');


	var searchInput = this.value.toLowerCase();


	console.log("****Search Input: ", searchInput);

	for(var i = 0; i < arrayOfCatCaptions.length; i++) {
		var currCatCaption = arrayOfCatCaptions[i].textContent.toLowerCase();
		var currCatAuthor = arrayOfCatAuthors[i].textContent.toLowerCase();
		var currCat = arrayOfCats[i];

		 console.log("CurrentCatText: ", currCatCaption);
		 console.log("CurrentCatAuthor: ", currCatAuthor);

		//If the search value is not in the Cat text or author
		if((currCatCaption.indexOf(searchInput) === -1) && (currCatAuthor.indexOf(searchInput) === -1)) {
			console.log("====Search input not found=====");
			currCat.classList.add('hidden');
			// currCat.style.display = 'none';

		}
		else {
			console.log("!!!!Search input is found!!!!");
			currCat.classList.remove('hidden');

		}

	}
}

var userSearchInput = document.getElementById('navbar-search-input');
userSearchInput.addEventListener('input', handleSearchInput);
// Voting Code

//select all catCards
var catCard = document.getElementsByClassName('cat-card-photo');

function upvote(){
	// var vote = event.target.parentNode.parentNode.firstChild;
	var dataID = event.target.parentNode.getAttribute('dataID').toString();

	var postRequest = new XMLHttpRequest();
	postRequest.open('POST', "/upvote");
	postRequest.setRequestHeader('Content-Type', 'application/json');

	var postBody = {
		dataID: dataID
	};
	postRequest.send(JSON.stringify(postBody));

	postRequest.addEventListener('load', function(event) {
		var error;
		if (event.target.status !== 200){
			error = event.target.response;
		} else {
			location.reload();
		}
	});
}

//add click event to each car photo
for(var i = 0; i<catCard.length; i++){
	(function(index){
		catCard[index].addEventListener("click", function() {
			console.log("clicked on cat number ", index);
			console.log("image url :", catCard[index].src);
			var cat = catCard[index];
			var url = cat.src;
			window.open(url);
			//postRequest.setRequestHeader('cat-card-content', 'application/josn');

		})
	})(i);
}


window.addEventListener('DOMContentLoaded', function (event) {

	var upvoteButtons = document.getElementsByClassName('upvote-heart');
	for (var i = 0; i < upvoteButtons.length; i++) {
		upvoteButtons[i].addEventListener('click', upvote)
	}


});
