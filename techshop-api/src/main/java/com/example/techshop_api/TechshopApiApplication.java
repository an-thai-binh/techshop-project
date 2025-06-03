package com.example.techshop_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TechshopApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechshopApiApplication.class, args);
	}

}
