import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample home data
  const home = await prisma.home.upsert({
    where: { id: 1 },
    update: {},
    create: {
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
      ],
      client: 'Sample Client',
      project: 'Modern Office Building',
      image_1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      image_2: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      image_3: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
      location: 'Dubai, UAE',
      instagram: 'https://instagram.com/sample',
      x: 'https://twitter.com/sample',
      whatsapp: '+971501234567',
      linkedin: 'https://linkedin.com/company/sample',
      mail: 'info@sample.com',
      aim: { en: 'Creating innovative architectural solutions', ar: 'إنشاء حلول معمارية مبتكرة' },
      quote: { en: 'Design is not just what it looks like and feels like. Design is how it works.', ar: 'التصميم ليس مجرد ما يبدو عليه ويشعر به. التصميم هو كيف يعمل.' },
      author: { en: 'Steve Jobs', ar: 'ستيف جوبز' },
      quote_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    }
  })

  console.log('Sample home data created:', home)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })