
    document.getElementById('button-payment').addEventListener('click', function () {
    // Fazendo uma requisição para o backend para criar a sessão de checkout
    fetch('/api/checkout/create-session?priceId=price_1H5QAtCqZLvsSjy9zjD5t0yB', { // Aqui o ID do preço do produto
        method: 'POST'
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (sessionId) {
            // Redireciona para o Stripe Checkout com o ID da sessão
            return stripe.redirectToCheckout({ sessionId: sessionId });
        })
        .then(function (result) {
            // Se o redirecionamento falhar
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});
