# app/puzzle_seed.py
from app.db import get_session, init_db
from app.models import Puzzle, PuzzleWord

def make_puzzle(title, category, description, grid_lines, words):
    p = Puzzle(
        title=title,
        category=category,
        description=description,
        grid_data="|".join([line.upper()[:10].ljust(10, "X") for line in grid_lines])
    )
    p.words = [PuzzleWord(word=w.upper()) for w in words]
    return p

def seed():
    init_db()
    with get_session() as s:
        # hanya menambahkan puzzle baru tanpa menghapus data lain
        # Jika ingin menghapus puzzle lama, uncomment baris berikut:
        # s.query(PuzzleWord).delete(); s.query(Puzzle).delete(); s.commit()

        puzzles = []

        # === Budaya (C) ===
        puzzles.append(make_puzzle(
            "Budaya Indonesia",
            "Budaya",
            "Puzzle kata: Budaya Indonesia (10x10)",
            [
                "BUDAYAXYZZ",
                "TARIKECJAR",
                "KECAKUSANM",
                "BATIKXLMNO",
                "RAMAYANASQ",
                "GAMELANOPQ",
                "SAMIRANGIXX",
                "PONOROGOXQ",
                "BONONOHHOR",
                "DANCESTARX"
            ],
            ["BUDAYA", "TARI", "KECAK", "BATIK", "RAMAYANA", "GAMELAN", "PONOROGO"]
        ))

        # === Makanan (B) ===
        puzzles.append(make_puzzle(
            "Kuliner Dunia",
            "Makanan",
            "Puzzle kata: Kuliner dan makanan populer (10x10)",
            [
                "PIZZABUNGG",
                "SUSHIANAEE",
                "NASIGORENX",
                "MIEGORENXX",
                "TACOSHAKIX",
                "CURRYPANIX",
                "PASTALAZAX",
                "BULGOGISOX",
                "LASAGNAXQW",
                "RISOTTOUIX"
            ],
            ["PIZZA", "SUSHI", "NASI", "MIE", "TACOS", "CURRY", "PASTA", "RISOTTO"]
        ))

        # === Matematika (D) ===
        puzzles.append(make_puzzle(
            "Matematika Dasar",
            "Matematika",
            "Puzzle kata: Istilah Matematika (10x10)",
            [
                "ADDITIONSX",
                "MULTIPLIEX",
                "FACTORIALX",
                "PRIMESNUMX",
                "ALGEBRAZZX",
                "GEOMETRYXX",
                "CALCULUSXX",
                "SERIESQWER",
                "SETSNUMBEX",
                "RATIOSUVWX"
            ],
            ["ADDITION", "MULTIPLY", "FACTORIAL", "PRIME", "ALGEBRA", "GEOMETRY", "CALCULUS"]
        ))

        # === Pemrograman (A) ===
        puzzles.append(make_puzzle(
            "Pemrograman & Coding",
            "Pemrograman",
            "Puzzle kata: Istilah pemrograman (10x10)",
            [
                "PYTHONABCD",
                "ARRAYLOOPXX",
                "FUNCTIONXE",
                "VARIABLEZZX",
                "DEBUGGINGX",
                "ALGORITHMX",
                "DATASTRUCT",
                "REPOGITHUB",
                "COMPILEXXX",
                "BINARYFLAGX"
            ],
            ["PYTHON", "ARRAY", "LOOP", "FUNCTION", "VARIABLE", "DEBUG", "ALGORITHM"]
        ))

        # === Fisika (E) ===
        puzzles.append(make_puzzle(
            "Fisika Ringkas",
            "Fisika",
            "Puzzle kata: Istilah fisika (10x10)",
            [
                "NEWTONFORC",
                "ENERGYMASSX",
                "INELASTICS",
                "GRAVITYACH",
                "HARMONICSX",
                "THERMODYNX",
                "RELATIVITYX",
                "OPTICSWAVE",
                "POTENTIALS",
                "SIGNALSXXXX"
            ],
            ["NEWTON", "ENERGY", "GRAVITY", "OPTICS", "RELATIVITY", "THERMO"]
        ))

        s.add_all(puzzles)
        s.commit()
        print("✅ Puzzle seed berhasil ditambahkan (5 puzzle).")

if __name__ == "__main__":
    seed()
