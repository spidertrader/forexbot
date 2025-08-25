document.addEventListener('DOMContentLoaded', function() {

    // AOS (Animate on Scroll) kutubxonasini ishga tushirish
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Mobil menyu
    // ... (mobil menyu kodi o'zgarishsiz) ...

    // Murakkab foiz kalkulyatori logikasi (YANGILANGAN)
    const initialInput = document.getElementById('initial');
    const monthlyInput = document.getElementById('monthly');
    const rateInput = document.getElementById('rate');
    const monthsInput = document.getElementById('months'); // O'zgartirildi: yearsInput -> monthsInput
    const calculateBtn = document.getElementById('calculate-btn');
    const totalBalanceEl = document.getElementById('total-balance');
    const totalProfitEl = document.getElementById('total-profit');
    const chartCanvas = document.getElementById('growthChart');
    let growthChart;

    function calculateCompoundInterest() {
        const P = parseFloat(initialInput.value);
        const c = parseFloat(monthlyInput.value);
        const r = parseFloat(rateInput.value) / 100;
        const n_months = parseInt(monthsInput.value); // O'zgartirildi: yillardan oylarga

        if (isNaN(P) || isNaN(c) || isNaN(r) || isNaN(n_months)) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        let total = P;
        const monthlyData = [];
        const labels = [];
        let totalDeposits = P;

        for (let i = 1; i <= n_months; i++) {
            total += c;
            totalDeposits += c;
            total *= (1 + r);
            
            monthlyData.push(total.toFixed(2));
            labels.push(`${i}-oy`);
        }
        
        const totalProfit = total - totalDeposits;

        totalBalanceEl.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalProfitEl.textContent = `$${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        updateChart(monthlyData, labels, n_months);
    }

    function updateChart(data, labels, totalMonths) {
        if (growthChart) {
            growthChart.destroy();
        }

        growthChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sarmoya O\'sishi',
                    data: data,
                    backgroundColor: 'rgba(6, 182, 212, 0.2)',
                    borderColor: 'rgba(6, 182, 212, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: totalMonths > 50 ? 0 : 3 // Agar oylar ko'p bo'lsa, nuqtalarni yashirish
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return '$' + value.toLocaleString(); },
                            color: '#94a3b8'
                        }
                    },
                    x: {
                       ticks: {
                           color: '#94a3b8',
                           // Grafik chiroyli chiqishi uchun yozuvlarni avtomatik o'tkazib yuborish
                           maxTicksLimit: totalMonths > 12 ? (window.innerWidth < 768 ? 4 : 8) : 12
                       }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    calculateBtn.addEventListener('click', calculateCompoundInterest);
    
    // Sahifa yuklanganda birinchi marta hisoblash
    calculateCompoundInterest();
});
