document.addEventListener('DOMContentLoaded', () => {
    caricaPrenotazioni();
});

async function caricaPrenotazioni() {
    const container = document.getElementById('booking-list');
    container.innerHTML = '<p>Caricamento in corso...</p>';

    try {
        const response = await fetch('/api/bookings/pending');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = '<p>Nessuna prenotazione in attesa.</p>';
            return;
        }

        data.forEach(booking => {
            const div = document.createElement('div');
            div.classList.add('booking');
            div.innerHTML = `
                <p><strong>ID Prenotazione:</strong> ${booking.id}</p>
                <p><strong>Camera:</strong> ${booking.room_id}</p>
                <p><strong>Data Inizio:</strong> ${booking.start_date}</p>
                <p><strong>Data Fine:</strong> ${booking.end_date}</p>
                <div class="buttons">
                    <button class="approve">Approva</button>
                    <button class="reject">Rifiuta</button>
                </div>
            `;

            const approveBtn = div.querySelector('.approve');
            const rejectBtn = div.querySelector('.reject');
            approveBtn.addEventListener('click', () => decidi(booking.id, 'approved'));
            rejectBtn.addEventListener('click', () => decidi(booking.id, 'rejected'));

            container.appendChild(div);
        });
    } catch (error) {
        container.innerHTML = '<p>Errore nel caricamento.</p>';
        console.error('Errore:', error);
    }
}

async function decidi(id, decisione) {
    try {
        const response = await fetch(`/api/bookings/${id}/decision`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decision: decisione }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        alert(result.message);
        caricaPrenotazioni();
    } catch (error) {
        alert("Errore durante l'operazione.");
        console.error('Errore:', error);
    }
}
