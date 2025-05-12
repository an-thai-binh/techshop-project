package com.example.techshop_api.utils;

import com.example.techshop_api.entity.user.Permission;
import com.example.techshop_api.entity.user.Role;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Slf4j
@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtGenerator {
    @Value("${jwt.secret-key}")
    String jwtSecretKey;

    public String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())    // sub
                .issueTime(new Date())  // iat
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))   // exp
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(jwtSecretKey.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.CREATE_TOKEN_FAILED);
        }
    }

    private String buildScope(User user) {
        StringJoiner joiner = new StringJoiner(" "); // OAuth2 convention
        if (!CollectionUtils.isEmpty(user.getRoleList())) {
            for (Role role : user.getRoleList()) {
                joiner.add(role.getRoleName());
                for (Permission permission : role.getPermissionList()) {
                    joiner.add(permission.getPermissionName());
                }
            }
        }
        return joiner.toString();
    }
}
