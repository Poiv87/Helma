document.addEventListener('DOMContentLoaded', () => {
    $(document).ready(() => {
        const modal = document.getElementById('modal');
        const btn = document.getElementById('taghir');
        const span = document.getElementsByClassName('close')[0];
        
        document.getElementById('taghir').addEventListener('mousedown', function () {
            navigator.vibrate(50);
            var audio = new Audio('https://sedatoseda.com/wp-content/uploads/button-30.mp3');
            audio.play();
        });

        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            modal.style.animation = 'slide-up 0.5s';
        });

        span.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.style.animation = 'slide-down 0.5s';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                modal.style.animation = 'slide-down 0.5s';
            }
        });

        const a = window.aValue;

        if (a === 1) {
            btn.click();
        }

        const trashDoc1 = $('#1');
        const trashDoc2 = $('#2');
        const trashDoc3 = $('#3');
        trashDoc1.on('click', (e) => {

            const endpoint = `/helma/${trashDoc1.data('doc')}`

            fetch(endpoint, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    window.location.href = data.redirect
                    console.log(`Blog deleted successfully!`)
                })
                .catch(err => console.log(err))
        })
        trashDoc2.on('click', (e) => {

            const endpoint = `/helma/${trashDoc2.data('doc')}`

            fetch(endpoint, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    window.location.href = data.redirect
                    console.log(`Blog deleted successfully!`)
                })
                .catch(err => console.log(err))
        })
        trashDoc3.on('click', (e) => {

            const endpoint = `/helma/${trashDoc3.data('doc')}`

            fetch(endpoint, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    window.location.href = data.redirect
                    console.log(`Blog deleted successfully!`)
                })
                .catch(err => console.log(err))
        })
    });
});