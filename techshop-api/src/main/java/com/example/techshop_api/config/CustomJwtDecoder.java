package com.example.techshop_api.config;

import com.example.techshop_api.repository.RevocatedTokenRepository;
import com.example.techshop_api.repository.UserRepository;
import com.example.techshop_api.utils.JwtUtil;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;

@Component
@RequiredArgsConstructor
public class CustomJwtDecoder implements JwtDecoder {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RevocatedTokenRepository revocatedTokenRepository;
    private NimbusJwtDecoder nimbusJwtDecoder = null;
    @Value("${jwt.secret-key}")
    private String jwtSecret;

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            SignedJWT signedJWT = jwtUtil.verifyToken(token);
            if(signedJWT == null) {
                throw new JwtException("Invalid token");
            }
            String userId = signedJWT.getJWTClaimsSet().getSubject();
            if(!userRepository.existsById(Long.parseLong(userId))) {
                throw new JwtException("User not found");
            }
            String jit = signedJWT.getJWTClaimsSet().getJWTID();
            if(revocatedTokenRepository.existsById(jit)) {
                throw new JwtException("Token has been revoked");
            }
        } catch (JOSEException | ParseException e) {
            throw new JwtException(e.getMessage());
        }
        if(nimbusJwtDecoder == null) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(jwtSecret.getBytes(), "HS512");
            nimbusJwtDecoder =  NimbusJwtDecoder.withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }
        return nimbusJwtDecoder.decode(token);
    }
}