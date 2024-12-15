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
  const [availabilityStatus, setAvailabilityStatus] = useState("inStock");
  // const [selectedBranch, setSelectedBranch] = useState("all"); // Cơ sở được chọn
  // const [branches, setBranches] = useState(["all", "Base 1", "Base 2", "Base 3"]); // Danh sách cơ sở

  const itemsPerPage = 12;

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8082/product");
      const data = await response.json();
      console.log("Fetched products:", data); // Kiểm tra dữ liệu trả về
      const convertedProducts = data.map((product) => ({
        ...product,
        title: product.name, // Thêm trường 'title' vì dữ liệu từ API không có
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


  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const filteredProducts = products.filter((product) => {
    // const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesTitle =
      searchTitle === "" || product.title.toLowerCase().includes(searchTitle.toLowerCase());
  
    // Lọc theo trạng thái kho
    const matchesAvailability =
      availabilityStatus === "inStock"
        ? product.stock > 0
        : availabilityStatus === "outStock"
        ? product.stock < 1
        : true;
    return matchesPrice && matchesTitle && matchesAvailability;
    // const matchesBranch = selectedBranch === "all" || product.branch === selectedBranch;
    // return matchesBrand && matchesPrice && matchesTitle && matchesAvailability && matchesBranch;
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
          {/* Chọn cơ sở */}
          {/* <div className="mb-3">
            <label htmlFor="branch-select" className="form-label">
              Select Base:
            </label>
            <select
              id="branch-select"
              className="form-select"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div> */}

          {/* Bộ lọc */}
          <ProductFilter
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
            // selectedBrand={selectedBrand}
            // setSelectedBrand={setSelectedBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            availabilityStatus={availabilityStatus}
            setAvailabilityStatus={setAvailabilityStatus}
            products={products}
          />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="col-9">
        <div
          style={{
            display: "grid", // Bố cục dạng lưới
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Tự động chia cột, mỗi cột tối thiểu 300px
            gap: "20px", // Khoảng cách giữa các thẻ
            justifyContent: "center", // Căn giữa lưới sản phẩm
          }}
        >
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
