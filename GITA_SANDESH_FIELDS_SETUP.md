# Gita Sandesh - Adhyay & Shlok Fields Setup

## ✅ What's Already Fixed

1. **Line breaks now work!** 
   - When you press Enter while typing shlok in the admin UI, it will now show as new lines on the public site
   - Added `whitespace-pre-line` CSS to preserve line breaks
   - Both shlok and meaning text preserve formatting

2. **Display components ready**
   - GitaSandeshCard now shows adhyay name, number, and shlok name when available
   - Layout: Adhyay Name (large) → Chapter number (small) → Shlok name (small)

## ⏳ What You Need to Do

### Step 1: Apply the Database Migration

The adhyay fields won't show until you apply the migration to your Supabase database.

**In Supabase SQL Editor:**

```sql
-- Copy and run this from: migrations/005_add_gita_sandesh_fields.sql

ALTER TABLE gita_sandesh
    ADD COLUMN IF NOT EXISTS adhyay_name TEXT,
    ADD COLUMN IF NOT EXISTS adhyay_number INTEGER,
    ADD COLUMN IF NOT EXISTS shlok_name TEXT;

CREATE INDEX IF NOT EXISTS idx_sandesh_adhyay_number ON gita_sandesh(adhyay_number);
```

### Step 2: Restart Backend Server

After applying the migration:

```powershell
cd d:\ShlokSagar\backend-shloksagar
# Stop the server (Ctrl+C) and restart:
npm run dev
```

### Step 3: Test in Admin UI

1. Open Admin UI
2. Go to Gita Sandesh Manager
3. Create or edit a Gita Sandesh entry
4. Fill in the new fields:
   - **Adhyay Name**: e.g., "Arjuna Vishada Yoga" or "Karma Yoga"
   - **Adhyay Number**: e.g., 1, 2, 3... (Chapter number)
   - **Shlok Name**: Optional title for the verse
5. For the shlok field: Press Enter to create multiple lines ✅
6. Save

### Step 4: View on Public Site

Navigate to:
- Homepage: `http://localhost:5173` (Today's Gita Sandesh section)
- Gita Sandesh page: `http://localhost:5173/gita-sandesh`

You should now see:
- ✅ Line breaks in shlok text
- ✅ Adhyay Name (if entered)
- ✅ Chapter number (if entered)
- ✅ Shlok name (if entered)

## Example Display

When all fields are filled, it will show like this:

```
📖 Karma Yoga
   Chapter 3
   Verse 21

┃ धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।
┃ मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥

Meaning:
धृतराष्ट्र ने कहा- हे संजय! पवित्र भूमि कुरुक्षेत्र में इकट्ठा हुए, 
मेरे और पांडु के पुत्रों ने युद्ध के लिए क्या क्या किया?

📅 5 February 2026
```

## Troubleshooting

**Q: Fields still not showing?**
- ✓ Check migration was applied in Supabase
- ✓ Restart backend server
- ✓ Clear browser cache and refresh

**Q: Line breaks not working?**
- Already fixed! Just refresh the public site

**Q: Migration fails?**
- Check if columns already exist: `SELECT * FROM gita_sandesh LIMIT 1;`
- If columns exist, migration is already applied

## Quick Test

After migration, test with this simple Gita Sandesh:

- **Adhyay Name**: Karma Yoga
- **Adhyay Number**: 3
- **Shlok Name**: Verse 21
- **Shlok**: (Press Enter for multi-line)
  ```
  यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।
  स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥
  ```
- **Meaning**: Whatever a great person does, others follow. Whatever standards they set, the world follows.
- **Date**: Today's date

Save and check the public site! 🎉
