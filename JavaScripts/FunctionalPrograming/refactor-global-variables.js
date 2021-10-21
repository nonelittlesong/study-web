// The global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// Change code below this line
function add (bookList, bookName) {

  return bookList.concat(bookName);
  
  // Change code above this line
}

// Change code below this line
function remove (bookList, bookName) {
  var book_index = bookList.indexOf(bookName);
  if (book_index >= 0) {
    let result = bookList.slice(0);
    result.splice(book_index, 1);
    return result;
    // Change code above this line
    }
}

var newBookList = add(bookList, 'A Brief History of Time');
var newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
console.log(newerBookList);
var newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');
console.log(newestBookList);

console.log(bookList);
