package com.example.techshop_api.utils;

import com.example.techshop_api.entity.user.Permission;
import com.example.techshop_api.entity.user.Role;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtUtil {
    @Value("${jwt.secret-key}")
    String jwtSecretKey;

    public String generateAccessToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(user.getId().toString()) // sub
                .claim("username", user.getUsername())
                .issueTime(new Date())  // iat
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))   // exp
                .claim("scope", buildScope(user))
                .build();

        return buildJWT(header, jwtClaimsSet); //a ccess token
    }

    public String generateRefreshToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .claim("type", "refresh")
                .subject(user.getId().toString())
                .claim("username", user.getUsername())
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(24, ChronoUnit.HOURS).toEpochMilli()))
                .build();

        return buildJWT(header, jwtClaimsSet);
    }

    private String buildJWT(JWSHeader header, JWTClaimsSet jwtClaimsSet) {
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

    public SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(jwtSecretKey.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        if(!signedJWT.verify(verifier)) {
            return null;
        }
        Date exp = signedJWT.getJWTClaimsSet().getExpirationTime();
        if(exp == null || exp.before(new Date())) {
            return null;
        }
        return signedJWT;
    }
}