// Simple client-side handling for navigation and data persistence

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop();

    if (path === 'index.html' || path === '') {
        const form = document.getElementById('signInForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            // fake sign-in - redirect
            window.location.href = 'delivery.html';
        });
    }

    if (path === 'delivery.html') {
        const form = document.getElementById('deliveryForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = {
                start: document.getElementById('start').value,
                dropoff: document.getElementById('dropoff').value,
                description: document.getElementById('description').value
            };
            localStorage.setItem('order', JSON.stringify(data));
            window.location.href = 'checkout.html';
        });
    }

    if (path === 'checkout.html') {
        const order = JSON.parse(localStorage.getItem('order') || '{}');
        const summaryEl = document.getElementById('orderSummary');
        if (summaryEl && order.start) {
            summaryEl.innerHTML = `
                <p><strong>From:</strong> ${order.start}</p>
                <p><strong>To:</strong> ${order.dropoff}</p>
                <p><strong>Description:</strong> ${order.description}</p>
            `;
        }
        const form = document.getElementById('paymentForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Payment processed (mock)');
            // clear storage or redirect
            localStorage.removeItem('order');
            window.location.href = 'index.html';
        });
    }
});