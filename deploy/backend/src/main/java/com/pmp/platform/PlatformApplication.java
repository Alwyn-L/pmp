package com.pmp.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * PMP 制造协同平台后端启动类（容器化部署基线工程）。
 * 真实业务代码可按领域模块（Modulith）分包后平移到本工程。
 */
@SpringBootApplication
public class PlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class, args);
    }
}
