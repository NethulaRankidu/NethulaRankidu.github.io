function index() {
    var img = document.getElementById("pfp");
    var listen_cover = document.getElementById("img-activity-spotify");
    var listen_title = document.getElementById("song_title");
    var listen_artist = document.getElementById("song_author");
    var listen_album = document.getElementById("song_album");
    var listen_href = document.getElementById("spotify_song");

    var activity_cover = document.getElementById("img-activity-rpc");
    var activity_cover_sml = document.getElementById("img-activity-sml-rpc");
    var activity_name = document.getElementById("activity_name");
    var activity_state = document.getElementById("activity_state");
    var activity_details = document.getElementById("activity_details");
    // link should be https://api.lanyard.rest/v1/users/865515969111785482
    fetch('https://api.lanyard.rest/v1/users/865515969111785482').then(response => {
        return response.json();
    }).then(data => {
        console.log("JSON data received from lanyard (Discord 3rd party API)");
        // Work with JSON data here
        var avatar = data.data.discord_user.avatar;
        var user = data.data.discord_user.id;

        if (data.data.listening_to_spotify == true) { // Checking if something is playing is playing on Spotify
            console.log("Album Art = " + data.data.spotify.album_art_url);
            console.log("Song Name = " + data.data.spotify.song);
            console.log("Album Artist = " + data.data.spotify.artist);
            console.log("Album name = " + data.data.spotify.album);
            console.log("link = " + "https://open.spotify.com/track/" + data.data.spotify.track_id);

            listen_cover.src = data.data.spotify.album_art_url;
            listen_title.innerHTML = data.data.spotify.song;
            listen_artist.innerHTML = data.data.spotify.artist;
            listen_album.innerHTML = data.data.spotify.album;
            listen_href.href = "https://open.spotify.com/track/" + data.data.spotify.track_id;
        } else {
            console.log("data.data.activities.length has = " + data.data.activities.length)
            for(x = 1; x < data.data.activities.length; x++){
                console.log("hello");
                if (data.data.activities[x].name == "last.fm") {
                    listen_title.innerHTML = data.data.activities[x].assets.large_text;
                    listen_artist.innerHTML = data.data.activities[x].state;
                    listen_album.innerHTML = data.data.activities[x].details;
    
                    var application_name = data.data.activities[1].application_id;
                    var large_image = data.data.activities[1].assets.large_image;
                    console.log(large_image);
        
                    if (large_image == "1108588929751453716") {
                        console.log("true");
                        listen_cover.src = "https://cdn.discordapp.com/app-assets/" + application_name + "/" + large_image + ".png";
                    } else {
                        var str = data.data.activities[1].assets.large_image;
                        listen_cover.src = "https:/" + str.split("https").pop();
                    }
                }
            }
        }

        if (data.data.activities.length != 0) {
            if (data.data.activities[0].name != "Spotify") {
                activityData(0);
            } else if (data.data.activities[1].name != "Spotify") {
                activityData(1);
            }

            function activityData(x) {
                console.log(data.data.activities[x].name);
                activity_name.innerHTML = data.data.activities[x].name;
                activity_state.innerHTML = data.data.activities[x].state;
                activity_details.innerHTML = data.data.activities[x].details;

                if (activity_name.innerHTML == "undefined") {
                    activity_name.innerHTML = "";
                }
                if (activity_state.innerHTML == "undefined") {
                    activity_state.innerHTML = "";
                }
                if (activity_details.innerHTML == "undefined") {
                    activity_details.innerHTML = "";
                }

                if (data.data.activities[x].name == "Code") {   // For Visual Studio Code
                    activity_name.innerHTML = "Visual Studio Code";

                    var str = data.data.activities[x].assets.large_image;
                    activity_cover.src = "https:/" + str.split("https").pop();

                    var str = data.data.activities[x].assets.small_image;
                    activity_cover_sml.src = "https:/" + str.split("https").pop();

                } else { // for other apps (usually should work)
                    var application_name = data.data.activities[x].application_id;
                    var large_image = data.data.activities[x].assets.large_image;
                    var small_image = data.data.activities[x].assets.small_image;

                    activity_cover.src = "https://cdn.discordapp.com/app-assets/" + application_name + "/" + large_image + ".png";
                    console.log(activity_cover.src);

                    activity_cover_sml.src = "https://cdn.discordapp.com/app-assets/" + application_name + "/" + small_image + ".png";
                    console.log(activity_cover_sml.src);
                }
                if(large_image == undefined){
                    activity_cover.style.display = "none";
                }
                if(small_image == undefined){
                    activity_cover_sml.style.display = "none";
                }
                
                
            }
        }

        console.log(activity_cover_sml.src);
        if (activity_cover_sml.src == "http://127.0.0.1:5501/#") {
            activity_cover_sml.style.display = "none";
        }
    }).catch(err => {
        // Do something for an error here
        console.log("An error occured while trying to fetch data");
        console.error(err);
    });
}

function clipboardDiscord() {
    navigator.clipboard.writeText("wintergreen6631");
    window.alert("Username copied to clipboard!");
}