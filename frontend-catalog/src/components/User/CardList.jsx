import { useState } from "react";
import ThemeSelector, { useTheme } from "../Theme";

export default function CardList({ tableData, searchTerm }) {
    const { theme, changeTheme } = useTheme();

    const filteredData = tableData.filter((item) =>
        ["name", "type", "size", "brand"].some((key) =>
            item[key].toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>
            <div className="flex justify-between items-center px-4 mt-10 py-2">
                <div className="ml-14">
                    <ThemeSelector changeTheme={changeTheme} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-16 ml-4">
                {filteredData.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-xl mt-5 mb-10">
                        <figure className="bg-gray-200 rounded-md">
                            <img
                                src={item.image_url || "https://via.placeholder.com/150"} alt={item.name} className="w-50 h-50 object-cover"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p>{item.type} - {item.size}</p>
                            <p className="text-lg font-bold">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(item.price)}
                            </p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">{item.brand}</div>
                                <div className={`badge ${item.isactive ? "badge-primary" : "badge-outline"}`}>
                                    {item.isactive ? "Available" : "Unavailable"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}