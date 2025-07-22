export const SERVICES = [
  {
    title: "Corte de Cabelo",
    description: "Estilo personalizado com as últimas tendências.",
    price: 5000,
  },
  {
    title: "Barba",
    description: "Aparar e modelar a barba com precisão.",
    price: 3000,
  },
  {
    title: "Pézinho",
    description: "Acabamento perfeito para um visual renovado.",
    price: 3000,
  },
  {
    title: "Sombrancelha",
    description: "Expressão acentuada com modelagem precisa.",
    price: 3000,
  },
];

export const SERVICES_WITHOUT_DESCRIPTION = SERVICES.map((service) => ({
  title: service.title,
  price: service.price,
}));
