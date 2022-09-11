
let clicks = 0
let clickCounter = () => {
    clicks = clicks +1;
    document.getElementById("counter").innerHTML = clicks;
}