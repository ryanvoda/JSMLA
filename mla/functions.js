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

function mlaWebsiteCitation(lname = "", fname = "", article_title = "", site_title = "", month = "", day = "", year = "", url = ""){
    // Ensures user is providing proper parameters to the function.
    const params = [lname, fname, article_title, site_title, month, day, year, url];
    count = 0;
    for (let i = 0; i < params.length; i++){
        if (isValid(params[i])){
            count++;
        }
    }

    if (count === 0){
        return "Pass arguments into function!";
    } else if (isValid(article_title) === false && isValid(site_title) === false){
        return "Need to include name of web article or site!";
    } else if (isValid(url) === false){
        return "Need to include url!";
    }

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

    if (isValid(article_title)){
        formatted_article_title = `"${article_title}." `;
    } else {
        formatted_article_title = "";
    }

    if (isValid(site_title)){
        italics_site_title = site_title.italics();
        formatted_site_title = `${italics_site_title}, `;
    } else {
        formatted_site_title = "";
    }

    // YEAR
    const parsedYear = parseInt(year);
    if (Number.isInteger(parsedYear)) {
        formatted_year = year.toString() + ", ";
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
                formatted_month = monthNames[month - 1] + " ";
            } else {
                formatted_month = "";
            }
        } else if (isValid(month)){ 
            abb_check = capitalizeWords(month);
            if (abb_check.length >= 5){
                abb_check = abb_check.slice(0,3) + '.';
            }
            formatted_month = abb_check + " ";
        } else { 
            // If it's not a nonempty string or a proper number, then the user is trolling.
            month = "";
        }
    } else {
        formatted_month = "";
    }

    // DAY
    const parsedDay = parseInt(day);
    if (Number.isInteger(parsedDay)) {
        if (parsedDay >= 1 && parsedDay <= 31) {
            formatted_day = `${parsedDay} `;
        } else {
            formatted_day = "";
        }
    } else {
        formatted_day = "";
    }

    formatted_url = url + ".";

    return formatted_lname + formatted_fname + formatted_article_title + formatted_site_title + formatted_day + formatted_month + formatted_year + formatted_url;

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
        formatted_publisher = `${capitalizeWords(publisher)}.`;
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

function apaWebsiteCitation(lname = "", fname = "", article_title = "", site_title = "", month = "", day = "", year = "", url = ""){
    // Ensures user is providing proper parameters to the function.
    const params = [lname, fname, article_title, site_title, month, day, year, url];
    count = 0;
    for (let i = 0; i < params.length; i++){
        if (isValid(params[i])){
            count++;
        }
    }

    if (count === 0){
        return "Pass arguments into function!";
    } else if (isValid(article_title) === false && isValid(site_title) === false){
        return "Need to include name of web article or site!";
    } else if (isValid(url) === false){
        return "Need to include url!";
    }

    // The below statements will format the citation according to the provided parameters and their validities.
    // if nonempty string, we will include that value in the citation, formatted appropriately. Otherwise, we exclude it.
    

    // LAST NAME
    if (isValid(lname)){
        if (isValid(fname)){
            formatted_lname = `${capitalizeWords(lname)}, `;
        } else {
            formatted_lname = `${capitalizeWords(lname)}. `; // If a first name is invalid, the citation will still be formatted well.
        }
    } else {
        formatted_lname = "";
    }

    // FIRST, MIDDLE INITIALS
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

    // ARTICLE TITLE
    if (isValid(article_title)){
        italics_article_title = article_title.italics();
        formatted_article_title = `${italics_article_title}. `;
    } else {
        formatted_article_title = "";
    }

    // SITE TITLE
    if (isValid(site_title)){
        formatted_site_title = `${site_title}. `;
    } else {
        formatted_site_title = "";
    }
      
    // YEAR
    const parsedYear = parseInt(year);
    if (Number.isInteger(parsedYear)) {
        formatted_year = year.toString();
    } else {
        formatted_year = "";
    }
    
    // MONTH
    if (isValid(formatted_year)){ // Code only runs if any given value for month has an associated year.
        abb_check = "";
        const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
        // if the input is a number, convert it to a string and get the corresponding month name
        if (typeof month === 'number'){
            // check that input is not decimal, and it is within range of valid month numbers
            if (Number.isInteger(month) && (1 <= month <= 12)) {
                formatted_month = monthNames[month - 1];
                formatted_year += ", ";
            } else {
                formatted_month = "";
            }
        } else if (isValid(month)){ 
            abb_check = capitalizeWords(month);
            if (abb_check.length >= 5){
                abb_check = abb_check.slice(0,3) + '.';
            }
        formatted_month = abb_check;
        if (isValid(formatted_month)){
            formatted_year += ", ";
        }
        } else { 
            // If it's not a nonempty string or a proper number, then the user is trolling.
            month = "";
        }
    }

    // DAY
    if (isValid(formatted_month)){ // Code only runs if any given value for day has an associated month.
        checked_day = parseInt(day);
        if (isValid(checked_day.toString())) { // Checks to make sure that value for day is a number.
            formatted_day = " " + day;
        } else {
            formatted_day = "";
        }
    } else {
        formatted_day = "";
    }

    formatted_date = `(${formatted_year}${formatted_month}${formatted_day}). `;
    
    // URL
    if (isValid(url)){
        formatted_url = url + ".";
    } else {
        formatted_url = "";
    }
    
    const apaCitation = `${formatted_lname}${formatted_fname}${formatted_middle_names}${formatted_date}${formatted_article_title}${formatted_site_title}${formatted_url}`;
    return apaCitation.trim();

}

function convertBookMlaToApa(mlaCitation) {
    // Use Regex to extract the author's last name, first name.
    const authorRegex = /^([^,<]*),\s([^.<]*)(?<!<i>)(?=<i>|\.)/;
    const authorMatch = mlaCitation.match(authorRegex);
    let lname = "";
    let fname = "";
    if (authorMatch) {
        lname = authorMatch[1];
        fname = authorMatch[2];
    }
  
    // Use Regex
    const titleRegex = /<i>([^<]+)<\/i>/;
    const titleMatch = mlaCitation.match(titleRegex);
    let bookTitle = "";
    if (titleMatch && titleMatch.length >= 2) {
        bookTitle = titleMatch[1];
    }
  
    const publisherRegex = /<\/i>\.\s(.*?)(,|\.)/;
    const publisherMatch = mlaCitation.match(publisherRegex);
    let publisher = "";
    if (publisherMatch){
      publisher = publisherMatch[1];
    }
  
    const yearRegex = /([0-9]+)\./;
    const yearMatch = mlaCitation.match(yearRegex);
    let year = "";
    if (yearMatch){
      year = yearMatch[1];
    }
    
    return (apaBookCitation(lname, fname, bookTitle, publisher, year));
  
}

function convertWebsiteMlaToApa(mlaCitation) {
    // Use Regex to extract the author's last name, first name.
    const authorRegex = /^([^,<]*),\s([^.<]*)(?<!<i>)(?=<i>|\.)/;
    const authorMatch = mlaCitation.match(authorRegex);
    let lname = "";
    let fname = "";
    if (authorMatch) {
        lname = authorMatch[1];
        fname = authorMatch[2];
    }
  
    // Use Regex to extract article title
    const titleRegex = /"([^"]*)"/g;
    const titleMatch = mlaCitation.match(titleRegex);
    let articleTitle = "";
    if (titleMatch && titleMatch.length >= 1) {
      articleTitle = titleMatch[0].replace(/^"|"$/g, "");
      articleTitle = articleTitle.replace(/\.$/, "");
    }
  
    // Use Regex to extract site title
    const siteRegex = /<i>([^<]+)<\/i>/;
    const siteMatch = mlaCitation.match(siteRegex);
    let siteTitle = "";
    if (siteMatch && siteMatch.length >= 2) {
        siteTitle = siteMatch[1];
    }
  
    // Use Regex to extract the url
    const urlRegex = /([^\s]*)\.*$/;
    const urlMatch = mlaCitation.match(urlRegex);
    let urlTitle = "";
    if (urlMatch && urlMatch.length >= 2) {
        urlTitle = urlMatch[1];
    }
    const url = urlTitle.replace(/\.$/, '');
  
    // Use Regex to extract the date
    const matches = [lname, fname, articleTitle, siteTitle, url];
    let newInput = mlaCitation;
    for (i = 0; i < matches.length; i++) {
        newInput = newInput.replace(matches[i], "");
    }
    newInput = newInput.replace(", ", "");
    newInput = newInput.replace("<i></i>", "");
    const dateRegex = /\b[0-9]+\b|\b[a-zA-Z]+(?=\.)?\b/g;
    const dateMatch = newInput.match(dateRegex);
    let year = "";
    let month = "";
    let day = "";
    if (dateMatch && dateMatch.length >= 1) {
        year = dateMatch[0];
    }
    if (dateMatch && dateMatch.length >= 2) {
        month = dateMatch[0];
        year = dateMatch[1];
    }
    if (dateMatch && dateMatch.length >= 3) {
        day = dateMatch[0];
        month = dateMatch[1];
        year = dateMatch[2];
    }
    if (month.length === 3 && month !== 'May'){
        month += ".";
    }
    
    return (apaWebsiteCitation(lname, fname, articleTitle, siteTitle, month, day, year, url));
  
  }
  
  function convertBookApaToMla(apaCitation) {
    // Use Regex to extract the author's last name, first name, and middle initial(s)
    if (apaCitation.indexOf('(') !== -1 || apaCitation.indexOf(')') !== -1) {
        // apaCitation contains at least one parenthesis
        authorRegex = /^([^,]+),\s([^\s]+)\s([^()<.]+)?/;
        year_is_present = true;
    } else {
        authorRegex = /^([^,]+),\s([^\s]+)\s([^<.]+)?/;
        year_is_present = false;
    }
    const authorMatch = apaCitation.match(authorRegex);
    let lname = "";
    let fname = "";
    if (authorMatch && authorMatch.length >=2) {
    lname = authorMatch[1];
    }
    if (authorMatch && authorMatch.length >= 3) {
        fname = authorMatch[2];
        for (let i = 3; i < authorMatch.length; i++) {
            if (authorMatch[i]) {
                fname += " " + authorMatch[i];
            }
        }
    }

    // Use Regex to extract the book title
    const titleRegex = /<i>([^<]+)<\/i>/;
    const titleMatch = apaCitation.match(titleRegex);
    let bookTitle = "";
    if (titleMatch && titleMatch.length >= 2) {
        bookTitle = titleMatch[1];
    }
    bookTitle = capitalizeWords(bookTitle);
    
    // Extract the publisher by splitting the string on the book title
    const publisherSplit = apaCitation.split(titleMatch[0]);
    let publisher = "";
    if (publisherSplit.length >= 2) {
        publisher = publisherSplit[1].trim().replace(/\. /, "");
        publisher = publisher.replace(".", "");
        pub_is_present = true;
    }

    // Use Regex to extract the year
    const yearRegex = /\((\d+)/;
    const yearMatch = apaCitation.match(yearRegex);
    let year = "";
    if (yearMatch && yearMatch.length >= 2) {
        year = yearMatch[1];
    }

    return mlaBookCitation(lname, fname, bookTitle, publisher, month = "", day = "", year);

    // Use the extracted components to create an MLA citation
    /*
    if (year_is_present && pub_is_present){
        return `${lname}, ${fname} ${middleInitials}<i>${bookTitle}</i>. ${publisher}, ${year}.`;
    } else if (year_is_present && pub_is_present === false){
        return `${lname}, ${fname} ${middleInitials}<i>${bookTitle}</i>. ${year}.`;
    } else if (year_is_present === false && pub_is_present){
        return `${lname}, ${fname} ${middleInitials}<i>${bookTitle}</i>. ${publisher}.`
    } else {
        return `${lname}, ${fname} ${middleInitials}<i>${bookTitle}</i>.`
    }
    */
}

function convertWebsiteApaToMla(apaCitation) {
    // Use Regex to extract the author's last name, first name, and middle initial(s)
    if (apaCitation.indexOf('(') !== -1 || apaCitation.indexOf(')') !== -1) {
        // apaCitation contains at least one parenthesis
        authorRegex = /^([^,]+),\s([^\s]+)\s([^()<.]+)?/;
        year_is_present = true;
    } else {
        authorRegex = /^([^,]+),\s([^\s]+)\s([^<.]+)?/;
        year_is_present = false;
    }
    const authorMatch = apaCitation.match(authorRegex);
    let lname = "";
    let fname = "";
    if (authorMatch && authorMatch.length >=2) {
        lname = authorMatch[1];
    }
    if (authorMatch && authorMatch.length >= 3) {
        fname = authorMatch[2];
        for (let i = 3; i < authorMatch.length; i++) {
            if (authorMatch[i]) {
                fname += " " + authorMatch[i];
            }
        }
    }

    // Use Regex to extract the article title
    const titleRegex = /<i>([^<]+)<\/i>/;
    const titleMatch = apaCitation.match(titleRegex);
    let articleTitle = "";
    if (titleMatch && titleMatch.length >= 2) {
        articleTitle = titleMatch[1];
    }

    // Use Regex to extract the site title
    const siteRegex = /<\/i>\.\s(.+?)\S*$/;
    const siteMatch = apaCitation.match(siteRegex);
    let siteTitle = "";
    if (siteMatch && siteMatch.length >= 2) {
        siteTitle = siteMatch[1];
    }
    const site = siteTitle.replace(/.\s$/, '');

    // Use Regex to extract the url
    const urlRegex = /([^\s]*)\.*$/;
    const urlMatch = apaCitation.match(urlRegex);
    let urlTitle = "";
    if (urlMatch && urlMatch.length >= 2) {
        urlTitle = urlMatch[1];
    }
    const url = urlTitle.replace(/\.$/, '');

    // Use Regex to extract the date
    const dateRegex = /\(([^)]+)\)/;
    const dateMatch = apaCitation.match(dateRegex);
    let year = "";
    let month = "";
    let day = "";
    if (dateMatch[1].indexOf(',') !== -1) {
        const yearRegex = /^([^,]*),/;
        const yearMatch = dateMatch[1].match(yearRegex);
        year = yearMatch[1];
        const otherRegex = /,\s*(.+)/;
        const otherMatch = dateMatch[1].match(otherRegex);

        const monthRegex = /^([^\s]+)/;
        const monthMatch = otherMatch[1].match(monthRegex);
        if (monthMatch && monthMatch.length >= 1) {
        month = monthMatch[0];
        }
        
        const dayRegex = /\d+/g;
        const dayMatch = otherMatch[1].match(dayRegex);
        if (dayMatch && dayMatch.length >= 1) {
        day = dayMatch[0];
        }
    } else {
        year = dateMatch[1];
    }

    return mlaWebsiteCitation(lname, fname, articleTitle, site, month, day, year, url);

}

/*
console.log(mlaBookCitation(lname = "voda", fname = "ryan", book_title = "Ryan's Autobiography", publisher = "Penguin Publishing", month = "december", day = "27", year = "2022"));
console.log(mlaWebsiteCitation(lname = "doe", fname = "jOhn", article_title = "This is the Article Title", site_title = "Site Title", publisher = "PENGUINS LOL", month = "december", day = "31", year = 2000, url = "https://ryanvoda.github.io/"));
console.log(apaBookCitation("Smith", "John Michael", "The History of Time", "University Press", "2002"));
console.log(apaWebsiteCitation(lname = "Smith", fname = "John", article_title = "The History of Time", site_title = "Mormans: The Website", "Jan.", "30", "2022", "https://www.universitypress.edu/history-of-time"));

mla1 = 'Smith, John M. <i>The History of Time</i>. University Press. Jan. 2022.';
apa1 = apaCitation = convertBookMlaToApa(mla1);
console.log(apa1);
mla2 = convertBookApaToMla(apa1);
console.log(mla2);

const apaCitation1 = 'Smith, J. M. (2002). <i>The History Of Time</i>. University Press.';
const mlaCitation1 = convertBookApaToMla(apaCitation1);
console.log(mlaCitation1);

const apaCitation2 = "Voda, R. <i>Ryan's Autobiography</i>. Penguin Publishing";
const mlaCitation2 = convertBookApaToMla(apaCitation2);
console.log(mlaCitation2);

const mlaCitation3 = "Smith, John Michael. <i>The History of Time</i>. University Press, 2002.";
const apaCitation3 = convertBookMlaToApa(mlaCitation3);
console.log(apaCitation3);

// console.log(mlaBookCitation(lname = "o", fname = "m", book_title = "g", publisher = "lol", month = "may", day = "1", year = "1999"));

// const apaCitation2 = "Voda, R. <i>Ryan's Autobiography</i>. Penguin Publishing";
// const mlaCitation2 = convertBookApaToMla(apaCitation2);
// console.log(mlaCitation2);

const lol = apaWebsiteCitation(lname = "Doe", fname = "John", article_title = "This is the Article Title", site_title = "Site title", "Dec.", "31", "2000", "https://ryanvoda.github.io/");
console.log(lol);
const funny = convertWebsiteApaToMla(lol);
console.log(funny);
const haha = convertWebsiteMlaToApa(funny);
console.log(haha);

// console.log(convertBookApaToMla("Voda, R. (2006). <i>No funny business</i>. Penguin Sex."));
// console.log(convertWebsiteApaToMla("Voda, R. (2022, Dec. 29). <i>Monkey Sex</i>. SITE OF MONKEYS. ryanvoda.github.io."));

*/