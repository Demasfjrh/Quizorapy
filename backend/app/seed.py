from app.db import get_session, init_db
from app.models import Quiz, Question, Choice

def seed():
    init_db()
    with get_session() as s:
        # Bersihkan data lama biar tidak duplikat
        s.query(Choice).delete()
        s.query(Question).delete()
        s.query(Quiz).delete()
        s.commit()

        # === QUIZ 1 ===
        quiz1 = Quiz(
            title="Quiz Python Dasar",
            description="Tes pengetahuan dasar tentang Python 🐍"
        )
        quiz1.questions = [
            Question(
                text="Apa kepanjangan dari 'Py'?",
                choices=[
                    Choice(text="Python", is_correct=True),
                    Choice(text="Pyramid", is_correct=False),
                    Choice(text="PyTest", is_correct=False),
                ]
            ),
            Question(
                text="Tipe data teks di Python?",
                choices=[
                    Choice(text="int", is_correct=False),
                    Choice(text="str", is_correct=True),
                    Choice(text="bool", is_correct=False),
                ]
            ),
            Question(
                text="Fungsi untuk mencetak ke layar di Python?",
                choices=[
                    Choice(text="print()", is_correct=True),
                    Choice(text="echo()", is_correct=False),
                    Choice(text="display()", is_correct=False),
                ]
            ),
        ]

        # === QUIZ 2 ===
        quiz2 = Quiz(
            title="Quiz Logika Pemrograman",
            description="Tes kemampuan dasar logika pemrograman 💡"
        )
        quiz2.questions = [
            Question(
                text="Apa hasil dari 5 % 2?",
                choices=[
                    Choice(text="1", is_correct=True),
                    Choice(text="2", is_correct=False),
                    Choice(text="0", is_correct=False),
                ]
            ),
            Question(
                text="Operator logika 'AND' di Python?",
                choices=[
                    Choice(text="&&", is_correct=False),
                    Choice(text="and", is_correct=True),
                    Choice(text="||", is_correct=False),
                ]
            ),
        ]

        # === QUIZ 3 ===
        quiz3 = Quiz(
            title="Quiz HTML Dasar",
            description="Uji kemampuan dasar tentang HTML 🌐"
        )
        quiz3.questions = [
            Question(
                text="Tag untuk membuat paragraf di HTML?",
                choices=[
                    Choice(text="<p>", is_correct=True),
                    Choice(text="<para>", is_correct=False),
                    Choice(text="<text>", is_correct=False),
                ]
            ),
            Question(
                text="Tag untuk membuat tautan?",
                choices=[
                    Choice(text="<a>", is_correct=True),
                    Choice(text="<link>", is_correct=False),
                    Choice(text="<href>", is_correct=False),
                ]
            ),
        ]

        # === QUIZ 4 ===
        quiz4 = Quiz(
            title="Quiz CSS Dasar",
            description="Tes pengetahuan dasar CSS 🎨"
        )
        quiz4.questions = [
            Question(
                text="Properti CSS untuk mengubah warna teks?",
                choices=[
                    Choice(text="font-color", is_correct=False),
                    Choice(text="text-color", is_correct=False),
                    Choice(text="color", is_correct=True),
                ]
            ),
            Question(
                text="Bagaimana cara membuat teks menjadi tebal di CSS?",
                choices=[
                    Choice(text="font-weight: bold;", is_correct=True),
                    Choice(text="text-style: bold;", is_correct=False),
                    Choice(text="font-style: bold;", is_correct=False),
                ]
            ),
        ]

        # === QUIZ 5 ===
        quiz5 = Quiz(
            title="Quiz JavaScript Dasar",
            description="Tes dasar logika dan sintaks JavaScript ⚡"
        )
        quiz5.questions = [
            Question(
                text="Bagaimana cara menampilkan alert di JavaScript?",
                choices=[
                    Choice(text="print('Halo')", is_correct=False),
                    Choice(text="console.log('Halo')", is_correct=False),
                    Choice(text="alert('Halo')", is_correct=True),
                ]
            ),
            Question(
                text="Operator perbandingan identik di JavaScript?",
                choices=[
                    Choice(text="===", is_correct=True),
                    Choice(text="==", is_correct=False),
                    Choice(text="!=", is_correct=False),
                ]
            ),
        ]

        # === QUIZ 6 ===
        quiz6 = Quiz(
            title="Quiz Database Dasar",
            description="Tes dasar tentang database dan SQL 🗄️"
        )
        quiz6.questions = [
            Question(
                text="Perintah untuk menampilkan semua data dari tabel 'users'?",
                choices=[
                    Choice(text="SHOW users;", is_correct=False),
                    Choice(text="SELECT * FROM users;", is_correct=True),
                    Choice(text="DISPLAY users;", is_correct=False),
                ]
            ),
            Question(
                text="Perintah untuk menghapus tabel?",
                choices=[
                    Choice(text="REMOVE TABLE", is_correct=False),
                    Choice(text="DELETE TABLE", is_correct=False),
                    Choice(text="DROP TABLE", is_correct=True),
                ]
            ),
        ]

        # === QUIZ 7 ===
        quiz7 = Quiz(
            title="Quiz Git & Version Control",
            description="Tes dasar penggunaan Git dan GitHub 🧭"
        )
        quiz7.questions = [
            Question(
                text="Perintah untuk membuat repository baru?",
                choices=[
                    Choice(text="git new", is_correct=False),
                    Choice(text="git init", is_correct=True),
                    Choice(text="git repo", is_correct=False),
                ]
            ),
            Question(
                text="Perintah untuk menambahkan semua file ke staging area?",
                choices=[
                    Choice(text="git add .", is_correct=True),
                    Choice(text="git commit -m 'msg'", is_correct=False),
                    Choice(text="git push", is_correct=False),
                ]
            ),
        ]

        s.add_all([quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7])
        s.commit()
        print("✅ Database berhasil di-seed dengan 7 quiz total!")

if __name__ == "__main__":
    seed()
