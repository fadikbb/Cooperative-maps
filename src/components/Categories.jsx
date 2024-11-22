import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Laptop, Cake, Shirt, Home } from "lucide-react";

const CategoryCard = ({ title, icon: Icon, imageUrl }) => (
  <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105">
    <div
      className="h-64 w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#4d9900]/90 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8" style={{ color: "rgba(248,197,25,255)" }} />
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <ChevronRight
          className="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-2"
          style={{ color: "rgba(248,197,25,255)" }}
        />
      </div>

      {/* Border Animation */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[rgba(248,197,25,255)] transition-all duration-300 group-hover:w-full" />
    </div>
  </div>
);

const Categories = () => {
  const categories = [
    {
      title: "Electronics",
      icon: Laptop,
      imageUrl:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000",
    },
    {
      title: "Bakery",
      icon: Cake,
      imageUrl:
        "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000",
    },

    {
      title: "Clothing",
      icon: Shirt,
      imageUrl:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
    },
    {
      title: "Home Equipment",
      icon: Home,
      imageUrl:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      {/* Section Header */}
      <div className="container mx-auto mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#4d9900" }}>
          Browse Categories
        </h2>
        <div
          className="w-24 h-1 mx-auto rounded-full"
          style={{ backgroundColor: "rgba(248,197,25,255)" }}
        />
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to="/products">
              <CategoryCard {...category} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
