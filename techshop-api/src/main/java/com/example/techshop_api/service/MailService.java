package com.example.techshop_api.service;

import com.example.techshop_api.dto.response.order.OrderItemDetailResponse;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.payment.Payment;
import com.example.techshop_api.utils.FormatUtils;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MailService {
    JavaMailSender mailSender;

    @Async
    public void sendOrderSuccess(String to, Order order, List<OrderItemDetailResponse> orderItemList, Payment payment) {
        String subject = "Techshop | Đặt hàng thành công";

        String orderItemRows = buildOrderItemRows(orderItemList);

        String paymentMethod = payment.getPaymentMethod().equalsIgnoreCase("COD")
                ? "Thanh toán khi nhận hàng"
                : "Chuyển khoản (đã thu)";

        String content =
                        "<html>" +
                        "<body>" +
                        "<p>Xin cảm ơn quý khách đã đặt hàng tại hệ thống <b>Techshop</b>. Đơn hàng của quý khách sẽ được gửi đến trong vài ngày tới.</p>" +
                        "<p>Dưới đây là thông tin chi tiết về đơn hàng <b>#" + order.getId() + "</b>:</p>" +
                        "<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">" +
                        "  <thead>" +
                        "    <tr>" +
                        "      <th style=\"width: 60%; text-align: center;\">Tên sản phẩm</th>" +
                        "      <th style=\"width: 20%; text-align: center;\">Số lượng</th>" +
                        "    </tr>" +
                        "  </thead>" +
                        "  <tbody>" +
                        orderItemRows +
                        "  </tbody>" +
                        "</table>" +
                        "<p><strong>Tổng tiền:</strong> " + FormatUtils.formatVietNamCurrency(order.getTotalAmount()) + "</p>" +
                        "<p><strong>Hình thức thanh toán:</strong> " + paymentMethod + "</p>" +
                        "<p>Nếu quý khách có bất kỳ thắc mắc nào về đơn hàng, xin vui lòng phản hồi lại email này.</p>" +
                        "<p>Một lần nữa xin cảm ơn quý khách, chúc quý khách một ngày vui vẻ!</p>" +
                        "</body>" +
                        "</html>";

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Failed to send order success mail: " + e.getMessage());
        }
    }

    private String buildOrderItemRows(List<OrderItemDetailResponse> orderItemList) {
        StringBuilder sb = new StringBuilder();
        for (OrderItemDetailResponse item : orderItemList) {
            String row = """
            <tr>
              <td style="padding: 8px;">%s</td>
              <td style="text-align: center;">%d</td>
            </tr>
            """.formatted(
                    item.getProductName(),
                    item.getQuantity()
            );
            sb.append(row);
        }
        return sb.toString();
    }
}
