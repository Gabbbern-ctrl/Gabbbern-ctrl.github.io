import sqlite3
from datetime import datetime

def create_database():
    conn = sqlite3.connect('hotel.db')
    cursor = conn.cursor()

    # Tabella utenti
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'reception', 'guest')),
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Tabella stanze
    cursor.execute('''
CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hotel_id INTEGER NOT NULL,
    room_number TEXT NOT NULL,
    room_type TEXT NOT NULL CHECK(room_type IN ('single', 'double', 'suite', 'family')),
    capacity INTEGER NOT NULL,
    price_per_night REAL NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    UNIQUE (hotel_id, room_number)
    )
    ''')

    # Tabella prenotazioni
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER NOT NULL,
        guest_id INTEGER NOT NULL,
        reception_id INTEGER,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        total_price REAL NOT NULL,
        is_offer BOOLEAN DEFAULT 0,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'canceled', 'rejected', 'completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        processed_at TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(id),
        FOREIGN KEY (guest_id) REFERENCES users(id),
        FOREIGN KEY (reception_id) REFERENCES users(id)
    )
    ''')
    
    # Aggiungi questa tabella dopo la creazione delle altre tabelle
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS room_offers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER NOT NULL,
        discount_percent REAL NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        description TEXT,
        FOREIGN KEY (room_id) REFERENCES rooms(id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        latitude REAL, 
        longitude REAL,
        description TEXT
    )
    ''')
    
    conn.commit()
    conn.close()
    
    

if __name__ == '__main__':
    create_database()
    print("Database creato con successo!")