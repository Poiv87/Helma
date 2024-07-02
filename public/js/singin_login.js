document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('pass'),
        showBtn = document.getElementById('fa');

    showBtn.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            showBtn.classList.add('hide');
        }
        else {
            input.type = 'password';
            showBtn.classList.remove('hide');
        }
    }) 

    document.querySelector('.suond').addEventListener('mousedown', function () {
        navigator.vibrate(50);
        var audio = new Audio('https://sedatoseda.com/wp-content/uploads/button-30.mp3');
        audio.play();
    });
});