import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuCard from "../../components/Layout/components/MenuCard/Menu_Card";
import ProductFilter from "../../components/Layout/components/Filter_Card/ProductFilter";
const exchangeRate = 1000; // Tỷ giá USD -> VNĐ

const CoffeeMenu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]); // [minPrice, maxPrice]
  const [searchTitle, setSearchTitle] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("all");

  const itemsPerPage = 12;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/category/beauty");
        const data = await response.json();
        const convertedProducts = data.products.map((product, index) => ({
          ...product,
          price: product.price * exchangeRate,
          availabilityStatus: index % 2 === 0 ? "In Stock" : "Low Stock",
        }));
        setProducts(convertedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesTitle =
      searchTitle === "" || product.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesAvailability =
      availabilityStatus === "all" || product.availabilityStatus === availabilityStatus;
    return matchesBrand && matchesPrice && matchesTitle && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Bộ lọc */}
        <div className="col-3">
          <ProductFilter
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            availabilityStatus={availabilityStatus}
            setAvailabilityStatus={setAvailabilityStatus}
            products={products}
          />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="col-9">
          <div className="row">
            {currentItems.map((product) => (
              <MenuCard product={product} key={product.id} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                  key={index}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeMenu;