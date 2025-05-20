import sqlite3

from flask import jsonify, request, session

DB_PATH = "biblioteca.db"


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn



def success_response(data=None, message="OK"):
    payload = {"status": "success", "message": message}
    if data is not None:
        payload["data"] = data
    return jsonify(payload), 200


def error_response(message="Errore", code=400):
    return jsonify({"status": "error", "message": message}), code


def login_required(fn):
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return error_response("Login richiesto", 401)
        return fn(*args, **kwargs)

    wrapper.__name__ = fn.__name__
    return wrapper
