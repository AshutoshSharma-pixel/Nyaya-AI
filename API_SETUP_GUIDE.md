# OpenAI API Setup Guide for Nyaya AI

## 🔑 How to Configure OpenAI API Key

### Step 1: Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the API key (starts with `sk-`)

### Step 2: Configure the API Key
1. Open `openai-config.js` file
2. Replace `'your-openai-api-key-here'` with your actual API key
3. Save the file

### Step 3: Test the Configuration
1. Open `ai-dashboard.html` in your browser
2. Try asking a legal question
3. You should now get AI-powered responses instead of mock responses

## 💡 Current Features

### Without API Key (Demo Mode):
- ✅ Smart keyword-based responses
- ✅ Legal guidance for various areas:
  - Criminal Law (IPC sections)
  - Property Law
  - Family Law
  - Consumer Protection
  - Contract Law
- ✅ Specific legal references and procedures

### With API Key (Full AI Mode):
- ✅ All demo features PLUS
- ✅ Natural language understanding
- ✅ Contextual responses
- ✅ More detailed legal analysis
- ✅ Better conversation flow

## 🚀 Example Questions to Try

### Criminal Law:
- "What is IPC section 420?"
- "I was cheated in a fraud case"
- "Someone stole my property"

### Property Law:
- "I have a property dispute"
- "Land ownership issues"
- "House property problems"

### Family Law:
- "I want to file for divorce"
- "Maintenance case against husband"
- "Marriage registration issues"

### Consumer Law:
- "Defective product refund"
- "Consumer complaint process"
- "Service deficiency case"

## ⚠️ Important Notes

1. **API Key Security**: Never share your API key publicly
2. **Costs**: OpenAI API has usage-based pricing
3. **Rate Limits**: There are limits on API calls per minute
4. **Data Privacy**: Be mindful of sensitive legal information

## 🔧 Troubleshooting

### If API key doesn't work:
1. Check if the key is correctly pasted
2. Ensure there are no extra spaces
3. Verify the key starts with `sk-`
4. Check your OpenAI account has credits

### If getting errors:
1. Check browser console for error messages
2. Ensure all files are in the same directory
3. Try refreshing the page
4. Check internet connection

## 📞 Support

For technical issues or questions about the AI functionality, please check the browser console for error messages and ensure all files are properly configured.





