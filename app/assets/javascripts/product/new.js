function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
} 

document.onkeypress = stopRKey; 

function fileList()
{
	for(i=0 ; i<5 ; i++)
	{
		obj = $('#product_photos_attributes_'+i+'_id');
		if(obj.length != 0)
			$('#product_photos_attributes_'+i+'_photo')[0].type = 'hidden';
	}
}

function set_gender()
{
	value = $("#product_gender").val();
	if(value == "men")
		$($("#gender_checkbox .btn")[0]).toggleClass("active");
	else if(value == "women")
		$($("#gender_checkbox .btn")[1]).toggleClass("active");
	else if(value == "all")
	{
		$($("#gender_checkbox .btn")[0]).toggleClass("active");
		$($("#gender_checkbox .btn")[1]).toggleClass("active");
	}
}

function gender_select()
{
	list = $('#gender_checkbox .btn.active');

	if(list.length == 1)
		$('#product_gender').val(list[0].id);		
	else if(list.length == 2)
		$('#product_gender').val('all');
	else
		$('#product_gender').val('N/A');		
}

function size_list_change()
{
	table = $('#size_table tbody tr');
	list = $('#size_list').val().split(",");

	for(i=1 ; i<table.length ; i++)
	{
		$(table[i]).hide().remove();
	}

	table = $('#size_table tbody');
	if(list.length==1 && list[0] == "")
		list = [];
	for (i = 0 ; i < list.length ; i++)
	{
		str = "<tr><td><b>" + list[i] + "</b></td><td><input type='number'/></td></tr>";
		html = $.parseHTML(str);
		table = table.append(html);
	}
}

function form_submit()
{
	list = size_table_to_json();
	obj = {};
	for(i=1 ; i<list.length ; i++)
	{
		obj[list[i][0].html()] = list[i][1].val();
	}
	$('#product_sizes').val(JSON.stringify(obj));
	gender_select();
	$('form').submit();
}

function size_table_to_json()
{
	var tbl = $('#size_table tr').get().map(function(row) {
		return $(row).find('td').get().map(function(cell) {
			return $(cell).children();
		});
	});
	return tbl;
}

function json_to_table()
{
	table = $('#size_table tbody tr');
	list = JSON.parse($('#product_sizes').val());

	table = $('#size_table tbody');
	sizes = [];
	for (key in list)
	{
		str = "<tr><td><b>" + key + "</b></td><td><input type='number' value='" + list[key] + "' /></td></tr>";
		html = $.parseHTML(str);
		table = table.append(html);
		sizes.push(key);
	}
	$("#size_list").val(sizes.join(','));
}

