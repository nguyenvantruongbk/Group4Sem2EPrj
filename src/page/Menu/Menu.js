import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const exchangeRate = 1000; // Tỷ giá USD -> VNĐ

const CoffeeMenu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]); // [minPrice, maxPrice]
  const [searchTitle, setSearchTitle] = useState(""); // Lọc theo tiêu đề
  const [availabilityStatus, setAvailabilityStatus] = useState("all"); // Lọc trạng thái

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/category/beauty");
        const data = await response.json();
        // Giả định trạng thái sản phẩm `availabilityStatus`
        const convertedProducts = data.products.map((product, index) => ({
          ...product,
          price: product.price * exchangeRate,
          availabilityStatus: index % 2 === 0 ? "In Stock" : "Low Stock", // Thêm trạng thái giả
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

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, +e.target.value]);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (e) => {
    setAvailabilityStatus(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Bộ lọc */}
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Search Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={searchTitle}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Brand</label>
            <select className="form-select" onChange={handleBrandChange}>
              <option value="all">All Brands</option>
              {Array.from(new Set(products.map((product) => product.brand))).map((brand) => (
                <option value={brand} key={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Availability</label>
            <select className="form-select" onChange={handleAvailabilityChange}>
              <option value="all">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <div className="d-flex justify-content-between">
              <span>{priceRange[0].toLocaleString()}₫</span>
              <span>{priceRange[1].toLocaleString()}₫</span>
            </div>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100000"
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="col-9">
          <div className="row">
            {currentItems.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title"><strong>{product.title}</strong></h5>
                    {/* <p className="card-text">{product.description}</p> */}
                    <h5 className="card-text">
                      Price: {product.price.toLocaleString()}₫
                    </h5>
                    <h5 className="card-text">
                      Brand: {product.brand}
                    </h5>
                    <h5 className="card-text">
                      Status: {product.availabilityStatus}
                    </h5>
                  </div>
                </div>
              </div>
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
