
const clock = document.getElementById("clock");
// Create 60 minutes
for (let min = 0; min < 60; min++){

    let tick = document.createElement("div")
    tick.className = "absolute left-1/2 top-1 w-[2px] bg-gray-700 origin-bottom"

    tick.style.height = min % 5 === 0 ? "14px" : "8px";
    tick.style.transform = `translateX(-50%) rotate(${min * 6}deg)`;
    tick.style.transformOrigin = "center 190px";

    clock.appendChild(tick);

}

// ADDED: Tick sound
const tickSound = new Audio("./tick.mp3");
tickSound.volume = 1;   // maximum volume
tickSound.load();

let soundBtn = document.getElementById("sound-btn");
soundBtn.addEventListener("click", () => {

    tickSound.muted = !tickSound.muted;

    if (!tickSound.muted) {
        tickSound.play();
    }

    soundBtn.innerHTML = tickSound.muted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
});

document.addEventListener(
    "click",
    () => {
        tickSound.play();
        tickSound.pause();
        tickSound.currentTime = 0;
    },
    { once: true }
);

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");


function updateClock() {

    let date = new Date();

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();


    // Convert time to degrees
    let secondDeg = s * 6;
    let minuteDeg = m * 6 + s * 0.1;
    let hourDeg = (h % 12) * 30 + m * 0.5;


    second.style.transform =
        `translateX(-50%) rotate(${secondDeg}deg)`;

    minute.style.transform =
        `translateX(-50%) rotate(${minuteDeg}deg)`;

    hour.style.transform =
        `translateX(-50%) rotate(${hourDeg}deg)`;

     // ADDED: tick sound every second
    if (!tickSound.muted) {
    tickSound.currentTime = 0;

    tickSound.play()
        .catch(error => {
            console.log("Audio error:", error);
        });
    }

}
updateClock();

setInterval(updateClock, 1000);