
// console.log('JavaScript Begins');

// async function getSongs() {
//     try {
//         let a = await fetch("http://127.0.0.1:5500/songs/");
//         let response = await a.text();

//         // Create a temporary div element to parse the HTML response
//         let div = document.createElement("div");
//         div.innerHTML = response;

//         // Find all <a> elements within the parsed HTML
//         let as = div.querySelectorAll('a[href$=".mp3"]');

//         // Initialize an array to store song URLs
//         let songs = [];

//         // Loop through each <a> element and extract the href attribute
//         as.forEach(element => {
//             songs.push(decodeURIComponent(element.href.split('/').pop().replace('.mp3', ''))); // Changed: Decoding and extracting song name
//         });

//         return songs; // Return the array of song URLs
//     } catch (error) {
//         console.error('Error fetching or parsing data:', error);
//         return []; // Return an empty array in case of error
//     }
// }

// async function main() {
//     // Gets list of all the songs
//     let songs = await getSongs(); // Removed duplicate call to getSongs
//     console.log(songs); // Log the array of song URLs

//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
//     let songListHTML = ''; // Changed: Initialize an empty string to build HTML

//     for (const song of songs) {
//         songListHTML += `<li>${song} </li>`; // Changed: Build HTML string for list items
//     }

//     songUL.innerHTML = songListHTML; // Changed: Set innerHTML once

//     // Check if there are any songs in the array
//     if (songs.length > 0) {
//         // Play the first song
//         var audio = new Audio(`http://127.0.0.1:5500/songs/${encodeURIComponent(songs[5])}.mp3`); // Changed: Correct URL encoding for the audio source
//         audio.play();

//         audio.addEventListener("loadeddata", () => {
//             console.log(audio.duration, audio.currentSrc, audio.currentTime);
//         });

//         audio.addEventListener("error", (e) => {
//             console.error('Error playing audio:', e); // Changed: Added error handling for audio playback
//         });
//     } else {
//         console.log('No songs found to play.');
//     }
// }

// main().catch(error => {
//     console.error('Error in main:', error); // Changed: Added error handling for main function
// });

async function getSongs() {
    try {
        let a = await fetch("http://127.0.0.1:5500/songs/");
        let response = await a.text();

        // Create a temporary div element to parse the HTML response
        let div = document.createElement("div");
        div.innerHTML = response;

        // Find all <a> elements within the parsed HTML
        let as = div.querySelectorAll('a[href$=".mp3"]');

        // Initialize an array to store song URLs
        let songs = [];

        // Loop through each <a> element and extract the href attribute
        as.forEach(element => {
            songs.push(decodeURIComponent(element.href.split('/').pop().replace('.mp3', ''))); // changed2: Decoding and extracting song name
        });

        return songs; // Return the array of song URLs
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return []; // Return an empty array in case of error
    }
}

async function main() {
    // Gets list of all the songs
    let songs = await getSongs(); // Removed duplicate call to getSongs
    console.log(songs); // Log the array of song URLs

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    let songListHTML = ''; // changed2: Initialize an empty string to build HTML

    for (const song of songs) {
        songListHTML += `<li>${song} <img src="/utils/symbols/music.svg" alt=""></li>`; // changed2: Added an image within the list item
    }

    songUL.innerHTML = songListHTML; // changed2: Set innerHTML once


    /*
    // Check if there are any songs in the array
    if (songs.length > 0) {
        // Play the first song
        var audio = new Audio(`http://127.0.0.1:5500/songs/${encodeURIComponent(songs[3])}.mp3`); // changed2: Correct URL encoding for the audio source
        audio.play();

        audio.addEventListener("loadeddata", () => {
            console.log(audio.duration, audio.currentSrc, audio.currentTime);
        });

        audio.addEventListener("error", (e) => {
            console.error('Error playing audio:', e); // changed2: Added error handling for audio playback
        });
    } else {
        console.log('No songs found to play.');
    } */
   


}

main().catch(error => {
    console.error('Error in main:', error); // changed2: Added error handling for main function
});
