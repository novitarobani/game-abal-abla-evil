export interface GameLocation {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  atmosphere: string;
  icon: string;
  puzzles: string[];
}

export interface CameraStyle {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  visualVibe: string;
  tensionLevel: 'HIGH' | 'CRITICAL' | 'EXTREME';
}

export interface Protagonist {
  id: string;
  name: string;
  nameEn: string;
  background: string;
  startingGear: string[];
  specialAbility: string;
}

export interface HorrorThreat {
  id: string;
  name: string;
  nameEn: string;
  behavior: string;
  vulnerability: string;
  soundCue: string;
  threatLevel: 'FINE' | 'CAUTION' | 'DANGER';
}

export interface HorrorConcept {
  location: GameLocation;
  camera: CameraStyle;
  protagonist: Protagonist;
  threat: HorrorThreat;
  userNotes: string;
}

export const LOCATIONS: GameLocation[] = [
  {
    id: 'mansion',
    name: 'Rumah Mewah Arklay (Arklay Manor)',
    nameEn: 'Abandoned Victorian Mansion',
    description: 'Rumah bergaya Gotik Victoria terpencil di tengah hutan berkabut tebal. Penuh dengan koridor sempit berkarpet merah, jam pendulum tua yang berdetak keras, jendela kaca patri, lukisan misterius, dan ruang rahasia di balik perapian.',
    atmosphere: 'Dingin, sunyi senyap, didominasi bau kayu lapuk dan darah mengering.',
    icon: 'Home',
    puzzles: [
      'Menyusun 4 Kepingan Emblem Matahari, Bulan, Bintang, dan Langit untuk membuka pintu gerbang halaman belakang.',
      'Memutar jarum jam dinding besar sesuai urutan petunjuk lukisan silsilah keluarga.'
    ]
  },
  {
    id: 'police',
    name: 'Kantor Polisi Kota Raccoon (Raccoon Precinct)',
    nameEn: 'Converted Museum Police Department',
    description: 'Bekas museum seni yang diubah menjadi markas polisi. Langit-langitnya tinggi, dihiasi patung dewi marmer raksasa di lobi utama, jeruji sel besi yang dingin, dan ruang interogasi yang kedap suara.',
    atmosphere: 'Suasana darurat penuh kepanikan, sirine mati-nyala, tumpukan berkas tugas berserakan, bercak peluru di dinding.',
    icon: 'Shield',
    puzzles: [
      'Menemukan 3 buah Medali (Singa, Unicorn, Perawan) untuk dimasukkan ke relief patung lobi utama agar tangga rahasia terbuka.',
      'Menyelaraskan saklar sekring listrik darurat di ruang bawah tanah.'
    ]
  },
  {
    id: 'laboratory',
    name: 'Laboratorium Bawah Tanah (NEST Bio-Lab)',
    nameEn: 'Subterranean Research Center',
    description: 'Fasilitas ilmiah steril steril milik korporasi farmasi misterius, terletak ratusan meter di bawah tanah. Pintu otomatis mengandalkan sensor keycard warna, pipa pendingin uap bocor, dan tabung inkubasi raksasa yang retak.',
    atmosphere: 'Sangat industrial, suara dengung komputer pusat, alarm kebocoran biologis berbunyi pelan (beep-beep), lampu neon berkedip biru dingin.',
    icon: 'FlaskConical',
    puzzles: [
      'Mencampur rasio bahan kimia asam sulfat di tabung sintesis gas pembasmi tanaman mutan.',
      'Melakukan override protokol darurat dengan mencocokkan pola frekuensi gelombang sinyal radio.'
    ]
  },
  {
    id: 'hospital',
    name: 'Rumah Sakit Jiwa Saint Mercy (Saint Mercy Asylum)',
    nameEn: 'Abandoned Decayed Medical Complex',
    description: 'Sanatorium kuno yang terbengkalai sejak dekade 70-an. Memiliki lorong-lorong panjang berlapis cat mengelupas, ruang autopsi yang pengap, deretan kursi roda berkarat, dan lemari arsip rekam medis pasien yang berdebu.',
    atmosphere: 'Mencekam, bau karbol tajam bercampur besi karat, gemercik air menetes dari pipa langit-langit yang lambat.',
    icon: 'HeartPulse',
    puzzles: [
      'Mengambil kunci ruang mayat dari dalam lemari es freezer menggunakan tuas kemudi katup uap air panas.',
      'Menyusun pecahan plat rontgen paru-paru di atas papan lampu guna membaca sandi kode kombinasi tombol lemari obat.'
    ]
  }
];

export const CAMERAS: CameraStyle[] = [
  {
    id: 'fixed',
    name: 'Fixed Camera Angles (Sudut Pandang Statis Klasik)',
    nameEn: 'Classic Cinematic Angles',
    description: 'Sudut kamera terpasang statis di sudut ruangan layaknya CCTV bioskop. Menciptakan blind-spot strategis di balik belokan lorong, sehingga pemain mendengarkan erangan monster sebelum benar-benar bisa melihatnya.',
    visualVibe: 'Sangat sinematik ala Resident Evil 1/2/3 original. Gerakan menggunakan kendali arah relatif (Tank Controls klasik / Modern-relative).',
    tensionLevel: 'CRITICAL'
  },
  {
    id: 'ots',
    name: 'Over-The-Shoulder (Tiga Perempat Bahu)',
    nameEn: 'Modern Over-The-Shoulder View',
    description: 'Kamera terkunci rapat di belakang kanan pundak karakter utama. Sudut pandang menjadi sempit, memicu ketakutan luar biasa ketika ada ancaman menyergap secara tiba-tiba dari arah belakang atau samping.',
    visualVibe: 'Gaya modern ala Resident Evil 2/3/4 Remake. Menyorot sorotan senter yang menerangi debu-debu melayang dalam kegelapan.',
    tensionLevel: 'HIGH'
  },
  {
    id: 'fp',
    name: 'First-Person (Sudut Pandang Orang Pertama)',
    nameEn: 'Immersive First-Person View',
    description: 'Pemain melihat langsung melalui mata karakter. Menghilangkan jarak antara pemain dan bahaya. Setiap tarikan napas berat terdengar jelas di telinga saat monster mendekat.',
    visualVibe: 'Gaya Resident Evil 7 & Village. Menghadirkan detail tekstur kotoran ruang sempit secara ekstrem, gerakan tangan bergetar saat membidik.',
    tensionLevel: 'EXTREME'
  }
];

export const PROTAGONISTS: Protagonist[] = [
  {
    id: 'police_elite',
    name: 'Sergei / Clara (Anggota Pasukan Elit S.T.A.R.S.)',
    nameEn: 'Tactical Special Agent',
    background: 'Anggota unit taktis polisi khusus yang dikirim untuk misi penyelamatan. Sangat terlatih menggunakan senjata api dan pertarungan jarak dekat.',
    startingGear: [
      'Pistol Sembilan Milimeter (Browning HP / Samurai Edge Corp)',
      'Pisau Taktis Baja',
      'Pita Mesin Tik (Penyelamat 2x)'
    ],
    specialAbility: 'Steady Aim: Mengurangi getaran tangan saat membidik, meningkatkan peluang tembakan kritis (critical hit multiplier) sebesar 2x lipat.'
  },
  {
    id: 'civilian',
    name: 'Budi / Maria (Mahasiswa / Sipil Terjebak)',
    nameEn: 'Unprepared Civilian Survivor',
    background: 'Warga sipil malang yang mencari adiknya yang hilang, namun tidak sengaja memasuki area terkontaminasi. Tidak memiliki pengalaman tempur militer.',
    startingGear: [
      'Senter Saku Sederhana',
      'Pistol Saku Kecil (.22 Caliber - Peluru Sisa 4)',
      'Semprotan Medis (Penyembuh Penuh)'
    ],
    specialAbility: 'Survival Instinct: Berlari 25% lebih cepat ketika dalam status kesehatan "DANGER" (Hampir Mati) untuk meloloskan diri dari terkaman.'
  },
  {
    id: 'scientist',
    name: 'Dr. Hendra (Ilmuwan Eks-Karyawan Khianat)',
    nameEn: 'Former Rogue Research Scientist',
    background: 'Mantan ahli virologi korporat jahat tersebut yang mencoba melarikan diri membawa virus penawar setelah disabotase oleh pihak internal.',
    startingGear: [
      'Pistol Pembius (Dart Gun - 3 amunisi)',
      'Alat Campur Kimia (Portable Chemistry Kit)',
      'Kartu Akses Enkripsi Level 2'
    ],
    specialAbility: 'Chemical Synthesis: Dapat menggabungkan bubuk mesiu (Gunpowder) dengan cairan kimia botol untuk menciptakan Amunisi Asam (Acid Rounds) yang sangat destruktif.'
  },
  {
    id: 'detective',
    name: 'Arthur (Detektif Swasta Kasus Hilang)',
    nameEn: 'Hard-Boiled Private Investigator',
    background: 'Detektif veteran yang menyelidiki serangkaian pembunuhan kanibalisme aneh di pinggiran kota. Memiliki intuisi tajam dan hati yang keras.',
    startingGear: [
      'Revolver Berat (.44 Magnum - Tersisa 2 peluru)',
      'Korek Api Zippo Klasik',
      'Buku Catatan Hitam (Berisi sisa coretan petunjuk lobi)'
    ],
    specialAbility: 'Keen Eye: Objek interaktif, berkas petunjuk, atau item penting di kejauhan akan memancarkan kilauan cahaya kecil sekilas (sparkle hint).'
  }
];

export const THREATS: HorrorThreat[] = [
  {
    id: 'mutated_undead',
    name: 'Zombi Korban V-Virus (Mutated Living Dead)',
    nameEn: 'Stalking Ghouls',
    behavior: 'Manusia yang tewas terkena paparan virus biologis. Berjalan pelan menyeret kaki dengan suara mengerang lapar, mendobrak pintu/jendela kayu, dan sangat tahan peluru kecuali ditembak tepat di kepala (headshot).',
    vulnerability: 'Kepala (Tembakan Senapan Sebar / Shotgun), Api (Jika tidak dibakar, jasad zombi bisa bermutasi menjadi monster pencakar ganas berkuku panjang setelah satu jam).',
    soundCue: 'Erangan parau tenggorokan basah ("Uuugghhh...") dan seretan kaki di lantai kayu berderit.',
    threatLevel: 'FINE'
  },
  {
    id: 'crawler_experiment',
    name: 'Licker / Eksperimen Pengelupas (The Flesh-Stripped Stalker)',
    nameEn: 'Blind Razor-Clawed Crawler',
    behavior: 'Anomali biologi yang kulit tubuhnya terkelupas habis akibat infeksi tingkat dua. Merayap cepat di langit-langit, tidak memiliki mata namun pendengaran mereka sangat tajam (super-sensitive hearing).',
    vulnerability: 'Tembakan Grenade Launcher (Peluru Api / Granat Asam), Suara perlahan (Pemain bisa melewatinya tanpa diserang dengan cara berjalan sangat pelan / jinjit).',
    soundCue: 'Lendir menetes keras ke lantai ("splat.. splat..."), nafas anjing berliur, dan gesekan kuku tajam mencakar dinding seketika.',
    threatLevel: 'CAUTION'
  },
  {
    id: 'cultist',
    name: 'Kultus Bayangan Kuno (Keepers of the Abyss)',
    nameEn: 'Archaic Blood-Chanting Cultists',
    behavior: 'Manusia penganut sekte sesat dalam pengaruh parasit spora purba. Mengorbankan akal sehat demi kekuatan mistis. Membawa kapak jagal, sabit berkarat, tameng kayu kasar, dan sanggup berkoordinasi mengepung pemain.',
    vulnerability: 'Cahaya Flashbang (Membutakan gulita spora parasit di kepala mereka hingga terekspos), Tembakan Senapan Runduk (Sniper Rifle) di bagian parasit inti leher.',
    soundCue: 'Petikan lonceng perunggu pelan dan gumaman mantra berbisik massal dalam bahasa kuno ("Gloria a las plagas...").',
    threatLevel: 'CAUTION'
  },
  {
    id: 'unstoppable_stalker',
    name: 'T-00 Nemesis / Sang Pemburu Abadi (Unstoppable Nemesis Protype)',
    nameEn: 'Persistent Heavy Tyrant Tracker',
    behavior: 'Senjata bio-organik humanoid setinggi 2.5 meter mengenakan jubah kulit hitam penahan daya rusak. Dikontrol kecerdasan buatan terprogram dengan SATU target: memburu dan membunuh Anda secara brutal. Mengejar di area mana pun tanpa henti (bahkan menembus pintu safe room tertentu!).',
    vulnerability: 'Hanya bisa dilumpuhkan sementara (downed) menggunakan senjata peledak berat / RPG atau sengatan panel transformator tegangan listrik tinggi guna mendapatkan item koper istimewa di tubuhnya.',
    soundCue: 'Langkah kaki hentakan boot militer sangat berat yang menggetarkan layar, raungan parau khas robotik ("S.T.A.R.S..."), dan hantaman dinding hancur berkeping-keping.',
    threatLevel: 'DANGER'
  }
];
