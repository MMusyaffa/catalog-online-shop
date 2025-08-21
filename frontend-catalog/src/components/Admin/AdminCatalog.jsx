import { useEffect, useState } from "react";
import NavBar from "../Navbar";
import TableList from "./TableList";
import ModalForm from "./ModalForm";
import Footer from "../Footer";
import { fetchCatalogs, addCatalog, updateCatalog } from "../../utils/CatalogService";

function AdminCatalog() {
    const [isOpen, setIsOpen] = useState(false);
	const [modalMode, setModalMode] = useState('add');
	const [searchTerm, setSearchTerm] = useState('');
	const [itemData, setItemData] = useState(null);
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

	const handleOpen = (mode, item) => {
		setItemData(item);
		setModalMode(mode);
		setIsOpen(true)
	}

	const handleSubmit = async (newItemData) => {
        try {
            if (modalMode === 'add') {
                const newItem = await addCatalog(newItemData);
                setTableData((prevData) => [...prevData, newItem]);
            } else {
                const updatedItem = await updateCatalog(itemData.id, newItemData);
                setTableData((prevData) =>
                    prevData.map((item) => (item.id === itemData.id ? updatedItem : item))
                );
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
            <>
                <div>
                    <NavBar onSearch={setSearchTerm} />
                    <TableList onOpen={() => handleOpen('add')} setTableData={setTableData} tableData={tableData}
                               handleOpen={handleOpen} searchTerm={searchTerm}/>
                    <ModalForm 
                        isOpen={isOpen} OnSubmit={handleSubmit}
                        onClose={() => setIsOpen(false)}
                        mode={modalMode} itemData={itemData}
                    />
                    <Footer />
                </div>
            </>
    )
}

export default AdminCatalog