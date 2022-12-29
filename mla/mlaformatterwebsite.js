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

function isValid(str){
    if (str.length > 0 && typeof str === 'string'){
        return true;
    } else {
        return false;
    }
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

/*
const citation1 = mlaWebsiteCitation(lname = "doe", fname = "jOhn", article_title = "This is the Article Title", site_title = "Site Title", month = "december", day = "31", year = 2000, url = "https://ryanvoda.github.io/");
const citation2 = mlaWebsiteCitation(lname = "doe", fname = "", article_title = "This is the Article Title", site_title = "Site Title", month = "december", day = "poop", year = 2000, url = "https://ryanvoda.github.io/");
const citation3 = mlaWebsiteCitation(lname = "", fname = "jOhn", article_title = "", site_title = "Site Title", month = "poop", day = "poop", year = 2000, url = "https://ryanvoda.github.io/");
const citation4 = mlaWebsiteCitation(lname = "", fname = "", article_title = "This is the Article Title", site_title = "", month = "poop", day = "poop", year = "poop", url = "https://ryanvoda.github.io/");
const citation5 = mlaWebsiteCitation(lname = "doe", fname = "jOhn", article_title = "This is the Article Title", site_title = "Site Title", month = 12, day = 31, year = 2000, url = "https://ryanvoda.github.io/");

console.log(citation1);
console.log(citation2);
console.log(citation3);
console.log(citation4);
*/

const citation5 = mlaWebsiteCitation(lname = "doe", fname = "jOhn", article_title = "This is the Article Title", site_title = "Site Title", month = 12, day = 31, year = 2000, url = "https://ryanvoda.github.io/");
console.log(citation5);