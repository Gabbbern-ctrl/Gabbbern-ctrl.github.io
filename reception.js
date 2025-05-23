function caricaPrenotazioni() {
    fetch('/api/bookings/pending')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('booking-list');
            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = '<p>Nessuna prenotazione in attesa.</p>';
                return;
            }

            data.forEach(booking => {
                const div = document.createElement('div');
                div.className = 'booking';
                div.innerHTML =
                    <p><strong>ID Prenotazione:</strong> ${booking.id}</p>
                <p><strong>Camera:</strong> ${booking.room_id}</p>
                <p><strong>Data Inizio:</strong> ${booking.start_date}</p>
                <p><strong>Data Fine:</strong> ${booking.end_date}</p>
                <div class="buttons">
                    <button class="approve" onclick="decidi(${booking.id}, 'approved')">Approva</button>
                    <button class="reject" onclick="decidi(${booking.id}, 'rejected')">Rifiuta</button>
                </div>
                ;
                container.appendChild(div);
            });
        })
        .catch(error => {
            document.getElementById('booking-list').innerHTML = '<p>Errore nel caricamento.</p>';
            console.error('Errore:', error);
        });
}

function decidi(id, decisione) {
    fetch(/api/bookings/${id}/decision, {
    method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision: decisione })
})
.then(response => response.json())
    .then(result => {
        alert(result.message);
        caricaPrenotazioni();
    })
    .catch(error => {
        alert('Errore durante l\'operazione.');
        console.error('Errore:', error);
    });
}

document.addEventListener('DOMContentLoaded', caricaPrenotazioni);