$(document).ready(function(){
	$('.alert-info').hide();

	var xmlhttp; 

	$('.remove-button').on('click', function(){

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open('DELETE', 'http://localhost:3000/reviews/' + $(this).attr('data-id'), true);
		xmlhttp.send(null);

		location.reload();
	});

	$('.add-button').on('click', function(e){
		e.preventDefault();

		var $inputs = $('.form-creation :input');

		var data = [];
		$inputs.each(function(index) {
			if(!$(this).val())
				$(this).css({
					border: "solid 1px #fab4b4"
				});
			else
				$(this).css({
					border: "solid 1px #ccc"
				});
				data.push($(this).val());
		});

		$.ajax({
			url: "http://localhost:3000/reviews/",
			data: {
				name: data[0],
				placeType: data[1],
				stars: data[2]
			},
			type: 'POST',
			dataType: 'json',
			success: function(response){
				$('.alert-info').fadeIn(300);
			},
			error: function(error){

			}
		});

	});

	$('.edit-button').on('click', function(e){
		
		e.preventDefault();

		var $inputs = $('.form-edition :input');

		var data = [];
		$inputs.each(function(index) {
			data.push($(this).val());
		});

		$.ajax({
			url: "http://localhost:3000/reviews/" + $(this).attr('data-id'),
			data: {
				name: data[0],
				placeType: data[1],
				stars: data[2]
			},
			type: 'PUT',
			dataType: 'json',
			success: function(response){
				$('.alert-info').fadeIn(300);
			},
			error: function(error){

			}
		});
	});

	$('.search-button').on('click', function(e){
		
		e.preventDefault();

		var $inputs = $('.form-edition :input');

		var data = [];
		$inputs.each(function(index) {
			data.push($(this).val());
		});

		$.ajax({
			url: "http://localhost:3000/reviews/search",
			data: {
				name: data[0],
				placeType: data[1],
				stars: data[2]
			},
			type: 'GET',
			dataType: 'json',
			success: function(response){
				$('.alert-info').fadeIn(300);
			},
			error: function(error){

			}
		});
	});
});
