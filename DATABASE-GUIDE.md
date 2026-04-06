# Database Integration Guide

This guide will help you connect your blogging platform to a database to make article management persistent.

## Choosing a Database

### Recommended Options

| Database | Recommended For | Setup Time |
|----------|-----------------|-----------|
| **MongoDB** | Flexible schema, document storage | Easy |
| **PostgreSQL** | Structured data, relationships | Medium |
| **Supabase** | PostgreSQL + REST API, fast setup | Easy |
| **Firebase/Firestore** | Real-time, serverless | Easy |

## Option 1: MongoDB with Mongoose

### Setup

```bash
npm install mongoose
```

### Create Connection File

Create `lib/db.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

### Create Article Schema

Create `lib/models/Article.ts`:

```typescript
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export const Article = 
  mongoose.models.Article || mongoose.model('Article', ArticleSchema);
```

### Create API Routes

Create `app/api/articles/route.ts`:

```typescript
import connectDB from '@/lib/db';
import { Article } from '@/lib/models/Article';

export async function GET() {
  await connectDB();
  const articles = await Article.find().sort({ date: -1 });
  return Response.json(articles);
}

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  
  const article = new Article(data);
  await article.save();
  
  return Response.json(article, { status: 201 });
}
```

Create `app/api/articles/[id]/route.ts`:

```typescript
import connectDB from '@/lib/db';
import { Article } from '@/lib/models/Article';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const article = await Article.findById(id);
  return Response.json(article);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  await connectDB();
  
  const article = await Article.findByIdAndUpdate(id, data, { new: true });
  return Response.json(article);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  await Article.findByIdAndDelete(id);
  return Response.json({ success: true });
}
```

### Update lib/articles.ts

```typescript
// lib/articles.ts
import { Article as ArticleModel } from './models/Article';
import connectDB from './db';

export interface Article {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

export async function getAllArticles(): Promise<Article[]> {
  await connectDB();
  return ArticleModel.find().sort({ date: -1 });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await connectDB();
  return ArticleModel.findOne({ slug });
}
```

### Environment Variables

Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### Get MongoDB Connection

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Replace `username` and `password`
5. Add to `.env.local`

## Option 2: PostgreSQL with Prisma

### Setup

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

### Schema

Create `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Article {
  id        Int     @id @default(autoincrement())
  title     String
  slug      String  @unique
  description String
  content   String
  author    String
  date      DateTime @default(now())
  image     String
  category  String
  tags      String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Update lib/articles.ts

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllArticles() {
  return prisma.article.findMany({
    orderBy: { date: 'desc' },
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
  });
}

export async function createArticle(data: any) {
  return prisma.article.create({ data });
}

export async function updateArticle(id: number, data: any) {
  return prisma.article.update({
    where: { id },
    data,
  });
}

export async function deleteArticle(id: number) {
  return prisma.article.delete({
    where: { id },
  });
}
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/suddhnnews"
```

### Run Migrations

```bash
npx prisma migrate dev --name init
```

## Option 3: Supabase (Easiest)

### Setup

1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Run this SQL:

```sql
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT NOW(),
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX articles_slug_idx ON articles(slug);
CREATE INDEX articles_date_idx ON articles(date);
```

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Create Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Update lib/articles.ts

```typescript
import { supabase } from './supabase';

export async function getAllArticles() {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false });
  
  return data || [];
}

export async function getArticleBySlug(slug: string) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return data;
}

export async function createArticle(article: any) {
  const { data } = await supabase
    .from('articles')
    .insert([article])
    .select();
  
  return data?.[0];
}
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Update Admin Page

Update `app/admin/page.tsx` to save to database:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // ... other state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((t) => t.trim()),
        }),
      });

      if (response.ok) {
        alert('Article published!');
        router.refresh();
        // Reset form
      }
    } catch (error) {
      alert('Error publishing article');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... form with submit button
    <button disabled={loading}>
      {loading ? 'Publishing...' : 'Publish Article'}
    </button>
  );
}
```

## Testing Your Setup

### Test MongoDB
```bash
# In Node console
const connectDB = require('./lib/db').default;
const articles = await connectDB().then(() => Article.find());
console.log(articles);
```

### Test PostgreSQL
```bash
npx prisma studio  # Opens visual database explorer
```

### Test Supabase
```typescript
// In browser console
import { supabase } from './lib/supabase';
const articles = await supabase.from('articles').select('*');
console.log(articles);
```

## Migration from Static Data

```typescript
import { articles } from './lib/articles'; // old static data

async function migrateArticles() {
  for (const article of articles) {
    await Article.create(article);
  }
  console.log('Migration complete!');
}

// Run once during setup
migrateArticles();
```

## Best Practices

1. **Backup Regularly**
   - Set up automated backups
   - Test recovery procedure

2. **Index Key Fields**
   - slug (must be unique)
   - date (for sorting)
   - category (for filtering)

3. **Validate Data**
   - Sanitize input
   - Validate required fields
   - Check slug uniqueness

4. **Security**
   - Add authentication to admin
   - Use environment variables
   - Keep API keys secret

5. **Performance**
   - Cache frequently accessed articles
   - Use pagination for large lists
   - Add database indexes

## Troubleshooting

### Connection Issues
- Check environment variables
- Verify database is running
- Check network connectivity
- Look for error in console

### Slow Queries
- Add indexes to search fields
- Use pagination
- Limit results
- Add caching

### Data Not Syncing
- Check API endpoints
- Verify mutations work
- Test with REST client (Postman)
- Check browser console

## Next Steps

1. Choose database (recommend Supabase for beginners)
2. Follow setup instructions
3. Test with sample articles
4. Deploy and verify
5. Monitor performance

---

**Resources**
- [MongoDB Documentation](https://docs.mongodb.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
