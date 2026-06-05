// Pulling Data from Gist
const gistUrl = "https://gist.githubusercontent.com/NethulaRankidu/9a1ec79dd20546c1bc63a629a5f7e071/raw/about-me.json";

fetch(gistUrl)
    .then(response => response.json())
    .then(data => {
        // 1. UPDATE ABOUT ME PARAGRAPH
        // If you want to dynamically load the paragraph text too:
        document.getElementById('about-me-p').innerHTML = data["about-me"];

        // 2. UPDATE SKILLS LIST
        const skillsList = document.getElementById('my-skills-list'); // Make sure your <ul> has this ID
        skillsList.innerHTML = ''; // Clear hardcoded placeholder
        data.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // 3. UPDATE FACTS
        const factsList = document.getElementById('my-facts-list');
        const facts = data.facts;

        // Using a loop or manual generation for your facts
        factsList.innerHTML = `
      <li>Born 22nd of September, 2010 <span id="age"></span></li>
      <li>Knows Sinhala and English</li>
      <li><strong>Setup:</strong> ${facts.setup}</li>
      <li><strong>Gaming:</strong> ${facts.gaming}</li>
      <li><strong>Reading:</strong> ${facts.reading}</li>
      <li><strong>Next to learn:</strong> ${facts.learning}</li>
    `;

        const targetUnixTime = 1285127520; // Sept 22, 2010
        const timePassed = getDurationSinceUnixTime(targetUnixTime);
        document.getElementById('age').textContent = `(${timePassed.years} years, ${timePassed.months} months, and ${timePassed.days} days old)`;
        // 4. UPDATE SOCIALS WITH ICONS
        const socialsList = document.getElementById('dynamic-socials');
        socialsList.innerHTML = ''; // Clear placeholder

        data.socials.forEach(social => {
            const socialLi = document.createElement('li');
            socialLi.style.display = "flex";
            socialLi.style.alignItems = "center";
            socialLi.style.gap = "2px";
            socialLi.style.marginBottom = "2px";

            // Using the local SVG icon paths you added in the JSON!
            socialLi.innerHTML = `
        <a href="${social.url}" target="_blank">
            <li>
                <img src="${social.icon}" alt="${social.platform}" srcset="" height="18px" class="invert-color">
                ${social.platform} (${social.display}) 
            </li>
        </a>
      `;

            socialsList.appendChild(socialLi);
        });
    })
    .catch(error => console.error("Error loading profile data:", error));

// Calculate the age
function getDurationSinceUnixTime(unixTimestamp) {
    // Convert Unix timestamp (seconds) to milliseconds
    const pastDate = new Date(unixTimestamp * 1000);
    const currentDate = new Date();

    // If the input date is in the future, handle it or return zeros
    if (pastDate > currentDate) {
        return { years: 0, months: 0, days: 0 };
    }

    let years = currentDate.getFullYear() - pastDate.getFullYear();
    let months = currentDate.getMonth() - pastDate.getMonth();
    let days = currentDate.getDate() - pastDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        // Get the total days in the previous month
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += previousMonth;
        months--;
    }

    // Adjust for negative months
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days };
}



// Function to convert Last.fm Unix timestamp to a "time ago" string
function timeAgo(utsString) {
  const songTime = parseInt(utsString) * 1000; // Convert seconds to milliseconds
  const now = Date.now();
  const diffInSeconds = Math.floor((now - songTime) / 1000);

  if (diffInSeconds < 60) return "Just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

const workerUrl = "https://lastfm-proxy.wintergreen6631.workers.dev/";

fetch(workerUrl)
  .then(response => response.json())
  .then(data => {
    if (!data || !data.recenttracks || !data.recenttracks.track) return;

    const track = data.recenttracks.track[0];
    const isNowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";
    
    const trackName = track.name;
    const artistName = track.artist["#text"];
    const album  = track.album["#text"];
    const trackLink = track.url;
    const albumArt = track.image[3]["#text"] || "/assets/icons/music.svg";

    // Calculate status text or time ago
    let statusText = "";
    if (isNowPlaying) {
      statusText = "🎧 Now Playing";
    } else if (track.date && track.date.uts) {
      statusText = `🌙 Last Played: ${timeAgo(track.date.uts)}`;
    } else {
      statusText = "🌙 Last Played";
    }
    document.getElementById("status-text").textContent = statusText;
    document.getElementById("track-name").textContent = trackName;
    document.getElementById("album-name").textContent = album;
    document.getElementById("artist-name").textContent = artistName;
    document.getElementById("cover-art").src = albumArt;
    document.getElementById("song-url").href = trackLink;

  })
  .catch(err => console.error("Error formatting music data:", err));
  