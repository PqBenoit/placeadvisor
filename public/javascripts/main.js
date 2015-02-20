$(document).ready(function(){
	$('.alert-info').hide();

	var xmlhttp; 

	$('.remove-button').on('click', function(){

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open('DELETE', 'http://localhost:3000/reviews/' + $(this).attr('data-id'), true);
		xmlhttp.send(null);

		location.reload();

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
});
