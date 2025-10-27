from app.db import get_session, init_db
from app.models import (
    Quiz, Question, Choice, Category,
    Puzzle, PuzzleWord
)

from app.puzzle_seed import make_puzzle

def seed_all():
    init_db()
    with get_session() as s:

        # ✅ Hapus data sesuai tabelnya masing-masing
        s.query(PuzzleWord).delete()
        s.query(Puzzle).delete()
        s.commit()

        s.query(Choice).delete()
        s.query(Question).delete()
        s.query(Quiz).delete()
        s.query(Category).delete()
        s.commit()

        # =========================
        # ✅ SEED CATEGORY + QUIZ
        # =========================
        cat_programming = Category(name="Pemrograman")
        cat_food = Category(name="Makanan")
        cat_culture = Category(name="Budaya")
        cat_math = Category(name="Matematika")
        cat_physics = Category(name="Fisika")
        cat_ai = Category(name="AI & ML")

        s.add_all([cat_programming, cat_food, cat_culture, cat_math, cat_physics, cat_ai])
        s.commit()

        # =========================
        # ✅ Import quiz dari seed.py (copy isi quizmu disini)
        # =========================
        quiz1 = Quiz(
            title="Quiz Python Dasar",
            description="Tes pengetahuan dasar tentang Python 🐍. Quiz ini mencakup konsep fundamental seperti tipe data, sintaks dasar, fungsi bawaan seperti print(), serta pemahaman mengenai bagaimana Python bekerja. Cocok untuk pemula yang ingin memastikan pemahaman awal sebelum masuk ke materi lebih lanjut seperti OOP dan modular programming."
        )
        quiz1.categories = [cat_programming]
        quiz1.questions = [
            Question(text="Apa kepanjangan dari 'Py'?", choices=[
                Choice(text="Python", is_correct=True),
                Choice(text="Pyramid", is_correct=False),
                Choice(text="PyTest", is_correct=False),
            ]),
            Question(text="Tipe data teks di Python?", choices=[
                Choice(text="int", is_correct=False),
                Choice(text="str", is_correct=True),
                Choice(text="bool", is_correct=False),
            ]),
            Question(text="Fungsi untuk mencetak ke layar di Python?", choices=[
                Choice(text="print()", is_correct=True),
                Choice(text="echo()", is_correct=False),
                Choice(text="display()", is_correct=False),
            ]),
        ]

        quiz2 = Quiz(
            title="Quiz Logika Pemrograman",
            description="Tes kemampuan dasar logika pemrograman 💡. Kamu akan diuji mengenai operator logika seperti AND dan OR, perhitungan matematis, percabangan, serta cara berpikir komputasional. Sangat cocok sebagai pijakan awal belajar coding agar siap menghadapi bahasa pemrograman apa pun."
        )
        quiz2.categories = [cat_programming]
        quiz2.questions = [
            Question(text="Apa hasil dari 5 % 2?", choices=[
                Choice(text="1", is_correct=True),
                Choice(text="2", is_correct=False),
                Choice(text="0", is_correct=False),
            ]),
            Question(text="Operator logika 'AND' di Python?", choices=[
                Choice(text="&&", is_correct=False),
                Choice(text="and", is_correct=True),
                Choice(text="||", is_correct=False),
            ]),
        ]

        quiz3 = Quiz(
            title="Quiz HTML Dasar",
            description="Uji kemampuan dasar tentang HTML 🌐. Mulai dari struktur dokumen, penggunaan tag yang benar, sampai elemen umum seperti paragraf, tautan, dan heading. Quiz ini membantu memahami pondasi pembuatan website sebelum melanjutkan ke CSS dan JavaScript."
        )
        quiz3.categories = [cat_programming]
        quiz3.questions = [
            Question(text="Tag untuk membuat paragraf di HTML?", choices=[
                Choice(text="<p>", is_correct=True),
                Choice(text="<para>", is_correct=False),
                Choice(text="<text>", is_correct=False),
            ]),
            Question(text="Tag untuk membuat tautan?", choices=[
                Choice(text="<a>", is_correct=True),
                Choice(text="<link>", is_correct=False),
                Choice(text="<href>", is_correct=False),
            ]),
        ]

        quiz4 = Quiz(
            title="Quiz CSS Dasar",
            description="Tes pengetahuan dasar CSS 🎨. Kamu akan mempelajari cara mengubah warna, ukuran, serta gaya teks pada elemen HTML. Quiz ini membantu memahami prasyarat penting dalam front-end development modern agar tampilan web menjadi lebih menarik."
        )
        quiz4.categories = [cat_programming]
        quiz4.questions = [
            Question(text="Properti CSS untuk mengubah warna teks?", choices=[
                Choice(text="font-color", is_correct=False),
                Choice(text="text-color", is_correct=False),
                Choice(text="color", is_correct=True),
            ]),
            Question(text="Bagaimana cara membuat teks menjadi tebal di CSS?", choices=[
                Choice(text="font-weight: bold;", is_correct=True),
                Choice(text="text-style: bold;", is_correct=False),
                Choice(text="font-style: bold;", is_correct=False),
            ]),
        ]

        quiz5 = Quiz(
            title="Quiz JavaScript Dasar",
            description="Tes dasar logika dan sintaks JavaScript ⚡. Materi meliputi cara menampilkan pop-up interaktif, menggunakan operator identitas, serta memahami dasar yang sering digunakan dalam web interaktif modern."
        )
        quiz5.categories = [cat_programming]
        quiz5.questions = [
            Question(text="Bagaimana cara menampilkan alert di JavaScript?", choices=[
                Choice(text="print('Halo')", is_correct=False),
                Choice(text="console.log('Halo')", is_correct=False),
                Choice(text="alert('Halo')", is_correct=True),
            ]),
            Question(text="Operator perbandingan identik di JavaScript?", choices=[
                Choice(text="===", is_correct=True),
                Choice(text="==", is_correct=False),
                Choice(text="!=", is_correct=False),
            ]),
        ]

        quiz_ai = Quiz(
            title="Quiz AI & Machine Learning Dasar",
            description="Konsep dasar AI dan ML untuk pemula. Quiz ini mengenalkan perbedaan supervised dan unsupervised learning, jenis algoritma populer, serta bagaimana data berperan penting dalam melatih model kecerdasan buatan agar dapat membuat keputusan otomatis."
        )
        quiz_ai.categories = [cat_ai, cat_programming]
        quiz_ai.questions = [
            Question(text="Model supervised learning butuh apa?", choices=[
                Choice(text="Label pada data", is_correct=True),
                Choice(text="Hanya data tanpa label", is_correct=False),
                Choice(text="Tidak perlu data", is_correct=False),
            ]),
            Question(text="Contoh algoritma supervised learning:", choices=[
                Choice(text="Linear Regression", is_correct=True),
                Choice(text="K-Means", is_correct=False),
                Choice(text="Apriori", is_correct=False),
            ]),
        ]

        quiz_food = Quiz(
            title="Quiz Makanan & Kuliner",
            description="Pengetahuan umum tentang makanan dari seluruh dunia. Kamu akan mengenal berbagai hidangan lezat yang memiliki cita rasa dan budaya unik di baliknya. Cocok untuk pecinta kuliner yang ingin memperluas wawasan tentang makanan internasional."
        )
        quiz_food.categories = [cat_food, cat_culture]
        quiz_food.questions = [
            Question(text="Makanan khas Italia yang berupa adonan pipih dipanggang?", choices=[
                Choice(text="Sushi", is_correct=False),
                Choice(text="Pizza", is_correct=True),
                Choice(text="Tacos", is_correct=False),
            ]),
            Question(text="Bahan utama membuat nasi goreng?", choices=[
                Choice(text="Nasi", is_correct=True),
                Choice(text="Roti", is_correct=False),
                Choice(text="Pasta", is_correct=False),
            ]),
        ]

        quiz_culture = Quiz(
            title="Quiz Budaya & Tradisi",
            description="Pertanyaan tentang kebudayaan dan tradisi unik dari berbagai negara. Kamu akan mempelajari festival, tarian, dan karakter budaya yang menjadi identitas suatu bangsa. Cocok untuk memperluas pengetahuan global dan menumbuhkan rasa menghargai keberagaman."
        )
        quiz_culture.categories = [cat_culture]
        quiz_culture.questions = [
            Question(text="Festival lampion terkenal diselenggarakan di negara mana?", choices=[
                Choice(text="Jepang", is_correct=False),
                Choice(text="Thailand", is_correct=False),
                Choice(text="Cina", is_correct=True),
            ]),
            Question(text="Nama tari tradisional Bali yang terkenal?", choices=[
                Choice(text="Kecak", is_correct=True),
                Choice(text="Samba", is_correct=False),
                Choice(text="Flamenco", is_correct=False),
            ]),
        ]

        quiz_math = Quiz(
            title="Quiz Matematika Dasar",
            description="Soal-soal dasar matematika untuk melatih kemampuan berhitung. Kamu akan mengerjakan operasi hitung sederhana dan mengenal angka spesial dalam matematika. Sangat bermanfaat untuk menguatkan dasar logika numerik."
        )
        quiz_math.categories = [cat_math]
        quiz_math.questions = [
            Question(text="Berapa hasil 7 * 6?", choices=[
                Choice(text="42", is_correct=True),
                Choice(text="36", is_correct=False),
                Choice(text="48", is_correct=False),
            ]),
            Question(text="Bilangan prima terkecil?", choices=[
                Choice(text="1", is_correct=False),
                Choice(text="2", is_correct=True),
                Choice(text="3", is_correct=False),
            ]),
        ]

        quiz_physics = Quiz(
            title="Quiz Fisika Dasar",
            description="Konsep dasar fisika dan fenomena alam yang sering kita temui. Kamu akan mengenal besaran fisika, satuan SI, dan hukum dasar yang menjelaskan bagaimana benda bergerak di alam semesta."
        )
        quiz_physics.categories = [cat_physics]
        quiz_physics.questions = [
            Question(text="Satuan SI untuk gaya?", choices=[
                Choice(text="Newton", is_correct=True),
                Choice(text="Joule", is_correct=False),
                Choice(text="Pascal", is_correct=False),
            ]),
            Question(text="Gravitasi Bumi kira-kira?", choices=[
                Choice(text="9.8 m/s^2", is_correct=True),
                Choice(text="3.6 m/s^2", is_correct=False),
                Choice(text="15 m/s^2", is_correct=False),
            ]),
        ]

        s.add_all([
            quiz1, quiz2, quiz3, quiz4, quiz5,
            quiz_ai, quiz_food, quiz_culture, quiz_math, quiz_physics
        ])
        s.commit()

        # =========================
        # ✅ SEED PUZZLE
        # =========================
        puzzles = [
            make_puzzle(
                "Budaya Indonesia", "Budaya",
                "Puzzle kata: Budaya Indonesia (10x10)",
                ["BUDAYAXYZZ", "TARIKECJAR", "KECAKUSANM", "BATIKXLMNO",
                 "RAMAYANASQ", "GAMELANOPQ", "SAMIRANGIXX", "PONOROGOXQ",
                 "BONONOHHOR", "DANCESTARX"],
                ["BUDAYA", "TARI", "KECAK", "BATIK", "RAMAYANA", "GAMELAN", "PONOROGO"]
            ),
            make_puzzle(
                "Kuliner Dunia", "Makanan",
                "Puzzle kata: Kuliner dan makanan populer (10x10)",
                ["PIZZABUNGG", "SUSHIANAEE", "NASIGORENX", "MIEGORENXX",
                 "TACOSHAKIX", "CURRYPANIX", "PASTALAZAX", "BULGOGISOX",
                 "LASAGNAXQW", "RISOTTOUIX"],
                ["PIZZA", "SUSHI", "NASI", "MIE", "TACOS", "CURRY", "PASTA", "RISOTTO"]
            )
            # ...tambahkan puzzle lainmu
        ]

        s.add_all(puzzles)
        s.commit()

        print("✅ Semua data Quiz & Puzzle berhasil di-seed dalam 1 file!")

if __name__ == "__main__":
    seed_all()
