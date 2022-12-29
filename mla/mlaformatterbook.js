function capitalizeWords(str){
    // Split the string into an array of words
    const words = str.split(" ");
  
    // Capitalize the first character of each word and make the rest lowercase
    for (let i = 0; i < words.length; i++) {
        if (words[i]) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
        }
    }
  
    // Join the words back into a single string
    return words.join(" ");
}

function isValid(str){
    if (str.length > 0 && typeof str === 'string'){
        return true;
    } else {
        return false;
    }
}

function mlaBookCitation(lname = "", fname = "", book_title = "", publisher = "", month = "", day = "", year = ""){
    
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

    if (isValid(fname)){
        formatted_fname = `${capitalizeWords(fname)}. `;
    } else {
        formatted_fname = "";
    }

    if (isValid(book_title)){
        italics_book_title = book_title.italics();
        formatted_book_title = `${italics_book_title}. `;
    } else {
        return "Need to include name of book!";
    }

    if (isValid(publisher)){
        formatted_publisher = publisher;
    } else {
        formatted_publisher = "";
    }

    // YEAR
    checked_year = parseInt(year);
    if (isValid(checked_year.toString())) { // Ensures that user provides a number.
        formatted_year = year.toString();
    } else {
        formatted_year = "";
    }

    // MONTH
    if (isValid(formatted_year)){ // Code only runs if any given value for month has an associated year.
        const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
        // if the input is a number, convert it to a string and get the corresponding month name
        if (typeof month === 'number'){
            // check that input is not decimal, and it is within range of valid month numbers
            if (Number.isInteger(month) && (1 <= month <= 12)) {
                formatted_month = monthNames[month - 1];
            } else {
                formatted_month = "";
            }
        } else if (isValid(month)){ 
            abb_check = capitalizeWords(month);
            if (abb_check.length >= 5){
                abb_check = abb_check.slice(0,3) + '.';
            }
            formatted_month = abb_check;
        } else { 
            // If it's not a nonempty string or a proper number, then the user is trolling.
            formatted_month = "";
        }
    } else {
        formatted_month = "";
    }

    // DAY
    if (isValid(formatted_month)){ // Code only runs if any given value for day has an associated month.
        checked_day = parseInt(day);
        if (isValid(checked_day.toString()) && checked_day === checked_day) { // Checks to make sure that value for day is actually a number (NaN can't equal itself)
            formatted_day = checked_day.toString() + " ";
            formatted_month += " ";
        } else {
            formatted_day = "";
            formatted_month += " ";
        }
    } else {
        formatted_day = "";
        formatted_month += " ";
    }

    // Prepares formatted_publisher, depending on if we have a date.
    if (isValid(formatted_publisher)){
        if (!isValid(formatted_year)){
            formatted_publisher += ".";
        } else {
            formatted_publisher += ", ";
            formatted_year += ".";
        }
    }

    return formatted_lname + formatted_fname + formatted_book_title + formatted_publisher + formatted_day + formatted_month + formatted_year;

}

/*
const citation1 = mlaBookCitation(lname = "doe", fname = "jOhn", book_title = "The 13th Night", publisher = "Penguin Publishing", month = "december", day = 31, year = 2000);
const citation2 = mlaBookCitation(lname = "silly", fname = "", book_title = "The 14th Night", publisher = 1000, month = "", day = "31", year = "2000");
const citation3 = mlaBookCitation(lname = 420, fname = "billy", book_title = "The 15th Night", publisher = "good publisher", month = "december", day = "", year = "2000");
const citation4 = mlaBookCitation(lname = "", fname = "", book_title = "The 16th Night", publisher = "", month = "", day = "", year = "");
const citation5 = mlaBookCitation(lname = "Sir", fname = "Yes", book_title = "The 17th Night", publisher = "Taylor Swift Inc.", month = "12", day = "", year = "2000");
const citation6 = mlaBookCitation(lname = "Sir", fname = "No", book_title = "", publisher = "Queen is overrated", month = 12, day = "31", year = "2000");
const citation7 = mlaBookCitation(lname = "", fname = "", book_title = "", publisher = "", month = "december", day = "31", year = "2000");
const citation8 = mlaBookCitation('smith', 'john', 'the great gatsby', 'Random House', 'January', 1, 1925);
const citation9 = mlaBookCitation(lname = "voda", fname = "ryan", book_title = "Ryan's Autobiography", publisher = "Penguin Publishing", month = "", day = "", year = "2023");

console.log(citation1);
console.log(citation2);
console.log(citation3);
console.log(citation4);
console.log(citation5);
console.log(citation6);
console.log(citation7);
console.log(citation8);
console.log(citation9);
*/

const citation1 = mlaBookCitation(lname = "doe", fname = "jOhn", book_title = "The 13th Night", publisher = "Penguin Publishing", month = "december", day = "31", year = "2000");
console.log(citation1);