package com.pentaproject.demobackend;



import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Repositories.AbilityRepository;


import com.pentaproject.demobackend.Repositories.EnemyRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.stream.Stream;


@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, XADataSourceAutoConfiguration.class})
@AllArgsConstructor //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended
public class DemoBackendApplication {
    private EnemyRepository meleeEnemyRepository;
    private AbilityRepository abilityRepository;



    public static void main(String[] args) {
        SpringApplication.run(DemoBackendApplication.class, args);
    }


    @Bean
    CommandLineRunner runner() {
        return args -> {
            abilityRepository.deleteAll();
            abilityRepository.saveAll(Stream.of(new Ability(1,"fireball",20,""),new Ability(2,"lavacast", 60, ""))
                    .toList());
            meleeEnemyRepository.deleteAll();
            meleeEnemyRepository.saveAll(
                    Stream.of(new Enemy(1,"pippo",40,20,5,5,new ArrayList<>(), EnemyType.Thief),
                                    new Enemy(2,"claudio",40,20,5,5,abilityRepository.findAll(), EnemyType.Tank))
                            .toList()

            );

        };

        }


    }


