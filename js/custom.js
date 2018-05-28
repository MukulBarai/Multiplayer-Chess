
var http = '';
for(var i = 0; i < 8; i++){
  http += '<tr>';
  for(var j = 0; j < 8; j++){
    http += '<td></td>';
  }
  http += '</tr>';
}

$('table').append(http);
