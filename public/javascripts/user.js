var userData = {};

$(function() {
	populateTable();
});

function populateTable() {
	var userTableContent = '';
	$.getJSON('/api/u/' + user_name, function(data) {
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
	$.getJSON('/api/u/' + user_name + '/posts', function(data) {
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

	var eventTableContent = '';
	$.getJSON('/api/u/' + user_name + '/events', function(data) {
		eventData = data;
		$.each(data, function() {
			eventTableContent += '<tr>';
			eventTableContent += '<td><a href="/e/' + this.eventname
				+ '">' + this.eventname + '</a></td>';
			eventTableContent += '<td>' + this['description']
				+ '</td>';
			eventTableContent += '<td>' + this.datecreated + '</td>';
			eventTableContent += '</tr>';
		});
		$('#eventTable tbody').html(eventTableContent);
	});
};