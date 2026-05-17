# 🧪 Test Image Generation Feature

## Status: ✅ READY TO TEST

Both servers are running:
- **Frontend**: http://localhost:5173/
- **Backend**: http://localhost:3000/ (with image generation endpoint)

## How to Test

### Step 1: Open the App
Go to: **http://localhost:5173/**

### Step 2: Sign In
Use your Clerk credentials to sign in

### Step 3: Create or Open a Chat
Click "Create a new Chat" or open an existing one

### Step 4: Test Image Generation
Try these example prompts:

#### Simple Test:
```
generate image of a cute cat
```

#### Educational Test:
```
generate image of a plant cell with labeled parts
```

#### Creative Test:
```
create image of a futuristic city at sunset
```

#### Science Test:
```
draw a diagram of the solar system
```

## What Should Happen

1. **You type**: "generate image of a cute cat"
2. **AI shows**: "🎨 Generating image..."
3. **Wait**: 10-30 seconds
4. **AI displays**: The generated image with markdown
5. **You see**: 
   - The image
   - Message: "✨ Image generated successfully!"
   - Instructions on what you can do next

## Trigger Words

The system detects these phrases:
- ✅ "generate image"
- ✅ "create image"
- ✅ "draw"
- ✅ "make image"
- ✅ "generate picture"
- ✅ "create picture"

## Technical Details

### Backend Endpoint:
- **URL**: `POST /api/generate-image`
- **Auth**: Requires Clerk authentication
- **Input**: `{ prompt: "your description" }`
- **Output**: `{ imageUrl: "https://..." }`
- **Model**: DALL-E 3
- **Size**: 1024x1024px
- **Quality**: Standard

### Frontend Detection:
- Checks if message contains trigger keywords
- If yes → calls image generation endpoint
- If no → normal chat flow
- Displays image using markdown

## Troubleshooting

### If Image Doesn't Generate:

1. **Check Console** (F12 → Console tab)
   - Look for errors
   - Check network requests

2. **Check Backend Logs**
   - Look at the terminal running backend
   - Check for API errors

3. **Verify OpenAI API Key**
   - Make sure `OPENAI_API_KEY` is set in backend/.env
   - Key should start with `sk-proj-` or `sk-`

4. **Try Different Prompt**
   - Use exact phrase: "generate image of a cat"
   - Make sure trigger words are included

### Common Issues:

**Issue**: "Something went wrong"
**Solution**: Check OpenAI API key and credits

**Issue**: No response
**Solution**: Check backend is running and connected

**Issue**: Image not displaying
**Solution**: Check markdown rendering in browser

## Expected Behavior

### ✅ Working:
- Detects trigger words
- Shows "🎨 Generating image..."
- Calls DALL-E 3 API
- Returns image URL
- Displays image in chat
- Shows success message

### ❌ Not Working:
- No detection of trigger words
- API errors
- No image displayed
- Timeout errors

## Test Results

### Test 1: Simple Generation
**Prompt**: "generate image of a cat"
**Expected**: Image of a cat appears
**Result**: [ ] Pass [ ] Fail

### Test 2: Educational Content
**Prompt**: "create image of the solar system"
**Expected**: Solar system diagram appears
**Result**: [ ] Pass [ ] Fail

### Test 3: Complex Description
**Prompt**: "draw a medieval castle on a hill at sunset"
**Expected**: Detailed castle image appears
**Result**: [ ] Pass [ ] Fail

### Test 4: Without Trigger Words
**Prompt**: "tell me about cats"
**Expected**: Normal chat response (no image)
**Result**: [ ] Pass [ ] Fail

## Next Steps After Testing

If working:
- ✅ Feature is ready for students!
- ✅ Share the IMAGE_GENERATION_GUIDE.md
- ✅ Encourage creative use

If not working:
- Check OpenAI API key
- Verify backend endpoint
- Check frontend detection logic
- Review error logs

## Quick Test Command

Open browser console and run:
```javascript
fetch('http://localhost:3000/api/generate-image', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'a cute cat' })
})
.then(r => r.json())
.then(d => console.log(d))
```

Should return: `{ imageUrl: "https://..." }`

---

**Ready to test!** Open http://localhost:5173/ and try generating an image! 🚀
