document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const btn = document.getElementById('rezerv');
    const span = document.getElementsByClassName('close')[0];
    const box = document.getElementById('modal1');

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

    $(document).ready(() => {
        $('#btn').on('click', (e) => {
            e.preventDefault();

            modal.style.display = 'none';
            modal.style.animation = 'slide-down 0.5s';
            box.style.display = 'block';
            box.style.animation = 'slide-up 0.5s';


            const selectedTimes1 = $('.times1:checked').val();
            const selectedTimes2 = $('.times2:checked').val();
            const selectedTimes3 = $('.times3:checked').val();
            const serv = $('#serv').text();
            $.ajax({
                url: '/helma/submit_reserving',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    times1: selectedTimes1,
                    times2: selectedTimes2,
                    times3: selectedTimes3,
                    servic: serv,
                }),
                success: (a1) => {
                    window.location = a1.url;
                },
            });
        });
    });
});