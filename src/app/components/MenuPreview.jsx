"use client";

import { useState, useEffect, memo } from "react";
import { Flame, Star } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

// 🔹 Memoized dish card for performance
const DishCard = memo(
  ({ dish }) => (
    <div className="group relative bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors duration-200">
      {/* Image Section */}
      <div className="relative aspect-[5/3] bg-zinc-900 overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="240"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ contentVisibility: "auto" }}
        />

        {dish.spicy > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {[...Array(Math.min(dish.spicy, 3))].map((_, i) => (
              <Flame
                key={i}
                className="w-3 h-3 text-orange-500 fill-orange-500"
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Popular
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4">
        <h3 className="text-base font-bold text-white mb-1 truncate">
          {dish.name}
        </h3>
        <p className="text-xs text-zinc-500 mb-3 line-clamp-1">
          {dish.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star
              className="w-3 h-3 text-amber-500 fill-amber-500"
              aria-hidden="true"
            />
            <span className="text-xs text-white font-semibold">
              {dish.rating}
            </span>
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            {dish.price}
          </span>
        </div>
      </div>
    </div>
  ),
  (prevProps, nextProps) => prevProps.dish.id === nextProps.dish.id
);

DishCard.displayName = "DishCard";

export default function MenuPreview() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔸 Fetch only once — no real-time subscription
    const fetchDishesOnce = async () => {
      try {
        const q = query(
          collection(db, "dishes"),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((dish) => dish.popular)
          .slice(0, 4);

        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishesOnce(); // 🔸 Run only once on mount
  }, []); // ✅ Empty dependency array means no re-runs

  const displayDishes = loading ? [] : dishes;

  return (
    <section
      className="relative bg-zinc-950 py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #18181b 1px, transparent 1px), linear-gradient(to bottom, #18181b 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Dishes
            </span>
          </h2>
          <p className="text-zinc-400">
            Handpicked favorites from our authentic menu
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {displayDishes.length > 0 ? (
            displayDishes.map((dish) => <DishCard key={dish.id} dish={dish} />)
          ) : (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <div className="aspect-[5/3] bg-zinc-800/30" />
                <div className="p-4">
                  <div className="h-4 w-3/4 bg-zinc-800/30 rounded mb-2" />
                  <div className="h-3 w-full bg-zinc-800/20 rounded mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-12 bg-zinc-800/30 rounded" />
                    <div className="h-4 w-16 bg-zinc-800/30 rounded" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
