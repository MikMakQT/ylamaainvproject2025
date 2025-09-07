import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Item {
    id: string;
    name: string;
    photoUrl: string;
    // add other fields as needed
}

const InventoryCarousel: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const q = query(
                collection(db, "inventory"),
                where("photoUrl", "!=", null)
            );
            const querySnapshot = await getDocs(q);
            const itemsWithPhotos: Item[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.photoUrl) {
                    itemsWithPhotos.push({ id: doc.id, ...data } as Item);
                }
            });
            setItems(itemsWithPhotos);
        };
        fetchItems();
    }, []);

    if (items.length === 0) return null;

    return (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <Carousel showThumbs={false} infiniteLoop>
                {items.map((item) => (
                    <div key={item.id}>
                        <img src={item.photoUrl} alt={item.name} />
                        <p className="legend">{item.name}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default InventoryCarousel;