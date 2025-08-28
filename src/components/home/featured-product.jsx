import { useProducts } from "../../queries/use-products";
import ProductCard from "../cards/product-card";

export default function FeaturedProduct() {
  const { data: products, isLoading, isError } = useProducts();
  return (
    <section className="max-width padding-x margin-y">
      <h2 className="mb-8 text-center">Featured Product</h2>
      <div className="flex items-start gap-5">
        {products?.products.splice(0, 4).map((product, i) => (
          <ProductCard product={product} key={product.id} i={i} />
        ))}
      </div>
    </section>
  );
}
