import { useState } from "react";
import ThemeSelector, { useTheme } from "../Theme";
import { deleteCatalog } from "../../utils/CatalogService";
import ModalDelete from "./ModalDelete";

export default function TableList({ handleOpen, tableData, setTableData, searchTerm, onOpen }) {
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { theme, changeTheme } = useTheme();

    const filteredData = tableData.filter((item) =>
        ["name", "type", "size", "brand"].some((key) =>
            item[key].toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleDelete = async (id) => {
        try {
            await deleteCatalog(id);
            setTableData((prevData) =>
                prevData.filter((item) => item.id !== id).sort((a, b) => a.id - b.id)
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const openDeleteModal = (item) => {
        setDeleteId(item);
        setIsDeleteModalOpen(true);
    };

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="ml-14">
                        <ThemeSelector changeTheme={changeTheme} />
                    </div>
                    <a className="btn btn-primary mr-12" onClick={onOpen}>
                        Add Item
                    </a>
                </div>
                <table className="table mb-10">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {filteredData.map((item, index) => (
                            <tr key={item.id}>
                                <th>{index + 1}</th>
                                <td>
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.size}</td>
                                <td>{item.brand}</td>
                                <td>
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", }).format(item.price)}
                                </td>
                                <td>
                                    <button
                                        className={`btn rounded-full w-30 ${ item.isactive ? `btn-primary` : `btn-outline btn-primary` }`}
                                    > {item.isactive ? "Available" : "Unavailable"}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleOpen("edit", item)} className="btn btn-secondary"
                                    > Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-accent" onClick={() => openDeleteModal(item)}
                                    > Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalDelete
                isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete} item={deleteId}
            />
        </>
    );
}
