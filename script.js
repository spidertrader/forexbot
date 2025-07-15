document.addEventListener('DOMContentLoaded', () => {
    // Navigatsiya havolalari uchun silliq skrollashni qo'shish
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Standart harakatni bekor qilish

            const targetId = this.getAttribute('href'); // Havolaning maqsad ID'sini olish
            const targetElement = document.querySelector(targetId); // Maqsad elementni topish

            if (targetElement) {
                // Elementga silliq skrollash
                // Smooth scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // RoboForex kotirovkalar tasmasi iframe'ining kengligini moslashtirish
    // Adjust the width of the RoboForex quotes tape iframe
    const quotesTapeIframe = document.querySelector('.quotes-tape-wrapper iframe');
    if (quotesTapeIframe) {
        // Ota elementining kengligini olib, iframe'ga o'rnatish
        // Get the width of the parent element and set it to the iframe
        const parentWidth = quotesTapeIframe.parentElement.offsetWidth;
        quotesTapeIframe.style.width = `${parentWidth}px`;
    }

    // Iframe'larning responsive bo'lishini ta'minlash (agar zarur bo'lsa)
    // Ensure iframes are responsive (if necessary)
    // CSSda iframe-responsive-wrapper orqali allaqachon hal qilingan,
    // lekin agar qo'shimcha JS logikasi kerak bo'lsa, shu yerga qo'shiladi.
    // This is largely handled by CSS with iframe-responsive-wrapper,
    // but additional JS logic can be added here if needed.
    function adjustIframeHeights() {
        document.querySelectorAll('.iframe-responsive-wrapper iframe').forEach(iframe => {
            // Agar iframe o'zining balandligini dinamik ravishda o'zgartirishi kerak bo'lsa
            // If the iframe needs to dynamically adjust its height
            // Hozirda CSS orqali qat'iy balandlik berilgan, bu funksiya ko'proq dinamik kontent uchun
            // Currently, a fixed height is given via CSS; this function is more for dynamic content
            // Example: iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        });
    }

    // Oyna o'lchami o'zgarganda iframe balandligini sozlash
    // Adjust iframe heights on window resize
    window.addEventListener('resize', adjustIframeHeights);
    // Sahifa yuklanganda ham sozlash
    // Also adjust on page load
    adjustIframeHeights();
});
