import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateFallbackAnalysis = (data) => {
  const { totalIncome, totalExpenses, savingsRate, expensesByCategory, monthlyIncome, monthlyExpenses } = data;
  
  const savingsPercentage = ((totalIncome - totalExpenses) / totalIncome) * 100;
  const largestExpenseCategory = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)[0];

  return `
    Financial Health Summary:
    
    1. Overview:
    - Income: $${totalIncome}
    - Expenses: $${totalExpenses}
    - Savings Rate: ${savingsRate.toFixed(2)}%
    - Monthly Cash Flow: $${monthlyIncome - monthlyExpenses}
    
    2. Key Insight:
    - Largest expense: ${largestExpenseCategory[0]} ($${largestExpenseCategory[1]})
    
    3. Quick Tips:
    - Review ${largestExpenseCategory[0]} for savings
    - Aim for 20% savings rate
    - Build emergency fund
    - Track expenses regularly
  `;
};

export const analyzeFinancialData = async (req, res) => {
  try {
    const {
      totalIncome,
      totalExpenses,
      savingsRate,
      expensesByCategory,
      monthlyIncome,
      monthlyExpenses,
    } = req.body;

    // Create a prompt for ChatGPT
    const prompt = `Provide a concise financial analysis summary based on this data:
    
    Income: $${totalIncome}
    Expenses: $${totalExpenses}
    Savings Rate: ${savingsRate.toFixed(2)}%
    Monthly Income: $${monthlyIncome}
    Monthly Expenses: $${monthlyExpenses}
    
    Expenses by Category:
    ${Object.entries(expensesByCategory)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join("\n")}
    
    Please provide a brief summary with:
    1. Overall financial health assessment (2-3 sentences)
    2. One key area for improvement
    3. Two immediate action items
    4. One long-term recommendation
    
    Keep the response concise and focused on the most important insights.`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a financial advisor providing concise, actionable financial advice. Keep responses brief and focused on key insights.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const insights = completion.choices[0].message.content;

      res.status(200).json({
        success: true,
        insights,
        source: "openai"
      });
    } catch (apiError) {
      // If OpenAI API fails, use fallback analysis
      console.warn("OpenAI API error, using fallback analysis:", apiError.message);
      
      const fallbackInsights = generateFallbackAnalysis({
        totalIncome,
        totalExpenses,
        savingsRate,
        expensesByCategory,
        monthlyIncome,
        monthlyExpenses
      });

      res.status(200).json({
        success: true,
        insights: fallbackInsights,
        source: "fallback",
        warning: "Using fallback analysis due to API limitations"
      });
    }
  } catch (error) {
    console.error("Error in financial analysis:", error);
    res.status(500).json({
      success: false,
      message: "Error analyzing financial data",
      error: error.message,
    });
  }
}; 