import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Iniciando seed...");

  // Cria o PetShop somente se ele ainda não existir
  let petShop = await prisma.petShop.findFirst({
    where: {
      email: "contato@caoguru.com",
    },
  });

  if (!petShop) {
    petShop = await prisma.petShop.create({
      data: {
        instagram: "@caoguru",
        whatsapp: "(38) 99999-9999",
        nome: "Cão Guru Pet Shop",
        endereco: "Rua dos Pets, 100",
        logoUrl: "https://exemplo.com/logo.png",
        horarioFuncionamento: "Segunda a sábado, das 08h às 18h",
        tituloHome: "Cuidando do seu pet com carinho",
        textoQuemSomos:
          "O Cão Guru Pet Shop oferece serviços para cuidar da saúde e do bem-estar dos animais.",
        imagemQuemSomosUrl: "https://exemplo.com/quem-somos.png",
        email: "contato@caoguru.com",
        telefone: "(38) 3333-3333",
      },
    });

    console.log("Pet Shop criado!");
  } else {
    console.log("Pet Shop já existe.");
  }

  // Cria os serviços somente se ainda não existirem
  const quantidadeServicos = await prisma.servico.count({
    where: {
      petShopId: petShop.idSite,
    },
  });

  if (quantidadeServicos === 0) {
    await prisma.servico.createMany({
      data: [
        {
          nome: "Banho",
          descricao: "Banho para cães e gatos.",
          imagemUrl: "https://exemplo.com/banho.png",
          destaque: true,
          petShopId: petShop.idSite,
        },
        {
          nome: "Tosa",
          descricao: "Serviço de tosa para cães e gatos.",
          imagemUrl: "https://exemplo.com/tosa.png",
          destaque: true,
          petShopId: petShop.idSite,
        },
        {
          nome: "Consulta Veterinária",
          descricao: "Atendimento veterinário para avaliação do pet.",
          imagemUrl: "https://exemplo.com/veterinario.png",
          destaque: false,
          petShopId: petShop.idSite,
        },
      ],
    });

    console.log("Serviços criados!");
  } else {
    console.log("Serviços já existem.");
  }

  // Cria os banners somente se ainda não existirem
  const quantidadeBanners = await prisma.banner.count({
    where: {
      petShopId: petShop.idSite,
    },
  });

  if (quantidadeBanners === 0) {
    await prisma.banner.createMany({
      data: [
        {
          fotoUrl: "https://exemplo.com/banner1.png",
          destaque: true,
          petShopId: petShop.idSite,
        },
        {
          fotoUrl: "https://exemplo.com/banner2.png",
          destaque: false,
          petShopId: petShop.idSite,
        },
      ],
    });

    console.log("Banners criados!");
  } else {
    console.log("Banners já existem.");
  }

  // Cria o administrador somente se ele ainda não existir
  await prisma.userAdmin.upsert({
    where: {
      email: "admin@caoguru.com",
    },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@caoguru.com",
      senhaHash: "hash-exemplo",
      fotoUrl: "https://exemplo.com/admin.png",
    },
  });

  console.log("Administrador criado ou já existente.");
  console.log("Seed executado com sucesso!");
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

