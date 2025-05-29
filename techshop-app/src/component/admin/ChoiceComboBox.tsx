'use client'

import { selectToken } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/shared/redux/hook";
import { ChoiceValue } from "@/types/product";
import { generateSkuValue } from "@/utils/SKUGenerator";
import axios from "axios";
import { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable'

interface Option {
    value: string;
    label: string;
}

type ChoiceComboBoxProps = {
    choiceId: string;
    choiceValueList: ChoiceValue[];
    onChange: (value: string) => void;
}
export default function ChoiceComboBox({ choiceId, choiceValueList, onChange }: ChoiceComboBoxProps) {
    const token = useAppSelector(selectToken);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        setOptions(choiceValueList.map(choiceValue => ({ value: choiceValue.id, label: choiceValue.choiceValue })));
    }, [choiceValueList])

    const handleCreate = async (inputValue: string) => {
        try {
            const newChoiceValue = {
                choiceId: Number(choiceId),
                choiceValue: inputValue,
                skuValue: generateSkuValue(inputValue)
            }
            const response = await axios.post(`http://localhost:8080/techshop/choiceValue`, newChoiceValue, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })
            if (response.data.success) {
                const newOption = {
                    value: response.data.data.id,
                    label: response.data.data.choiceValue
                }
                setOptions(prev => [...prev, newOption]);
            }
        } catch (error: any) {
            const message = error.response?.data.message || error.message;
            throw new Error('Error insert new choice value: ' + message);
        }
    }

    return (
        <CreatableSelect
            options={options}
            value={selectedOption}
            onCreateOption={handleCreate}
            onChange={(e) => {
                setSelectedOption(options.find(option => option.value === e?.value) || null);
                onChange(e?.value || "");
            }}
            placeholder="Chọn hoặc thêm mới giá trị..."
        />
    );
}