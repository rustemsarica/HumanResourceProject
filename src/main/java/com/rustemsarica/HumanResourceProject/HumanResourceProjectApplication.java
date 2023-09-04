package com.rustemsarica.HumanResourceProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class HumanResourceProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(HumanResourceProjectApplication.class, args);
	}

}
