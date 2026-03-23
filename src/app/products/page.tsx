"use client"

import { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || "All";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    let url = `/api/products?sort=${sort}`;
    if (category !== "All") url += `&category=${encodeURIComponent(category)}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
      
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h1 className="text-3xl font-light text-[#1c1c1c] tracking-tight mb-8">SHOP</h1>
          
          <div className="mb-8">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#1c1c1c] mb-4 border-b border-gray-100 pb-2">Category</h3>
            <ul className="space-y-3 text-sm font-light text-[#666]">
              {["All", "Men's Clothing", "Women's Clothing", "Kids Fashion"].map(c => (
                <li key={c}>
                  <button 
                    onClick={() => setCategory(c)}
                    className={`${category === c ? 'text-[var(--primary)] font-medium underline underline-offset-4 decoration-pink-300' : 'hover:text-[var(--primary)]'} transition-colors text-left`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#1c1c1c] mb-4 border-b border-gray-100 pb-2">Sort By</h3>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-3 bg-[#f8f9fa] text-sm font-light text-[#1c1c1c] rounded-none outline-none focus:ring-1 focus:ring-[var(--primary)]"
            >
              <option value="newest">New Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="w-full text-center py-20">
                <p className="text-lg font-light text-[#666]">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

    </main>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
