package com.pentaproject.demobackend;



import com.pentaproject.demobackend.Repositories.AbilityRepository;
import com.pentaproject.demobackend.Repositories.EnemyRepository;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;





@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, XADataSourceAutoConfiguration.class})
@AllArgsConstructor
public class DemoBackendApplication {
    //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended
    private EnemyRepository meleeEnemyRepository;
    private AbilityRepository abilityRepository;



    public static void main(String[] args) {
        SpringApplication.run(DemoBackendApplication.class, args);
    }


    @Bean
    CommandLineRunner runner() {
        return args -> {

        };
    }

}
