from app.db import get_session, init_db
from app.models import Puzzle, PuzzleWord

def make_puzzle(title, category, description, grid_lines, words):
    # Memastikan grid berukuran 10x10. Menggunakan slice[:10] dan ljust(10, "X")
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
        # Hanya menambahkan puzzle baru tanpa menghapus data lain
        # Jika ingin menghapus puzzle lama, uncomment baris berikut:
        # s.query(PuzzleWord).delete(); s.query(Puzzle).delete(); s.commit()

        puzzles = []

        # =========================================================
        # === Kategori yang Sudah Ada (5 Puzzle Awal)
        # =========================================================

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
        
        # =========================================================
        # === 10 PUZZLE BARU (2 per Kategori)
        # =========================================================
        
        # NEW PUZZLE (C) - Budaya 2
        puzzles.append(make_puzzle(
            "Tarian Tradisional",
            "Budaya",
            "Cari nama-nama tarian dari berbagai daerah di Indonesia (10x10)",
            [
                "SAMANXYZZX",
                "PIRINGXXLM",
                "SERIMPIQWX",
                "JIPINGXKLM",
                "REOGKECGMN",
                "JAIPONGPRK",
                "LENONGKMXY",
                "BALETXQRTU",
                "RONGGENGIX",
                "TOPENGZAYX"
            ],
            ["SAMAN", "PIRING", "SERIMPI", "REOG", "JAIPONG", "RONGGENG", "TOPENG"]
        ))

        # NEW PUZZLE (C) - Budaya 3
        puzzles.append(make_puzzle(
            "Alat Musik",
            "Budaya",
            "Istilah alat musik tradisional dan modern (10x10)",
            [
                "ANGKLUNGXX",
                "PIANOYZZXY",
                "SERUNAIQWE",
                "GONGXRTYUX",
                "GITARKLLMN",
                "VIOLASMNOP",
                "KENDANGQRT",
                "SAXOPHONEZ",
                "HARPANTIXY",
                "DRUMXASDFG"
            ],
            ["ANGKLUNG", "PIANO", "SERUNAI", "GONG", "GITAR", "VIOLA", "KENDANG", "DRUM"]
        ))

        # NEW PUZZLE (B) - Makanan 2
        puzzles.append(make_puzzle(
            "Masakan Nusantara",
            "Makanan",
            "Cari makanan khas Indonesia (10x10)",
            [
                "RENDANGQWE",
                "GUDHEGXYZX",
                "SATEDUTYUI",
                "RAWONMLKJA",
                "CENDOLHGFD",
                "TEKWANPOIU",
                "PEMPEKNBVC",
                "SOTONGYTRE",
                "AYAMOPASDD",
                "BAKSOQWEAS"
            ],
            ["RENDANG", "GUDHEG", "SATE", "RAWON", "CENDOL", "PEMPEK", "SOTO", "AYAM", "BAKSO"]
        ))

        # NEW PUZZLE (B) - Makanan 3
        puzzles.append(make_puzzle(
            "Minuman Segar",
            "Makanan",
            "Nama-nama minuman populer (10x10)",
            [
                "TEHBOTOLQW",
                "ESKOPITRYU",
                "JUSMANGGOX",
                "WEDANGQASW",
                "BAJIGURXYZ",
                "CINCAUWTRF",
                "MOCKTAILSS",
                "SODACOLAUI",
                "BIRPLETOCK",
                "KOLAKNEML"
            ],
            ["TEH", "ESKOPI", "MANGGO", "WEDANG", "BAJIGUR", "CINCAU", "SODA", "KOLAK"]
        ))

        # NEW PUZZLE (D) - Matematika 2
        puzzles.append(make_puzzle(
            "Geometri Ruang",
            "Matematika",
            "Istilah-istilah dalam Geometri dan Ruang (10x10)",
            [
                "PERSEGIWXX",
                "LINGKARANX",
                "SEGITIGACQ",
                "TITIKKLMNX",
                "GARISXYZAB",
                "BIDANGDEFX",
                "KUBUSGHIJX",
                "JAJARANXL",
                "DIAMETERXM",
                "LUASQWERTY"
            ],
            ["PERSEGI", "LINGKARAN", "SEGITIGA", "TITIK", "GARIS", "BIDANG", "KUBUS", "LUAS"]
        ))

        # NEW PUZZLE (D) - Matematika 3
        puzzles.append(make_puzzle(
            "Aljabar Lanjut",
            "Matematika",
            "Konsep dan istilah dalam Aljabar (10x10)",
            [
                "PERSAMAANQ",
                "KOEFISIENX",
                "VARIABELYX",
                "POLINOMIAL",
                "MATRIKSWQE",
                "FUNGSITRTY",
                "DERIVATIFU",
                "INTEGRALAS",
                "LIMITPOIXY",
                "FAKTORINGX"
            ],
            ["PERSAMAAN", "KOEFISIEN", "VARIABEL", "MATRIKS", "FUNGSI", "LIMIT", "FAKTOR"]
        ))
        
        # NEW PUZZLE (A) - Pemrograman 2
        puzzles.append(make_puzzle(
            "Web Development",
            "Pemrograman",
            "Istilah populer dalam pengembangan web (10x10)",
            [
                "HTMLCSSQWE",
                "JAVASCRIPT",
                "REACTNATIV",
                "ANGULARJST",
                "NODEJSHIJK",
                "SERVERSLMN",
                "CLIENTOPQR",
                "APIRESTUVW",
                "DATABASEXX",
                "CLOUDHOSTX"
            ],
            ["HTML", "CSS", "JAVASCRIPT", "REACT", "NODEJS", "SERVER", "CLIENT", "API"]
        ))

        # NEW PUZZLE (A) - Pemrograman 3
        puzzles.append(make_puzzle(
            "Konsep Data",
            "Pemrograman",
            "Konsep umum dalam struktur data dan algoritma (10x10)",
            [
                "STACKQUEUE",
                "TREEMAPXCY",
                "GRAPHSEARCH",
                "SORTINGZAX",
                "HEAPKLMNXX",
                "RECURSIONX",
                "POINTERXXQ",
                "MEMORYADDR",
                "CACHEHITXX",
                "BOOLEANVAL"
            ],
            ["STACK", "QUEUE", "TREE", "GRAPH", "SORTING", "RECURSION", "MEMORY", "BOOLEAN"]
        ))

        # NEW PUZZLE (E) - Fisika 2
        puzzles.append(make_puzzle(
            "Elektromagnetik",
            "Fisika",
            "Istilah terkait listrik dan magnet (10x10)",
            [
                "LISTRIKXYZ",
                "MAGNETQWER",
                "VOLTASETIU",
                "AMPEREASDF",
                "OHMRESISTX",
                "INDUKSIGHI",
                "MEDANJJKL",
                "GAYAMNOPES",
                "ENERGIQRTY",
                "KAPASITORX"
            ],
            ["LISTRIK", "MAGNET", "VOLT", "AMPERE", "OHM", "INDUKSI", "MEDAN", "GAYA"]
        ))

        # NEW PUZZLE (E) - Fisika 3
        puzzles.append(make_puzzle(
            "Mekanika",
            "Fisika",
            "Konsep dasar Mekanika (10x10)",
            [
                "KECEPATAN",
                "PERCEPATAN",
                "MOMENTUMSS",
                "IMPULSQWEA",
                "KERJAUIOPZ",
                "POWERXCVBN",
                "TORKMALKJS",
                "FRIKSIYUTI",
                "MASSAASDFX",
                "HUKUMNEWTO"
            ],
            ["KECEPATAN", "PERCEPATAN", "MOMENTUM", "IMPULS", "KERJA", "POWER", "TORK", "MASSA"]
        ))


        s.add_all(puzzles)
        s.commit()
        print(f"✅ Puzzle seed berhasil ditambahkan ({len(puzzles)} puzzle total).")

if __name__ == "__main__":
    seed()
