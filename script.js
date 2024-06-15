// console.log('Javascript Begins')
// async function getSongs() {
//     let a = await fetch("http://127.0.0.1:5500/songs/")
//     let response = await a.text();
//     console.log(response)
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     let songs = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href)
//         }

//     }
//     return songs
// console.log(songs)
// }
// let songs= getSongs()

console.log('JavaScript Begins');

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
            songs.push(element.href);
        });

        return songs; // Return the array of song URLs
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return []; // Return an empty array in case of error
    }
}

getSongs().then(songs => {
    console.log(songs); // Log the array of song URLs
}).catch(error => {
    console.error('Error in getSongs:', error);
});
// console.log('begins')

async function main() {
    // Gets list of all the songs
    let songs = await getSongs();
    // console.log(songs);

    // Check if there are any songs in the array
    if (songs.length > 0) {
        // Play the first song
        var audio = new Audio(songs[0]);
        audio.play();
    } else {
        console.log('No songs found to play.');
    }

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc,audio.currentTime)
    });
}
main(z)