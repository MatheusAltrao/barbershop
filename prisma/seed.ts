import { ServiceProps } from "@/types/service.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Limpar dados existentes
  console.log("🧹 Limpando dados existentes...");
  await prisma.service.deleteMany();

  // Criar serviços
  console.log("🛠️ Criando serviços...");
  const services = await prisma.service.createMany({
    data: [
      {
        title: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 5000,
        isActive: true,
      },
      {
        title: "Barba",
        description: "Aparar e modelar a barba com precisão.",
        price: 3000,
        isActive: true,
      },
      {
        title: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 3000,
        isActive: true,
      },
      {
        title: "Sombrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 3000,
        isActive: true,
      },
    ],
  });

  console.log(`✅ ${services.count} serviços criados com sucesso!`);

  // Buscar e exibir os serviços criados
  const allServices = await prisma.service.findMany();
  console.log("📋 Serviços no banco de dados:");
  allServices.forEach((service: ServiceProps) => {
    console.log(`  - ${service.title}: R$ ${(service.price / 100).toFixed(2)}`);
  });

  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro durante o seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
