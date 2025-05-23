package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.image.ImageCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.exception.FileException;
import com.example.techshop_api.mapper.ImageMapper;
import com.example.techshop_api.repository.ImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageService {
    final ImageRepository imageRepository;
    final ImageMapper imageMapper;

    @Value("${external.upload-image-url}")
    String uploadUrl;

    public ApiResponse<Page<ImageResponse>> index(Pageable pageable) {
        Page<Image> images = imageRepository.findAll(pageable);
        Page<ImageResponse> imageResponses = images.map(imageMapper::toImageResponse);
        return ApiResponse.<Page<ImageResponse>>builder()
                .success(true)
                .data(imageResponses)
                .build();
    }

    public ApiResponse<ImageResponse> show(Long id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        ImageResponse imageResponse = imageMapper.toImageResponse(image);
        return ApiResponse.<ImageResponse>builder()
                .success(true)
                .data(imageResponse)
                .build();
    }

    public ApiResponse<ImageResponse> show(String url) {
        Image image = imageRepository.findByImgUrl(url).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        ImageResponse imageResponse = imageMapper.toImageResponse(image);
        return ApiResponse.<ImageResponse>builder()
                .success(true)
                .data(imageResponse)
                .build();
    }

    public ApiResponse<ImageResponse> store(ImageCreationRequest request) {
        Image image = imageMapper.toImage(request);
        try {
            image = imageRepository.save(image);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ImageResponse imageResponse = imageMapper.toImageResponse(image);
        return ApiResponse.<ImageResponse>builder()
                .success(true)
                .data(imageResponse)
                .build();
    }

    public ApiResponse<ImageResponse> store(MultipartFile file) {
        if(file.isEmpty()) {
            throw new FileException("File is empty");
        }
        // chuyển file thành dạng file cho phần body của request
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        try {
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };
            requestBody.add("fileUpload", resource);    // fileUpload là vì API bên ngoài nhận tên tham số file là fileUpload
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new FileException(e.getMessage());
        }
        // khởi tạo request header
        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setContentType(MediaType.MULTIPART_FORM_DATA);

        // khởi tạo request
        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(requestBody, requestHeader);
        return storeFileInExternal(request);
    }

    /**
     * Gửi request chứa file đến API bên ngoài sau đó xử lý kết quả trả về
     * @param request request chứa file
     * @return ApiResponse<ImageResponse>
     */
    private ApiResponse<ImageResponse> storeFileInExternal(HttpEntity<MultiValueMap<String, Object>> request) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(uploadUrl, request, Map.class);
            String message = response.getBody().get("message").toString();
            if(response.getStatusCode().is2xxSuccessful()) {
                return store(new ImageCreationRequest(message));
            } else {
                log.error(message);
                throw new FileException(message);
            }
        } catch (RestClientException e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.REQUEST_EXTERNAL_FAILED);
        }
    }
}
