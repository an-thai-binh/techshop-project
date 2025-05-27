export function generateSkuValue(input: string) {
    return input
        .normalize("NFD")                     // tách dấu ra khỏi ký tự gốc (ký tự + dấu)
        .replace(/[\u0300-\u036f]/g, "")      // xoá các dấu
        .replace(/\s+/g, "")                  // xoá khoảng trắng
        .toUpperCase();                       // viết hoa
}