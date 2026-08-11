-- CreateTable
CREATE TABLE "PetShop" (
    "idSite" SERIAL NOT NULL,
    "instagram" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "horarioFuncionamento" TEXT NOT NULL,
    "tituloHome" TEXT NOT NULL,
    "textoQuemSomos" TEXT NOT NULL,
    "imagemQuemSomosUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "PetShop_pkey" PRIMARY KEY ("idSite")
);

-- CreateTable
CREATE TABLE "Servico" (
    "idServico" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL,
    "petShopId" INTEGER NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("idServico")
);

-- CreateTable
CREATE TABLE "Banner" (
    "idBanner" SERIAL NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL,
    "petShopId" INTEGER NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("idBanner")
);

-- CreateTable
CREATE TABLE "UserAdmin" (
    "idUserAdmin" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,

    CONSTRAINT "UserAdmin_pkey" PRIMARY KEY ("idUserAdmin")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmin_email_key" ON "UserAdmin"("email");

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_petShopId_fkey" FOREIGN KEY ("petShopId") REFERENCES "PetShop"("idSite") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_petShopId_fkey" FOREIGN KEY ("petShopId") REFERENCES "PetShop"("idSite") ON DELETE RESTRICT ON UPDATE CASCADE;
