import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function Page() {
  const [products, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/shoes");
        const json = await res.json();
        setProduct(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products &&
        products.data.map((product) => {
          return (
            <div className="text-3xl" key={product.id}>
              {product.Model}
            </div>
          );
        })}
    </div>
  );
}
