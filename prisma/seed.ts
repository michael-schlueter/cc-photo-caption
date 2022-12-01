import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@email.com" },
    update: {},
    create: {
      email: "alice@email.com",
      password: bcrypt.hashSync("P4$sword", 12),
      isAdmin: true
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@email.com" },
    update: {},
    create: {
      email: "bob@email.com",
      password: bcrypt.hashSync("P4$sword", 12),
    },
  });
  const caroline = await prisma.user.upsert({
    where: { email: "caroline@email.com" },
    update: {},
    create: {
      email: "caroline@email.com",
      password: bcrypt.hashSync("P4$sword", 12),
    },
  });
  const cubs = await prisma.image.upsert({
    where: { url: "/images/cubs.jpg" },
    update: {},
    create: {
      url: "/images/cubs.jpg",
      name: "Sample image",
    },
  });
  const monkeys = await prisma.image.upsert({
    where: { url: "/images/monkeys.jpg" },
    update: {},
    create: {
      url: "/images/monkeys.jpg",
      name: "Sample image",
    },
  });
  const parrots = await prisma.image.upsert({
    where: { url: "/images/parrots.jpg" },
    update: {},
    create: {
      url: "/images/parrots.jpg",
      name: "Sample image",
    },
  });
  const puffin = await prisma.image.upsert({
    where: { url: "/images/puffin.jpg" },
    update: {},
    create: {
      url: "/images/puffin.jpg",
      name: "Sample image",
    },
  });
  const cubcaption = await prisma.caption.upsert({
    where: { id: 1 },
    update: {},
    create: {
      description: "Two beautiful cubs",
      imageId: 1,
      userId: 1
    }
  })
  const monkeysCaption = await prisma.caption.upsert({
    where: { id: 2 },
    update: {},
    create: {
      description: "Two beautiful monkeys",
      imageId: 2,
      userId: 1
    }
  })
  const apeCaption = await prisma.caption.upsert({
    where: { id: 3 },
    update: {},
    create: {
      description: "Two magnificient monkeys",
      imageId: 2,
      userId: 2
    }
  })
  const parrotsCaption = await prisma.caption.upsert({
    where: { id: 2 },
    update: {},
    create: {
      description: "Two beautiful parrots",
      imageId: 2,
      userId: 2
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect;
    process.exit(1);
  });
