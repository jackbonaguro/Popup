var userData = {};

$(function() {
	populateTable();
});

function populateTable() {
	var userTableContent = '';
	$.getJSON('/json/u/' + user_name, function(data) {
		userData = data;

		userTableContent += '<tr>';
		userTableContent += '<td>' + data.username + '</td>';
		userTableContent += '<td>' + data.bio
			+ '</td>';
		userTableContent += '<td>' + data.datecreated + '</td>';
		userTableContent += '</tr>';

		$('#userTable tbody').html(userTableContent);
	});

	var postTableContent = '';
	$.getJSON('/json/u/' + user_name + '/recent', function(data) {
		userData.posts = data;

		$.each(data, function() {
			postTableContent += '<tr>';
			postTableContent += '<td><a href="/p/' + this.id
				+ '"><img src="/images/' + this.imgsrc
				+ '" class="preview"/></a></td>';
			postTableContent += '<td>' + this.datecreated + '</td>';
			postTableContent += '</tr>';
		});
		$('#postTable tbody').html(postTableContent);
	});
};