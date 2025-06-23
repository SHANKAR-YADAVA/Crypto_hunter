export const askCryptoAI = async (question) => {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `
You're a crypto expert assistant. Reply ONLY about cryptocurrencies/blockchain.

Rules:
1. If asked about other topics, say: "I specialize in crypto/blockchain topics"
2. Never give financial advice
3. Keep answers under 150 words
4. Format clearly with line breaks between ideas

Response template:
[1-sentence answer]

[2-3 key points with • bullets]

[Optional example/analogy]
            `.trim(),
          },
          { role: "user", content: question }
        ],
        temperature: 0.3, // More factual responses
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Can you rephrase your crypto question?";
  } catch (error) {
    console.error("AI Error:", error);
    return "Network error - please try again";
  }
};