userData = {};

$(function() {
	populateHtml();
});

function populateHtml() {
	$('#username').attr('value', current_user.username);
	$('#bio').attr('value', current_user.bio);

	var postTableContent = '';
	$.getJSON('/api/u/' + current_user.username + '/posts', function(data) {
		userData.posts = data;

		$.each(data, function() {
			postTableContent += '<tr>';
			postTableContent += '<td><a href="/p/' + this.id
				+ '"><img src="/images/' + this.imgsrc
				+ '" class="preview"/></a></td>';
			postTableContent += '<td>' + this.datecreated + '</td>'
			postTableContent += '<td><button onclick="deletePost(' + this.id
				+ ')">Delete</button></td>';
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
			if(current_user.id == this.owner) {
				eventTableContent += '<td><button onclick="deleteEvent(' + this.id
					+ ')">Delete</button></td>';
			}
			eventTableContent += '</tr>';
		});
		$('#eventTable tbody').html(eventTableContent);
	});
}

function deletePost(id) {
	var pdata = 'postid='+id;
	$.ajax({
		type: 'DELETE',
		url: '/api/delpost',
		data: pdata,
		success: function(msg) {//TODO: Remove?
		}
	});
	window.location.replace('/edit');
}

function deleteEvent(id) {
	var edata = 'eventid='+id;
	$.ajax({
		type: 'DELETE',
		url: '/api/delevent',
		data: edata,
		success: function(msg) {//TODO: Remove?
		}
	});
	window.location.replace('/edit');
}