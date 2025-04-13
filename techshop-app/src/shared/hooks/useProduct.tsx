"use client";
import {useEffect, useState} from "react";
import {ProductProps} from "@/shared/component/CardProduct";

interface CollectionProps{
    id: string,
    name: string,
    products: ProductProps[]
}
export function useFetchData() {
    const [data, setData] = useState<[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/apple_catalog_with_category_info.json");
            const dataJson = await res.json();
            setData(dataJson);
        };
        fetchData();
    }, []);

    return data;
}

export function useCollection(id: string){
    const [collection, setCollection] = useState<CollectionProps>();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/apple_catalog_with_category_info.json");
            const dataJson = await res.json();
            const valuesObj = Object.values(dataJson) as CollectionProps[];
            const found = valuesObj.find((item) => item.id === id)
            setCollection(found);
        }
        fetchData();
    }, [id]);
    return collection;
}