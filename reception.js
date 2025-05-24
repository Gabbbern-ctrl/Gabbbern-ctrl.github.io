// reception.js - versione mock per testare il front-end senza back-end

document.addEventListener('DOMContentLoaded', caricaPrenotazioni);

// Dati di esempio locali per test
const MOCK_BOOKINGS = [
    { id: 1, room_id: 109, start_date: '2025-06-01', end_date: '2025-06-05' },
    { id: 2, room_id: 202, start_date: '2025-06-10', end_date: '2025-06-12' },
    { id: 3, room_id: 104, start_date: '2025-06-15', end_date: '2025-06-17' },
    { id: 4, room_id: 420, start_date: '2025-06-19', end_date: '2025-06-22' },
    { id: 5, room_id: 69, start_date: '2025-07-10', end_date: '2025-07-12' }
];

async function caricaPrenotazioni() {
    const container = document.getElementById('booking-list');
    container.innerHTML = '<p>Caricamento in corso...</p>';

    try {
        // Chiamata API originale commentata per il mock:
        // const response = await fetch('/api/bookings/pending');
        // const data = await response.json();

        // Usa dati locali per test
        const data = MOCK_BOOKINGS;

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
        // Chiamata API originale commentata per il mock:
        // const response = await fetch(`/api/bookings/${id}/decision`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ decision: decisione }),
        // });
        // const result = await response.json();

        // Simula risposta per test
        const result = { message: `Prenotazione ${decisione === 'approved' ? 'approvata' : 'rifiutata'} (mock).` };

        alert(result.message);
        caricaPrenotazioni();
    } catch (error) {
        alert("Errore durante l'operazione.");
        console.error('Errore:', error);
    }
}