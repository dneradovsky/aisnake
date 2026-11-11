document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('scoreTable');
    const rows = table.querySelectorAll('tbody tr');

    function calculateTotals() {
        const totalsRow = rows[rows.length - 1];
        const cols = totalsRow.querySelectorAll('td');

        for (let i = 1; i < cols.length; i++) {
            let sum = 0;
            let count = 0;

            for (let j = 0; j < rows.length - 1; j++) {
                const cell = rows[j].cells[i];
                const value = parseFloat(cell.textContent.replace(',', '.'));
                if (!isNaN(value)) {
                    sum += value;
                    count++;
                }
            }

            cols[i].textContent = count > 0 ? (sum / count).toFixed(1) : '—';
        }
    }

    table.addEventListener('input', calculateTotals);
    calculateTotals();
});
