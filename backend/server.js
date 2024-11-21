const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q8Se9AVQ8iROiHB2pjw9jI1V6mijigCIZT1WrR797WzWtJgPgVXxDrTic3nqFcoSlMxYIcqQ3WmJ3WJWdRhoplW0016QHhsRp'); // Your Stripe secret key

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { plan } = req.body;
    console.log('Received plan:', plan);

    let price;
    switch (plan) {
        case '1 Month':
            price = 16000; // $160 in cents
            break;
        case '2 Months':
            price = 24000; // $240 in cents
            break;
        case 'Lifetime':
            price = 100000; // $1000 in cents
            break;
        default:
            console.log('Invalid plan received:', plan);
            return res.status(400).send('Invalid plan');
    }

    console.log('Price in cents:', price); // Log the amount in cents

    try {
        // Create checkout session with success URL that includes the plan
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
            success_url: `http://localhost:3000/success`, // success URL with dynamic plan
            cancel_url: 'http://localhost:3000/cancel',   // Cancel URL
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe error:', error); // Log full error
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log('Server running on port 4242'));
