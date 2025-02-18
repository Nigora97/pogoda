document.addEventListener("DOMContentLoaded", () => {
    const weatherData = [
        { image: "./img/spring.jpg", sound: "./sounds/summer.mp3", icon: "./img/icons/sun.svg", defaultIcon: "./img/icons/sun.svg" },
        { image: "./img/rainy.jpg", sound: "./sounds/rain.mp3", icon: "./img/icons/cloud-rain.svg", defaultIcon: "./img/icons/cloud-rain.svg" },
        { image: "./img/winter.jpg", sound: "./sounds/winter.mp3", icon: "./img/icons/cloud-snow.svg", defaultIcon: "./img/icons/cloud-snow.svg" }
    ];

    const container = document.createElement("div");
    container.classList.add("container");

    const title = document.createElement("h1");
    title.textContent = "Погодный звук";
    container.appendChild(title);

    const cardsWrapper = document.createElement("div");
    cardsWrapper.classList.add("cards-wrapper");

    const progressBar = document.createElement("input");
    progressBar.classList.add("progress-bar");
    progressBar.type = "range";
    progressBar.min = "0";
    progressBar.max = "1";
    progressBar.step = "0.01";
    progressBar.value = "1";

    let currentAudio = null;
    let currentPlaying = null;

    document.body.style.backgroundImage = `url(${weatherData[0].image})`;

    weatherData.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundImage = `url(${item.image})`;

        const icon = document.createElement("img");
        icon.src = item.icon;
        icon.classList.add("icon");

        const label = document.createElement("p");
        label.textContent = item.name;

        card.appendChild(icon);
        card.appendChild(label);
        cardsWrapper.appendChild(card);

        const audio = new Audio(item.sound);
        audio.volume = progressBar.value;

        card.addEventListener("click", () => {
            if (currentPlaying === index) {
                if (!audio.paused) {
                    audio.pause();
                    icon.src = item.defaultIcon;
                } else {
                    audio.play();
                    icon.src = "./img/icons/pause.svg";
                }
            } else {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    document.querySelectorAll(".icon")[currentPlaying].src = weatherData[currentPlaying].defaultIcon;
                }

                document.body.style.backgroundImage = `url(${item.image})`;
                audio.play();
                icon.src = "./img/icons/pause.svg";
                currentAudio = audio;
                currentPlaying = index;
            }
        });

        progressBar.addEventListener("input", () => {
            if (currentAudio) {
                currentAudio.volume = progressBar.value;
            }
        });
    });

    container.appendChild(cardsWrapper);
    container.appendChild(progressBar);
    document.body.appendChild(container);
});
