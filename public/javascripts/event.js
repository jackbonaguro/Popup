var eventData = {};

$(function() {
	populateTable();
});

function populateTable() {
	var eventTableContent = '';
	$.getJSON('/json/e/' + event_name, function(data) {
		eventData = data;

		eventTableContent += '<tr>';
		eventTableContent += '<td>' + data.eventname + '</td>';
		eventTableContent += '<td>' + data['description']
			+ '</td>';
		eventTableContent += '<td>' + data.datecreated + '</td>';
		eventTableContent += '</tr>';

		$('#eventTable tbody').html(eventTableContent);
	});

	var postTableContent = '';
	$.getJSON('/json/e/' + event_name + '/posts', function(data) {
		eventData.posts = data;

		$.each(data, function() {
			postTableContent += '<tr>';
			postTableContent += '<td><a href="/u/' + this.username
				+ '">' + this.username + '</a></td>';
			postTableContent += '<td><a href="/p/' + this.id
				+ '"><img src="/images/' + this.imgsrc
				+ '" class="preview"/></a></td>';
			postTableContent += '<td>' + this.datecreated + '</td>';
			postTableContent += '</tr>';
		});
		$('#postTable tbody').html(postTableContent);
	});

	var userTableContent = '';
	$.getJSON('/json/e/' + event_name + '/users', function(data) {
		eventData.users = data;

		$.each(data, function() {
			userTableContent += '<tr>';
			userTableContent += '<td><a href="/u/' + this.username
				+ '">' + this.username + '</a></td>';
			userTableContent += '<td>' + this.bio + '</td>';
			userTableContent += '<td>' + this.datecreated + '</td>';
			userTableContent += '</tr>';
		});
		$('#userTable tbody').html(userTableContent);
	});
};