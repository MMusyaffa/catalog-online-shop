import { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import CardList from "./components/User/CardList";
import Footer from "./components/Footer";
import { fetchCatalogs } from "./utils/CatalogService";
import './index.css';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
        const loadCatalogs = async () => {
            try {
                const data = await fetchCatalogs();
                setTableData(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        loadCatalogs();
    }, []);

	return (
		<>
			<div>
				<NavBar onSearch={setSearchTerm} />
				<CardList tableData={tableData} searchTerm={searchTerm} />
				<Footer />
			</div>
		</>
  	)
}

export default App
