document.addEventListener('DOMContentLoaded', function() {

    // AOS (Animate on Scroll) kutubxonasini ishga tushirish
    AOS.init({
        duration: 1000, // animatsiya davomiyligi
        once: true, // animatsiya faqat bir marta ishlaydi
    });

    // Mobil menyu
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Murakkab foiz kalkulyatori logikasi
    const initialInput = document.getElementById('initial');
    const monthlyInput = document.getElementById('monthly');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalBalanceEl = document.getElementById('total-balance');
    const totalProfitEl = document.getElementById('total-profit');
    const chartCanvas = document.getElementById('growthChart');
    let growthChart;

    function calculateCompoundInterest() {
        const P = parseFloat(initialInput.value);
        const c = parseFloat(monthlyInput.value);
        const r = parseFloat(rateInput.value) / 100;
        const t = parseInt(yearsInput.value);
        const n = t * 12; // oylar soni

        if (isNaN(P) || isNaN(c) || isNaN(r) || isNaN(t)) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        let total = P;
        const yearlyData = [];
        let totalDeposits = P;

        for (let i = 1; i <= n; i++) {
            total += c;
            totalDeposits += c;
            total *= (1 + r);
            
            if (i % 12 === 0 || i === n) {
                yearlyData.push(total.toFixed(2));
            }
        }
        
        const totalProfit = total - totalDeposits;

        totalBalanceEl.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalProfitEl.textContent = `$${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        updateChart(yearlyData, t);
    }

    function updateChart(data, years) {
        const labels = Array.from({ length: years }, (_, i) => `${i + 1}-yil`);

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
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            },
                            color: '#94a3b8'
                        }
                    },
                    x: {
                       ticks: {
                           color: '#94a3b8'
                       }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    calculateBtn.addEventListener('click', calculateCompoundInterest);
    
    // Sahifa yuklanganda birinchi marta hisoblash
    calculateCompoundInterest();
});
