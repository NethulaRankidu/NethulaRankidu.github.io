function index() {
    var img = document.getElementById("pfp");
    var listen_cover = document.getElementById("img-activity-spotify");
    var listen_title = document.getElementById("song_title");
    var listen_artist = document.getElementById("song_author");
    var listen_album = document.getElementById("song_album");
    var listen_href = document.getElementById("spotify_song");

    var activity_cover = document.getElementById("img-activity-rpc");
    var activity_name = document.getElementById("activity_name");
    var activity_state = document.getElementById("activity_state");
    var activity_details = document.getElementById("activity_details");
    // link should be https://api.lanyard.rest/v1/users/865515969111785482
    fetch('https://api.lanyard.rest/v1/users/865515969111785482').then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        var avatar = data.data.discord_user.avatar;
        var user = data.data.discord_user.id;
        img.src = "https://cdn.discordapp.com/avatars/" + user + "/" + avatar;

        if (data.data.listening_to_spotify == true) {
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
        }

        if(data.data.activities.length != 0){
            if (data.data.activities[0].name != "Spotify") {
                console.log(data.data.activities[0].name);
                activity_name.innerHTML = data.data.activities[0].name;
                activity_state.innerHTML = data.data.activities[0].state;
                activity_details.innerHTML = data.data.activities[0].details;
    
                var str = data.data.activities[0].assets.large_image;
                activity_cover.src = "https:/"+str.split("https").pop();
            } else if (data.data.activities[1].name != "Spotify") {
                console.log(data.data.activities[1].name);
                activity_name.innerHTML = data.data.activities[1].name;
                activity_state.innerHTML = data.data.activities[1].state;
                activity_details.innerHTML = data.data.activities[1].details;

                var str = data.data.activities[1].assets.large_image;
                activity_cover.src = "https:/"+str.split("https").pop();
            }
        }


    }).catch(err => {
        // Do something for an error here
        console.log("An error occured while trying to fetch data");
        console.error(err);
    });
}