function isValid(sample){
    if (sample.length > 0 && typeof sample === 'string'){
        return true;
    } else {
        return false;
    }
}

function capitalizeWords(str){
    // Split the string into an array of words
    const words = str.split(" ");
  
    // Capitalize the first character of each word and make the rest lowercase
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
    }
  
    // Join the words back into a single string
    return words.join(" ");
}

function capitalizeFirstWord(str) {
    // Convert the string to lowercase
    str = str.toLowerCase();

    // Get the first character of the string and convert it to uppercase
    var firstChar = str.charAt(0).toUpperCase();

    // Get the rest of the string (excluding the first character)
    var restOfString = str.slice(1);

    // Return the capitalized string
    return firstChar + restOfString;
}

function apaBookCitation(lname = "", fname = "", book_title = "", publisher = "", year = ""){
    
    // The below statements will format the citation according to the provided parameters and their validities.
    // if nonempty string, we will include that value in the citation, formatted appropriately. Otherwise, we exclude it.

    if (isValid(lname)){
        if (isValid(fname)){
            formatted_lname = `${capitalizeWords(lname)}, `;
        } else {
            formatted_lname = `${capitalizeWords(lname)}. `; // If a first name is invalid, the citation will still be formatted well.
        }
    } else {
        formatted_lname = "";
    }

    // Split the first and middle names into an array
    const names = fname.split(" ");

    // Initialize the formatted first and middle names as an empty string
    formatted_fname = "";
    formatted_middle_names = "";

    // If the array has at least one element (i.e. the first name is not empty),
    // capitalize the first character and add it to the formatted first name
    if (names.length > 0) {
        formatted_fname = `${capitalizeWords(names[0].charAt(0))}. `;
    }

    // If the array has more than one element (i.e. there are middle names),
    // capitalize the first character of each middle name and add it to the formatted middle names
    if (names.length > 1) {
        for (let i = 1; i < names.length; i++) {
            formatted_middle_names += `${capitalizeWords(names[i].charAt(0))}. `;
        }
    }

    if (isValid(book_title)){
        formatted_book_title = `<i>${capitalizeFirstWord(book_title)}</i>. `;
    } else {
        return "Need to include name of book!";
    }

    if (isValid(publisher)){
        formatted_publisher = `${capitalizeWords(publisher)}. `;
    } else {
        formatted_publisher = "";
    }

    // YEAR
    checked_year = parseInt(year);
    if (isValid(checked_year.toString()) && year != "") { // Ensures that user provides a number.
        formatted_year = `(${year}).`;
    } else {
        formatted_year = "";
    }

    // MONTH and DAY are not included in APA style citations for books
    if (isValid(formatted_year)){
        return `${formatted_lname}${formatted_fname}${formatted_middle_names}${formatted_year} ${formatted_book_title}${formatted_publisher}`;
    } else {
        return `${formatted_lname}${formatted_fname}${formatted_middle_names}${formatted_year}${formatted_book_title}${formatted_publisher}`;
    }

}

// console.log(apaBookCitation("Smith", "John Michael", "The History of Time", "University Press", "2002"));
console.log(apaBookCitation("voda", "ryan", "Ryan's Autobiography", "Penguin Publishing", "2023"));