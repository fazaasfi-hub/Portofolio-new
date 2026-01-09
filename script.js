document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gridPlane');
    const overlay = document.getElementById('pageTransition');
    const typingTarget = document.getElementById('typing-text');

    // --- 1. ANIMASI MASUK (SAAT HALAMAN BARU DIBUKA) ---
    if (overlay) {
        // Layar memudar dari hitam ke transparan
        overlay.style.opacity = '1'; 
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 50);
    }

    // --- 2. ANIMASI KELUAR (SAAT KLIK LINK MENU) ---
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Cek apakah link adalah halaman lokal (.html)
            if (href && href.includes('.html') && !href.startsWith('#')) {
                e.preventDefault(); 
                overlay.style.opacity = '1'; // Tutup layar jadi hitam
                
                // Pindah halaman setelah animasi hitam (500ms)
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    // --- 3. GERAK LANTAI 3D (GRID) ---
    document.addEventListener('mousemove', (e) => {
        if (grid) {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 60;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 60;
            // Hanya gerakkan grid, bukan tombol/teks
            grid.style.transform = `rotateX(70deg) translateX(${moveX}px) translateY(${moveY}px)`;
        }
    });

    // --- 4. ANIMASI MENGETIK (TYPEWRITER) ---
    if (typingTarget) {
        const words = ["Creative Student", "Web Developer", "X-8 Designer"];
        let i = 0, j = 0, isDeleting = false;

        function type() {
            const current = words[i];
            typingTarget.textContent = isDeleting 
                ? current.substring(0, j - 1) 
                : current.substring(0, j + 1);
            
            j = isDeleting ? j - 1 : j + 1;

            if (!isDeleting && j === current.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % words.length;
            }
            setTimeout(type, isDeleting ? 70 : 150);
        }
        type();
    }

    // --- 5. NAVIGASI AKTIF (MENYALA SESUAI HALAMAN) ---
    const path = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === path) a.classList.add('active');
    });
});