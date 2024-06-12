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
});