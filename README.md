## Test Results

Berikut hasil eksekusi automation test menggunakan Playwright:

- **Total Test:** 6
- **Passed:** 6
- **Failed:** 0
- **Skipped:** 0
- **Flaky:** 0

## Hasil ini mencakup:
1. Login sukses dengan kredensial valid
2. Login gagal - password salah
3. End-to-End checkout sukses, add to cart, remove frome cart, sort product

## Cara Menjalankan Project
# 1. Clone repository
git clone https://github.com/Gagasldp/playwright-saucedemo-automation.git

# 2. Masuk ke folder project
cd playwright-saucedemo-automation

# 3. Install dependencies
npm install

# 4. Menjalankan semua test
npx playwright test

# 5. Melihat report hasil test
npx playwright show-report

## Struktur Folder
.
├── tests/               # Berisi semua file skenario test
│   ├── login.spec.ts     # Test login positif & negatif
│   ├── cart.spec.ts      # Test add/remove produk di keranjang
│   ├── checkout.spec.ts  # Test proses checkout
│   └── sort.spec.ts      # Test sorting produk
├── pages/               # Page Object Model untuk memisahkan locator & action
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── CheckoutPage.ts
├── playwright-report/   # Laporan hasil eksekusi test (otomatis dibuat Playwright)
├── package.json         # Dependency & script
└── README.md

## Penjelasan Fitur & Skenario yang diuji
# Login

Login sukses dengan kredensial valid
Login gagal dengan kredensial salah / kosong

# Keranjang Belanja

Menambahkan produk ke keranjang
Menghapus produk dari keranjang

# Sorting Produk

Mengurutkan produk berdasarkan nama (A-Z, Z-A)
Mengurutkan berdasarkan harga (murah–mahal, mahal–murah)

# Checkout

Mengisi form checkout dan menyelesaikan pembelian

## Roadmap Pengembangan

# 1. Integrasi dengan CI/CD (GitHub Actions)
# 2. Menambahkan data-driven testing untuk variasi input
# 3. Uji kompatibilitas di beberapa browser (Chrome, Firefox, WebKit)
# 4. Tambahkan test visual regression

![Test Result Screenshot](assets/test-result.png)