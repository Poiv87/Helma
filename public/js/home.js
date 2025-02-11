document.addEventListener('DOMContentLoaded', () => {
    const sounds = document.getElementsByClassName('sound');

    Array.prototype.forEach.call(sounds, (sound) => {
        sound.addEventListener('click', () => {
            var audio = new Audio('https://sedatoseda.com/wp-content/uploads/button-34.mp3');
            audio.play();
        });
    });
});