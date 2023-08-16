package com.zucchini;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ZucchiniBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZucchiniBackApplication.class, args);
	}

}
