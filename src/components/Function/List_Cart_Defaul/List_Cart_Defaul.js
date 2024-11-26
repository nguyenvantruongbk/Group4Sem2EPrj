
function  Seach_List_Card(Name,Quantity){

     const [list, setList] = useState([]); // Toàn bộ danh sách sản phẩm từ API
    const [filteredList, setFilteredList] = useState([]); // Danh sách sản phẩm đã lọc

    function callData() {
    
        const url = `https://dummyjson.com/products?search=${Name}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setList(data.products);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    useEffect(() => {

        if (Name) {
            callData();
        }
    }, [Name]);


    return(
        <div>
            
        </div>
    );
}





function List_Cart_Defaul() {
    return ( 
    <div  className="Container">
        <h2 >List_Cart_Defaul</h2>
    </div> );
}

export default List_Cart_Defaul;
export {Seach_List_Card};