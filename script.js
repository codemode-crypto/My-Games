// Navigation between pages
function goToPage(page) {
    window.location.href = page;
}

// Save delivery form and go to checkout
function saveAndNext() {
    const start = document.getElementById('start').value;
    const dropoff = document.getElementById('dropoff').value;
    const description = document.getElementById('description').value;

    if (start && dropoff) {
        localStorage.setItem('order', JSON.stringify({ start, dropoff, description }));
        goToPage('checkout.html');
    } else {
        alert('Please fill in all required fields');
    }
}

// Display order summary on checkout page
document.addEventListener('DOMContentLoaded', () => {
    const summaryEl = document.getElementById('orderSummary');
    if (summaryEl) {
        const order = JSON.parse(localStorage.getItem('order') || '{}');
        if (order.start) {
            summaryEl.innerHTML = `
                <p><strong>From:</strong> ${order.start}</p>
                <p><strong>To:</strong> ${order.dropoff}</p>
                <p><strong>Description:</strong> ${order.description || 'N/A'}</p>
            `;
        }
    }

    // Handle payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment processed successfully!');
            localStorage.removeItem('order');
            goToPage('index.html');
        });
    }

    // Handle sign in form
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            goToPage('delivery.html');
        });
    }
});