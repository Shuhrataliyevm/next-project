import { Product } from "@/types/page";
interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div>
            <img src={product.image} alt={product.title} width={50} />
            <p>{product.title}</p>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductCard;
