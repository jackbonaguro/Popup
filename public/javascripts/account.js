var userData = {};

$(function() {
	populateHtml();
});

function populateHtml() {
	$('#userlink').html(current_user.username);
	$('#userlink').attr("href", "/u/" + current_user.username);
	$('#bio').html(current_user.bio);

	var postTableContent = '';
	$.getJSON('/api/u/' + current_user.username + '/posts', function(data) {
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
	$.getJSON('/api/u/' + current_user.username + '/events', function(data) {
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
