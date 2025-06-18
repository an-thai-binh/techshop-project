import { format } from 'date-fns'

export function formatVietNamCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export function formatPrice(value: string | number): string {
  const number = typeof value === 'string' ? parseInt(value, 10) : value
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(number)
}

export function formatDateTime(value: string): string {
  return format(new Date(value), 'dd/MM/yyyy HH:mm:ss');
}

export function formatOrderStatus(value: string): { formatted: string, color: string } {
  const status = value.split(" ")[0];
  let formatted = value;
  let color = "#000000";
  switch (status) {
    case "PENDING":
      formatted = "Đang chuẩn bị";
      color = "#123fe5";
      break;
    case "DELIVERING":
      formatted = "Đang giao hàng";
      color = "#123fe5";
      break;
    case "SUCCESS":
      formatted = "Đã hoàn thành";
      color = "#12e53c";
      break;
    case "FAILED":
      formatted = "Huỷ" + value.substring(6);
      color = "#ef1310";
      break;
  }
  return { formatted, color };
}

export function formatPaymentStatus(value: string): { formatted: string, color: string } {
  let formatted = value;
  let color = "#000000";
  switch (value) {
    case "PENDING":
      formatted = "Chưa thanh toán";
      color = "#ef1310";
      break;
    case "SUCCESS":
      formatted = "Đã thanh toán";
      color = "#12e53c";
      break;
  }
  return { formatted, color };
}
