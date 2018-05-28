const boardSize = 8;
const gridWidth = 50;
const gridHeight = 50;
var playerOne = {name: null, color: 'yellow'};
var playerTwo = {name: null, color: 'limegreen'};
var curPlayer = playerOne;
var selected = null;
var board = [];

initialize();
draw();

function run(){
  setInterval(function(){
    draw();
  }, 50);
}

function initialize(){
  for(var i = 0; i < boardSize; i++){
    var row = [];
    for(var j = 0; j < boardSize; j++){
      if(i % 2 === 0){
        if(j % 2 === 0){
          row.push(new Grid(i, j, 'mediumblue', null));
        }
        else{
          row.push(new Grid(i, j, 'turquoise', null));
        }
      }
      else{
        if(j % 2 === 1){
          row.push(new Grid(i, j, 'mediumblue', null));
        }
        else{
          row.push(new Grid(i, j, 'turquoise', null));
        }
      }
    }
    board.push(row);
  }

  for(var i = 0; i < boardSize; i++){
    board[1][i].piece = new Pawn(playerTwo.color);
  }

  for(var i = 0; i < boardSize; i++){
    board[boardSize-2][i].piece = new Pawn(playerOne.color);
  }
  setPower();
}

function setPower(){
  board[0][3].piece =  new King(playerTwo.color);
  board[0][4].piece =  new Queen(playerTwo.color);
  board[boardSize-1][4].piece =  new King(playerOne.color);
  board[boardSize-1][3].piece =  new Queen(playerOne.color);
  board[0][0].piece =  board[0][boardSize-1].piece =  new Rook(playerTwo.color);
  board[0][1].piece =  board[0][boardSize-2].piece =  new Knight(playerTwo.color);
  board[0][2].piece =  board[0][boardSize-3].piece =  new Bishop(playerTwo.color);
  board[boardSize-1][0].piece =  board[boardSize-1][boardSize-1].piece =  new Rook(playerOne.color);
  board[boardSize-1][1].piece =  board[boardSize-1][boardSize-2].piece =  new Knight(playerOne.color);
  board[boardSize-1][2].piece =  board[boardSize-1][boardSize-3].piece =  new Bishop(playerOne.color);
}

function draw(){
  for(var i = 0; i < boardSize; i++){
    for(var j = 0; j < boardSize; j++){
      var grid = board[i][j];
      var newTd = $('table').find('tr').eq(i).find('td').eq(j);
      newTd.css({background: grid.color});

      if(grid.isValid){
        var newTd = $('table').find('tr').eq(grid.tr).find('td').eq(grid.td);
        newTd.css({'border-radius': '50px', background: 'lime'});
      }
      else{
        var newTd = $('table').find('tr').eq(grid.tr).find('td').eq(grid.td);
        newTd.css({background: grid.color, 'border-radius': 0});
      }

      if(grid.piece !==  null){
        var piece = board[i][j].piece;
        newTd.css({color: piece.color});
        newTd.html(piece.text);
      }
      else{
        newTd.html('');
      }
    }
  }
}

function Grid(tr, td, color, piece){
  this.tr = tr;
  this.td = td;
  this.color = color;
  this.piece = piece;
  this.isValid = false;

  this.getValid = function(){
    return this.piece.getValid(tr, td);
  }
}

function Pawn(color){
  this.color = color;
  this.text = '♟';

  this.getValid = function(tr, td){
    if(curPlayer.color === playerTwo.color){
      if(tr+1 < boardSize && td+1 < boardSize){
        if(board[tr+1][td+1].piece !==  null){
          if(board[tr+1][td+1].piece.color !== curPlayer.color){
            board[tr+1][td+1].isValid = true;
          }
        }
      }

      if(td-1 >= 0 && tr+1 < boardSize){
        if(board[tr+1][td-1].piece !== null){
          if(board[tr+1][td-1].piece.color !== curPlayer.color){
            board[tr+1][td-1].isValid = true;
          }
        }
      }

      if(tr+1 < boardSize){
        if(board[tr+1][td].piece === null){
          board[tr+1][td].isValid = true;
        }
        else{
          return
        }
      }

      if(tr+2 < boardSize){
        if(board[tr+2][td].piece === null){
          board[tr+2][td].isValid = true;
        }
      }
    }

    else{
      if(td+1 < boardSize && tr-1 >= 0){
        if(board[tr-1][td+1].piece !==  null){
          if(board[tr-1][td+1].piece.color !== curPlayer.color){
            board[tr-1][td+1].isValid = true;
          }
        }
      }

      if(td-1 >= 0 && tr-1 >= 0){
        if(board[tr-1][td-1].piece !==  null){
          if(board[tr-1][td-1].piece.color !== curPlayer.color){
            board[tr-1][td-1].isValid = true;
          }
        }
      }

      if(tr-1 >= 0){
        if(board[tr-1][td].piece  ===  null){
          board[tr-1][td].isValid = true;
        }
        else{
          return
        }
      }

      if(tr-2 >= 0){
        if(board[tr-2][td].piece  ===  null){
          board[tr-2][td].isValid = true;
        }
      }
    }

  }
}

function King(color){
  this.color = color;
  this.text = '♚';

  this.getValid = function(tr, td){
    for(var row=tr-1; row >= 0; row--){
      if(board[row][td].piece  ===  null){
        board[row][td].isValid = true;
      }
      else if(board[row][td].piece.color !==  curPlayer.color){
        board[row][td].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr+1; row < boardSize; row++){
      if(board[row][td].piece  ===  null){
        board[row][td].isValid = true;
      }
      else if(board[row][td].piece.rowor !==  curPlayer.rowor){
        board[row][td].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var col=td-1; col >= 0; col--){
      if(board[tr][col].piece  ===  null){
        board[tr][col].isValid = true;
      }
      else if(board[tr][col].piece.color !==  curPlayer.color){
        board[tr][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var col=td+1; col < boardSize; col++){
      if(board[tr][col].piece  ===  null){
        board[tr][col].isValid = true;
      }
      else if(board[tr][col].piece.color !==  curPlayer.color){
        board[tr][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr+1,col=td+1; row< boardSize && col < boardSize; row++,col++){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !== curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr-1,col=td+1; row >= 0 && col < boardSize; row--,col++){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][row].piece.color !==  curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr-1,col=td-1; col >= 0 && row >= 0; col--,row--){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !==  curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr+1,col=td-1; row< boardSize && col >= 0; row++,col--){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !== curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

  }
}

function Queen(color){
  this.color = color;
  this.text = '♛';

  this.getValid = function(tr, td){
    if(tr+1 < boardSize){
      if(board[tr+1][td].piece === null){
        board[tr+1][td].isValid = true;
      }
      else if(board[tr+1][td].piece.color !==  curPlayer.color){
        board[tr+1][td].isValid = true;
      }
    }

    if(td+1 < boardSize){
      if(board[tr][td+1].piece  ===  null){
        board[tr][td+1].isValid = true;
      }
      else if(board[tr][td+1].piece.color !==  curPlayer.color){
        board[tr][td+1].isValid = true;
      }
    }

    if(tr-1 >= 0){
      if(board[tr-1][td].piece  ===  null){
        board[tr-1][td].isValid = true;
      }
      else if(board[tr-1][td].piece.color !==  curPlayer.color){
        board[tr-1][td].isValid = true;
      }
    }

    if(td-1 >= 0){
      if(board[tr][td-1].piece === null){
        board[tr][td-1].isValid = true;
      }
      else if(board[tr][td-1].piece.color !==  curPlayer.color){
        board[tr][td-1].isValid = true;
      }
    }

    if(tr+1 < boardSize && td+1 < boardSize){
      if(board[tr+1][td+1].piece  ===  null){
        board[tr+1][td+1].isValid = true;
      }
      else if(board[tr+1][td+1].piece.color !==  curPlayer.color){
        board[tr+1][td+1].isValid = true;
      }
    }

    if(tr-1 >= 0 && td+1 < boardSize){
      if(board[tr-1][td+1].piece  ===  null){
        board[tr-1][td+1].isValid = true;
      }
      else if(board[tr-1][td+1].piece.color !==  curPlayer.color){
        board[tr-1][td+1].isValid = true;
      }
    }

    if(tr+1 < boardSize && td-1 >= 0){
      if(board[tr+1][td-1].piece === null){
        board[tr+1][td-1].isValid = true;
      }
      else if(board[tr+1][td-1].piece.color !== curPlayer.color){
        board[tr+1][td-1].isValid = true;
      }
    }

    if(tr-1 >= 0 && td-1 >= 0){
      if(board[tr-1][td-1].piece === null){
        board[tr-1][td-1].isValid = true;
      }
      else if(board[tr-1][td-1].piece.color !== curPlayer.color){
        board[tr-1][td-1].isValid = true;
      }
    }

  }
}

function Knight(color){
  this.color = color;
  this.text = '♞';

  this.getValid = function(tr, td){
    if(tr+2 < boardSize && td+1 < boardSize){
      if(board[tr+2][td+1].piece === null){
        board[tr+2][td+1].isValid = true;
      }
      else if(board[tr+2][td+1].piece.color !== curPlayer.color){
        board[tr+2][td+1].isValid = true;
      }
    }

    if(tr+2 < boardSize && td-1 >= 0){
      if(board[tr+2][td-1].piece === null){
        board[tr+2][td-1].isValid = true;
      }
      else if(board[tr+2][td-1].piece.color !== curPlayer.color){
        board[tr+2][td-1].isValid = true;
      }
    }

    if(tr-2 >= 0 && td+1 < boardSize){
      if(board[tr-2][td+1].piece === null){
        board[tr-2][td+1].isValid = true;
      }
      else if(board[tr-2][td+1].piece.color !== curPlayer.color){
        board[tr-2][td+1].isValid = true;
      }
    }

    if(tr-2 >= 0 && td-1 >= 0){
      if(board[tr-2][td-1].piece === null){
        board[tr-2][td-1].isValid = true;
      }
      else if(board[tr-2][td-1].piece.color !== curPlayer.color){
        board[tr-2][td-1].isValid = true;
      }
    }

    if(tr+1 < boardSize && td+2 < boardSize){
      if(board[tr+1][td+2].piece === null){
        board[tr+1][td+2].isValid = true;
      }
      else if(board[tr+1][td+2].piece.color !== curPlayer.color){
        board[tr+1][td+2].isValid = true;
      }
    }

    if(tr+1 < boardSize && td-2 >= 0){
      if(board[tr+1][td-2].piece === null){
        board[tr+1][td-2].isValid = true;
      }
      else if(board[tr+1][td-2].piece.color !== curPlayer.color){
        board[tr+1][td-2].isValid = true;
      }
    }

    if(tr-1 >= 0 && td+2 < boardSize){
      if(board[tr-1][td+2].piece === null){
        board[tr-1][td+2].isValid = true;
      }
      else if(board[tr-1][td+2].piece.color !== curPlayer.color){
        board[tr-1][td+2].isValid = true;
      }
    }

    if(tr-1 >= 0 && td-2 >= 0){
      if(board[tr-1][td-2].piece === null){
        board[tr-1][td-2].isValid = true;
      }
      else if(board[tr-1][td-2].piece.color !== curPlayer.color){
        board[tr-1][td-2].isValid = true;
      }
    }

  }
}

function Bishop(color){
  this.color = color;
  this.text = '♗';

  this.getValid = function(tr, td){
    for(var row=tr+1,col=td+1; col< boardSize && row < boardSize; col++,row++){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !== curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr+1,col=td-1; col >= 0 && row < boardSize; col--,row++){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !== curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr-1,col=td-1; col >= 0 && row >= 0; col--,row--){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !== curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr-1,col=td+1; col< boardSize && row >= 0; col++,row--){
      if(board[row][col].piece === null){
        board[row][col].isValid = true;
      }
      else if(board[row][col].piece.color !== curPlayer.color){
        board[row][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }
  }
}

function Rook(color){
  this.color = color;
  this.text = '♜';

  this.getValid = function(tr, td){
    for(var col=td-1; col >= 0; col--){
      if(board[tr][col].piece === null){
        board[tr][col].isValid = true;
      }
      else if(board[tr][col].piece.color !== curPlayer.color){
        board[tr][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var col=td+1; col < boardSize; col++){
      if(board[tr][col].piece === null){
        board[tr][col].isValid = true;
      }
      else if(board[tr][col].piece.color !== curPlayer.color){
        board[tr][col].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr-1; row >= 0; row--){
      if(board[row][td].piece === null){
        board[row][td].isValid = true;
      }
      else if(board[row][td].piece.color !== curPlayer.color){
        board[row][td].isValid = true;
        break;
      }
      else{
        break;
      }
    }

    for(var row=tr+1; row < boardSize; row++){
      if(board[row][td].piece === null){
        board[row][td].isValid = true;
      }
      else if(board[row][td].piece.color !== curPlayer.color){
        board[row][td].isValid = true;
        break;
      }
      else{
        break;
      }
    }
  }
}

function changePlayer(){
  if(curPlayer.color === playerOne.color){
    curPlayer = playerTwo;
  }
  else if(curPlayer.color === playerTwo.color){
    curPlayer = playerOne;
  }
}

$('td').on('click', function(){
  var tr = $('table').find('tr').index($(this).parent());
  var td = $(this).parent().find('td').index($(this));
  var grid = board[tr][td];

  if(selected){
    if(selected.tr === tr && selected.td === td){
      unmarkGrids();
      selected = null;
    }
    else{
      if(grid.isValid){
        board[tr][td].piece = board[selected.tr][selected.td].piece;
        board[selected.tr][selected.td].piece = selected = null;
        unmarkGrids();
        changePlayer();
      }
      else if(grid.piece){
        unmarkGrids();
        if(curPlayer.color === grid.piece.color){
          grid.getValid();
          selected = grid;
        }
        else{
          selected = null;
        }
      }
      else{
        unmarkGrids();
        selected = null;
      }
    }
  }
  else{
    if(grid.piece){
      if(curPlayer.color === grid.piece.color){
        grid.getValid();
        selected = grid;
      }
    }
  }

  function unmarkGrids(){
    for(var i = 0; i < boardSize; i++){
      for(var j = 0; j < boardSize; j++){
        board[i][j].isValid = false;
      }
    }
  }
  draw();
});
