import sqlite3
import os

DB_FILE = "messages.db"

def read_messages():
    if not os.path.exists(DB_FILE):
        print("\n📬 Database not found. Inbox is currently empty!\n")
        return

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, message, timestamp FROM messages ORDER BY timestamp DESC")
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            print("\n📬 Inbox is currently empty. No messages yet!\n")
        else:
            print(f"\n📬 --- YOUR INBOX ({len(rows)} messages) --- 📬")
            print("=" * 60)
            for row in rows:
                print(f"[{row[4]}] From: {row[1]} <{row[2]}>")
                print(f"Message: {row[3]}")
                print("-" * 60)
                
    except Exception as e:
        print(f"Error reading database: {e}")

if __name__ == "__main__":
    read_messages()