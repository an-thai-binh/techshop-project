import removeAccents from "remove-accents"

export function generateSkuValue(input: string) {
    return removeAccents(input)
        .replace(/\s+/g, "")                  // xoá khoảng trắng
        .toUpperCase();                       // viết hoa
}