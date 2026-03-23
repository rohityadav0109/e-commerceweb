"use client"

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/CartContext";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then((data: Product[]) => {
        const p = data.find(x => x.id === id) || null;
        setProduct(p);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-light">Product not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center bg-[#f8f9fa] p-8 md:p-16 relative">
          <img src={product.image} alt={product.name} className="w-full max-w-sm h-auto object-cover mix-blend-multiply" />
          {product.featured && (
             <div className="absolute top-6 left-6 bg-[#1c1c1c] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
               Best Seller
             </div>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-[11px] font-bold text-[#666] uppercase tracking-[0.2em] mb-4">RKTECH COLLECTION</p>
          <h1 className="text-3xl md:text-4xl font-light text-[#1c1c1c] mb-6 tracking-tight leading-tight">{product.name}</h1>
          <div className="text-2xl font-medium text-[var(--primary)] mb-8">₹{product.price.toLocaleString('en-IN')}</div>
          
          <div className="w-full border-t border-gray-100 my-8"></div>

          <p className="text-[15px] font-light text-[#4a4a4a] leading-relaxed mb-10">
            {product.description}
          </p>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-[#1c1c1c] hover:bg-[var(--primary)] text-white font-bold tracking-[0.15em] text-xs py-5 uppercase transition-colors rounded-none"
          >
            Add to Bag
          </button>

          <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
            <details className="group cursor-pointer">
              <summary className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-[#1c1c1c] list-none">
                How to Style
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <p className="text-sm font-light text-[#666] mt-4 leading-relaxed">
                Pair this beautiful statement piece with minimal accessories. It is incredibly versatile for both casual day outings and elegant evening events.
              </p>
            </details>
            <div className="w-full border-b border-gray-100"></div>
            <details className="group cursor-pointer">
              <summary className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-[#1c1c1c] list-none">
                Shipping & Returns
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </summary>
              <p className="text-sm font-light text-[#666] mt-4 leading-relaxed">
                Free standard shipping on all orders over ₹5000. Returns are accepted within 30 days of purchase in unworn condition.
              </p>
            </details>
          </div>

        </div>

      </main>
      
      <Footer />
    </div>
  );
}
