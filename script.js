// async function getSongs() {
//     let songs = [];
//     try {
//         let a = await fetch("http://127.0.0.1:5500/songs/");
//         let response = await a.text();

//         // Create a temporary div element to parse the HTML response
//         let div = document.createElement("div");
//         div.innerHTML = response;

//         // Find all <a> elements within the parsed HTML
//         let as = div.querySelectorAll('a[href$=".mp3"]');

//         // Loop through each <a> element and extract the href attribute
//         as.forEach(element => {
//             songs.push(decodeURIComponent(element.href.split('/').pop().replace('.mp3', ''))); // Decode and extract song name
//         });
//     } catch (error) {
    //         console.error('Error fetching or parsing data:', error);
    //         return []; // Return an empty array in case of error
    //     }
    
    //     return songs; // Return the array of song URLs
    // }
    let currentSong = new Audio();
    
    function secondsToMinutesSeconds(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }
    
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }


async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const playMusic = (track, pause=false) => {
    // let audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play()
        playbtn.src = "/utils/Symbols/pause.svg";
    }
    console.log("Playing:", currentSong.src); // Log the URL being attempted
    document.getElementById("songinfo").innerHTML=decodeURI(track)
    document.getElementById("songtime").innerHTML="00/00"
}

async function main() {
    // Get list of all the songs
    let songs = await getSongs();
    playMusic(songs[0],true)
    console.log(songs); // Log the array of song URLs

    let songUL = document.querySelector(".songList ul"); // Get the <ul> element inside .songList
    let songListHTML = ''; // Initialize an empty string to build HTML

    for (const song of songs) {
        songListHTML += `<li><img width="34" src="utils/symbols/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                
                            </div>
                            <div class="playnow">
                                
                                <img src="utils/symbols/play.svg" alt="">
                            </div> </li>`;
    }

    songUL.innerHTML = songListHTML; // Set innerHTML once to add all songs

    // Now query and log the info elements after they have been added to the DOM
    Array.from(document.querySelectorAll(".info")).forEach(e => {
        e.addEventListener("click",element =>{
            console.log(e.firstElementChild.innerHTML) // Log each .info div element
            playMusic(e.firstElementChild.innerHTML.trim())
        })
    });

    // attack an event listener to previous, play and next
    playbtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playbtn.src = "/utils/Symbols/pause.svg";
        } else {
            currentSong.pause();
            playbtn.src = "/utils/Symbols/playbtn.svg";
        }
    });
    
    currentSong.addEventListener("timeupdate", () =>{
        // console.log(currentSong.currentTime,currentSong.duration)
        document.getElementById("songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%"
    })
    // let next;

    // previous.addEventListener("click",() => {
    // currentSong.src= currentSong.src[currentSong.src-1]})
    // Attach event listeners after elements are rendered
    // Array.from(songUL.getElementsByTagName("li")).forEach(e => {
    //     e.addEventListener("click", () => {
    //         let songName = e.querySelector(".info").textContent.trim();
    //         console.log("Playing song:", songName); // Placeholder for playMusic function
    //         // playMusic(songName);
    //     });
    // });
}

main().catch(error => {
    console.error('Error in main:', error); // Error handling for main function
});
