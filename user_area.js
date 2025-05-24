document.addEventListener('DOMContentLoaded', () => {
    caricaUtente();
    caricaStorico();
});

async function caricaUtente() {
    const infoSection = document.getElementById('user-info');
    try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) throw new Error(res.statusText);
        const user = await res.json();
        infoSection.innerHTML = `
      <p><strong>Nome:</strong> ${user.first_name}</p>
      <p><strong>Cognome:</strong> ${user.last_name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Password:</strong> *******</p>
    `;
    } catch (e) {
        infoSection.innerHTML = '<p>Errore nel caricamento dati utente.</p>';
        console.error(e);
    }
}

async function caricaStorico() {
    const historyContainer = document.getElementById('history-list');
    try {
        const res = await fetch('/api/bookings/user');
        if (!res.ok) throw new Error(res.statusText);
        const bookings = await res.json();

        if (bookings.length === 0) {
            historyContainer.innerHTML = '<p>Nessuna prenotazione trovata.</p>';
            return;
        }

        historyContainer.innerHTML = '';
        bookings.forEach(bk => {
            const div = document.createElement('div');
            div.className = 'booking-item';
            div.innerHTML = `
        <p><strong>ID:</strong> ${bk.id}</p>
        <p><strong>Camera:</strong> ${bk.room_id}</p>
        <p><strong>Period:</strong> ${bk.start_date} → ${bk.end_date}</p>
        <p><strong>Status:</strong> ${bk.status}</p>
      `;
            historyContainer.appendChild(div);
        });
    } catch (e) {
        historyContainer.innerHTML = '<p>Errore nel caricamento storico.</p>';
        console.error(e);
    }
}