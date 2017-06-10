// var catContainer = document.getElementsByClassName ('cat-container');
// catContainer.addEventListener ('click', function openTwitModal(){
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

// Voting Code

function upvote(){
	// var vote = event.target.parentNode.parentNode.firstChild;
	var index = event.target.parentNode.getAttribute('data-index');

	var postRequest = new XMLHttpRequest();
	postRequest.open('POST', "/upvote");
	postRequest.setRequestHeader('Content-Type', 'application/json');

	var postBody = {
		index: index
	};
	postRequest.send(JSON.stringify(postBody));

	postRequest.addEventListener('load', function(event) {
		var error;
		if (event.target.status !== 200){
			error = event.target.response;
		}
		var newVote = (JSON.parse(postRequest.response)[0]);
		location.reload();
	});
}




window.addEventListener('DOMContentLoaded', function (event) {

	var upvoteButtons = document.getElementsByClassName('upvote-heart');
	for (var i = 0; i < upvoteButtons.length; i++) {
		upvoteButtons[i].addEventListener('click', upvote)
	}


});
