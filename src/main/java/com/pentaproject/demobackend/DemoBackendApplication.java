package com.pentaproject.demobackend;

import com.pentaproject.demobackend.Model.Enemy;
import com.pentaproject.demobackend.Repositories.IEnemyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;


@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, XADataSourceAutoConfiguration.class})
public class DemoBackendApplication {
    @Autowired
    private IEnemyRepository rep;


    public static void main(String[] args) {
        SpringApplication.run(DemoBackendApplication.class, args);
    }


    @Bean
    CommandLineRunner runner() {
        return args -> {
            rep.deleteAll();
          rep.saveAll(
                  Stream.of(new Enemy("enemy1","pippo"),new Enemy("enemy2","claudio"))
                          .toList()

          );
        };
    }

}
