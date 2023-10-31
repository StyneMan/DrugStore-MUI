import prod1 from "../assets/images/product1.png"
import prod2 from "../assets/images/product2.png"
import noprod from "../assets/images/no_prod_image.png"

export interface ProductModel {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  validity: string;
  sachet: string;
}

const tempProducts: ProductModel[] = [
  {
    id: 0,
    image: prod1,
    name: "Emzor Paracetamol I.V 100mg",
    price: 5000,
    validity: "20/11/24",
    sachet: "16/sachet • 10 sachet/pack",
    quantity: 12,
  },
  {
    id: 1,
    image: noprod,
    name: "Emzor Multivite 100mg",
    price: 3100,
    validity: "20/11/24",
    sachet: "16/sachet • 10 sachet/pack",
    quantity: 12,
  },
  {
    id: 2,
    image: prod2,
    name: "Emzor Panadol Extra 50mg",
    price: 5000,
    validity: "20/11/24",
    sachet: "16/sachet • 10 sachet/pack",
    quantity: 32,
  },
  {
    id: 3,
    image: noprod,
    name: "Emzor Paracetamol I 100mg",
    price: 4000,
    validity: "20/11/24",
    sachet: "16/sachet • 10 sachet/pack",
    quantity: 32,
  },
  {
    id: 4,
    image: prod2,
    name: "Emzor Parace V 100mg",
    price: 5000,
    validity: "20/11/24",
    sachet: "16/sachet • 10 sachet/pack",
    quantity: 32,
  },
];

export default tempProducts;