import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { message } = await req.json();

        // Simulated network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const lowercaseMsg = message.toLowerCase();

        let content = "I see. Could you tell me more about your specific financial goals? Whether it's saving for down payment, optimizing expenses, or investing, I can create a tailored plan for you.";

        if (lowercaseMsg.includes('spending') || lowercaseMsg.includes('expense') || lowercaseMsg.includes('analyze')) {
            content = "Based on your recent transactions, your spending on dining out has increased by 15% this month. If you reduce this by just ₹2000/month and invest it in a SIP at 12%, you could generate an extra ₹4.6L in 10 years. Shall we set up a budget alert?";
        } else if (lowercaseMsg.includes('save') || lowercaseMsg.includes('saving')) {
            content = "A great saving strategy is the 50/30/20 rule. Currently, you're at 60/25/15. If we automate a transfer of 5% of your income to a high-yield account on payday, you'll hit the 20% savings target effortlessly.";
        } else if (lowercaseMsg.includes('invest') || lowercaseMsg.includes('advice')) {
            content = "For your risk profile, I recommend a core-satellite approach: 70% in low-cost NIFTY 50 index funds for stability, and 30% in aggressive flexi-cap funds for alpha. Want me to simulate a ₹5000 monthly SIP with this allocation?";
        } else if (lowercaseMsg.includes('habit') || lowercaseMsg.includes('fix')) {
            content = "Your top wealth-draining habit right now is impulsive late-night online shopping. Creating a '48-hour cool-down' rule before checking out can save you an estimated ₹3500 monthly. Want to activate the habit tracker?";
        } else if (lowercaseMsg.includes('education') || lowercaseMsg.includes('teach')) {
            content = "Let's talk about the 'Rule of 72'. If you divide 72 by your expected annual return, you get the number of years it takes to double your money. At 12% return, your money doubles every 6 years!";
        } else if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
            content = "Hello there! I'm your WealthHabit AI Coach. I'm actively monitoring your portfolio and spending patterns. What financial area would you like to level up today?";
        }

        return NextResponse.json({ response: content });

    } catch (error) {
        console.error("AI Agent Error:", error);
        return NextResponse.json(
            { error: 'Failed to process AI response' },
            { status: 500 }
        );
    }
}
