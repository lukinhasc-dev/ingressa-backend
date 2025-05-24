package br.com.ingressa.controller;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // Permite requisições do frontend local
public class StripeController {

    public StripeController() {
        Stripe.apiKey = "sk_test_51RHTBSFQgrHQPFRg8vLIMk0Hn8RZBGHk1RQjtcBxykwhVWbKXAZLYVlvEGCtcBSV2rrDY4iPjqvWQqtaaRagqP6a00mut3TT6W"; // 🔥 Coloca sua chave secreta aqui
    }

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody Map<String, Object> request) throws StripeException {

        double total = Double.parseDouble(request.get("total").toString());
        String email = request.get("email").toString();

        long amountInCents = (long) (total * 100); // Stripe trabalha com centavos

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5500/success.html") // ✅ Redirecionamento após pagamento
                .setCancelUrl("http://localhost:5500/cancel.html")   // ❌ Redirecionamento se cancelar
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("brl")
                                                .setUnitAmount(amountInCents) // 💰 Valor em centavos
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Compra de Ingressos")
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .setCustomerEmail(email) // Envia e-mail de recibo
                .build();

        Session session = Session.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("url", session.getUrl());

        return responseData;
    }
}
