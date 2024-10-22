const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q8Se9AVQ8iROiHB2pjw9jI1V6mijigCIZT1WrR797WzWtJgPgVXxDrTic3nqFcoSlMxYIcqQ3WmJ3WJWdRhoplW0016QHhsRp'); // Your Stripe secret key

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Endpoint to create a Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
    const { plan } = req.body; // Get the selected plan from the client

    let price;
    // Define plan prices in cents
    switch (plan) {
        case '1 Month':
            price = 16000; // $160
            break;
        case '2 Months':
            price = 24000; // $240
            break;
        case 'Lifetime':
            price = 100000; // $1000
            break;
        default:
            return res.status(400).send('Invalid plan');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success', // Redirect on success
            cancel_url: 'http://localhost:3000/cancel',   // Redirect on cancel
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server on port 4242
app.listen(4242, () => console.log('Server running on port 4242'));
