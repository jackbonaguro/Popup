var postData = [];
var eventData = [];

$(document).ready(function() {
	populateTable();
});

function populateTable() {
	var postTableContent = '';
	$.getJSON('/api/posts', function(data) {
		postData = data;
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

	var eventTableContent = '';
	$.getJSON('/api/events', function(data) {
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