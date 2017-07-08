$(document).ready(function()
{
	get_data();
	$("#quote_button").click(get_data);
	$("a").attr("target", "_blank");
});

function get_data()
{
	var quote_url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp";
	$(".buttons").css("display", "none");
	$("#quote_loading").css("display", "initial");
	$.ajax
	({
		url: quote_url + "&jsonp=render_page",
		type: "GET",
		dataType: "jsonp",
		jsonpCallback: "render_page"
	});
}

function random_number(start, end)
{
	return Math.floor(Math.random()*(end-start+1));
}

function render_page(data)
{
	var red1 = random_number(0, 100);
	var green1 = random_number(0, 100);
	var blue1 = random_number(0, 100);

	var color1 = "rgb(" + String(red1) + "," + String(green1) 
											+ "," + String(blue1) + ")";
	var color2 = "rgb(" + String(red1+155) + "," + String(green1+155)
											+ "," + String(blue1+155) + ")";
	
	var author = (data.quoteAuthor === "") ? "Unknown" : data.quoteAuthor;

	var tweet_uri = "https://twitter.com/intent/tweet?text=";

	$("body").css("background-color", color1);
	$("h1").css("color", color2);
	$("#quote_div").css("color", color1);
	$("#quote_div").css("background-color", color2);
	$(".buttons").css("background-color", color1);
	$(".buttons").css("color", color2);

	$(".buttons").css("display", "initial");
	$("#quote_loading").css("display", "none");

	$("#quote_text").html(data.quoteText);
	$("#quote_author").html("-"+author);
	$("#quote_div").css("display", "initial");
	$("#tweet").css("display", "initial");

	tweet_uri += encodeURIComponent(data.quoteText+"  (" + author + ")");

	$("#twitter_link").attr({"href": tweet_uri});
}
