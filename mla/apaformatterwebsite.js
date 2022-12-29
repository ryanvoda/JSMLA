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

console.log(apaWebsiteCitation(lname = "Doe", fname = "John", article_title = "This is the Article Title", site_title = "Site title", "Dec.", "31", "2000", "https://ryanvoda.github.io/"));