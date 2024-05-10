const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function seedCategories() {
  try {
    await database.category.createMany({
      data: [
        { name: "Hardware" },
        { name: "Sistemas Operativos" },
        { name: "Código" },
        { name: "Serviços e Ligações Fisicas" },
      ],
    });

    console.log("Success!");
  } catch (error) {
    console.log("Error seeding categories:", error);
  } finally {
    await database.$disconnect();
  }
}

async function seedTags() {
  try {
    await database.tag.createMany({
      data: [
        { name: "Javascript" },
        { name: "Typescript" },
        { name: "React" },
        { name: "Next.js" },
        { name: "Prisma" },
        { name: "Nest.js" },
        { name: "Express" },
        { name: "Hono.js" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "MySQL" },
        { name: "Redis" },
        { name: "Docker" },
        { name: "Node.js" },
        { name: "Linux" },
        { name: "Git" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "TailwindCSS" },
        { name: "Vite" },
        { name: "Apache" },
        { name: "Raspberry Pi" },
        { name: "Ubuntu" },
        { name: "Windows" },
        { name: "Python" },
      ],
    });

    console.log("Tags seeded successfully!");
  } catch (error) {
    console.error("Error seeding tags:", error);
  } finally {
    await database.$disconnect();
  }
}

async function main() {
  try {
    await seedCategories();
    await seedTags();
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await database.$disconnect();
  }
}

main();
