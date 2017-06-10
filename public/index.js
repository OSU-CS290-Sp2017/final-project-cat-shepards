// var catContainer = document.getElementsByClassName ('cat-container');
// catContainer.addEventListener ('click', function openTwitModal(){
// 	if(event.target.classList.contains("cat-item")){
//
// 	}


	/*var backdrop = document.getElementById('modal-backdrop');
	var createTwitModal = document.getElementById('create-twit-modal');
	var closeCreateTwitModal = document.querySelector('.modal-close-button');
	var cancelCreateTwitModal = document.querySelector('.modal-cancel-button');
	var createTwit = document.querySelector('.modal-accept-button');
	var twitText = document.getElementById('twit-text-input');
	var twitAuthor = document.getElementById('twit-attribution-input');
	createTwitModal.classList.remove('hidden');
	backdrop.classList.remove('hidden');
	closeCreateTwitModal.addEventListener ('click', function closeTwitModal(){
		backdrop.classList.add ('hidden');
		createTwitModal.classList.add ('hidden');
		twitText.value = null;
		twitAuthor.value = null;
		closeCreateTwitModal.removeEventListener ('click', closeTwitModal);			//Am I doing this right?
	})
	cancelCreateTwitModal.addEventListener ('click', function closeTwitModal(){
		backdrop.classList.add ('hidden');
		createTwitModal.classList.add ('hidden');
		twitText.value = null;
		twitAuthor.value = null;
		closeCreateTwitModal.removeEventListener ('click', closeTwitModal);
	})
	createTwit.addEventListener ('click', function createNewTwit(){
		if(twitText.value == "" || twitAuthor.value == ""){
			alert('Please enter text and an author for the twit.');
		}
		else{
			var newTwit = document.createElement('article');
			var newTwitIcon = document.createElement('div');
			var newTwitContent = document.createElement('div');
			var newTwitText = document.createElement('p');
			var newTwitAttribution = document.createElement('p');
			var newTwitAuthor = document.createElement('a');
			var newIconImage = "<i class=\"fa fa-bullhorn\"></i>"
			newTwit.classList.add('twit');
			newTwitIcon.classList.add('twit-icon');
			newTwitIcon.innerHTML = newIconImage;
			newTwitContent.classList.add('twit-content');
			newTwitText.classList.add('twit-text');
			newTwitText.textContent = twitText.value;
			newTwitAttribution.classList.add('twit-attribution');
			newTwitAuthor.setAttribute('href', '#');
			newTwitAuthor.textContent = twitAuthor.value;
			newTwit.appendChild(newTwitIcon);
			newTwitContent.appendChild(newTwitText);
			newTwitContent.appendChild(newTwitAttribution);
			newTwitAttribution.appendChild(newTwitAuthor);
			newTwit.appendChild(newTwitContent);
			var twitContainer = document.getElementsByClassName('twit-container');
			twitContainer[0].appendChild(newTwit);
			backdrop.classList.add ('hidden');
			createTwitModal.classList.add ('hidden');
			createTwit.removeEventListener ('click', createNewTwit);
			twitText.value = null;
			twitAuthor.value = null;
		}
	})
});*/

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
		console.log(newVote);
		// location.reload();
	});
}




window.addEventListener('DOMContentLoaded', function (event) {

	var upvoteButtons = document.getElementsByClassName('upvote-heart');
	for (var i = 0; i < upvoteButtons.length; i++) {
		upvoteButtons[i].addEventListener('click', upvote)
	}


});
