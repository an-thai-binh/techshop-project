package com.example.techshop_api.utils;

import java.text.NumberFormat;
import java.util.Locale;

public class FormatUtils {
    public static String formatVietNamCurrency(double amount) {
        Locale vietNamLocale = new Locale("vi", "VN");
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(vietNamLocale);
        return currencyFormat.format(amount);
    }
}
