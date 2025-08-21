import { useEffect, useState } from "react"
import { uploadImage } from "../../utils/CatalogService";

export default function ModalForm( { isOpen, onClose, mode, OnSubmit, itemData } ){
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [isActive, setStatus] = useState(false);
    const [image_url, setImage] = useState(null);

    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Available');
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        uploadImage(file, setImage);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const itemData = {
                name, image_url, type, size, brand, price: Number(price), isActive: isActive
            };
    
            await OnSubmit(itemData);
            onClose();
        } 
        catch (err) {
            console.error("Error Add New Data", err);
        }
    };
    

    useEffect(() => {
        if (mode === 'edit' && itemData) {
            setName(itemData.name);
            setType(itemData.type);
            setSize(itemData.size);
            setBrand(itemData.brand);
            setPrice(itemData.price);
            setStatus(itemData.isactive);
            setImage(itemData.image_url);
        }
        else {
            setName('');
            setType('');
            setSize('');
            setBrand('');
            setPrice('');
            setStatus(false);
            setImage(null);
        }
    }, [mode, itemData]);
    

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box w-92 mx-auto">
                <h3 className="font-bold text-lg">{mode === 'edit' ? 'Edit Item' : 'Add Item'}</h3>
                <form method="dialog" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center w-full mt-4">
                    <label
                        htmlFor="fileInput" className="border-2 border-dashed border-gray-400 rounded-lg p-4 w-full flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 relative">
                        {image_url ? (
                            <div className="relative w-full flex items-center justify-center">
                                <img src={image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                                {/* Tombol X untuk membatalkan gambar */}
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-md hover:bg-red-700"
                                > ✕
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-100 p-3 rounded-full">📤</div>
                                <p className="text-blue-500 font-semibold mt-2">Click To Upload Image</p>
                            </div>
                        )}
                    </label>
                    <input type="file" id="fileInput" className="hidden" onChange={handleImageChange} accept="image/*" />
                </div>
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        Name
                        <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        Type
                        <input type="text" className="grow" value={type} onChange={(e) => setType(e.target.value)} placeholder="Item Type" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        Size
                        <input type="text" className="grow" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Item Size" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        Brand
                        <input type="text" className="grow" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Item Brand" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 my-4">
                        Price
                        <input type="number" min="0" className="grow" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Item Price" />
                    </label>
                    <label className="flex items-center gap-2 my-4">
                        <select value={isActive ? 'Available' : 'Unavailable'} className="select select-bordered w-full max-w-xs"
                        onChange={handleStatusChange}>
                            <option>Available</option>
                            <option>Unavailable</option>
                        </select>
                    </label>
                    <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                    <button className="btn btn-success">{mode === 'edit' ? 'Save' : 'Add Item'} </button>
                </form>
            </div>
            </dialog>
        </>
    )
}