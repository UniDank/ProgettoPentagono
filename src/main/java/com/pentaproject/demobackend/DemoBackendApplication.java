package com.pentaproject.demobackend;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Enemies.MageEnemy;
import com.pentaproject.demobackend.Model.Enemies.MeleeEnemy;

import com.pentaproject.demobackend.Repositories.AbilityRepository;
import com.pentaproject.demobackend.Repositories.MageEnemyRepository;
import com.pentaproject.demobackend.Repositories.MeleeEnemyRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;



import java.util.stream.Stream;


@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, XADataSourceAutoConfiguration.class})
@AllArgsConstructor
public class DemoBackendApplication {
    //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended
    private MeleeEnemyRepository meleeEnemyRepository;
    private AbilityRepository abilityRepository;
    private MageEnemyRepository mageEnemyRepository;



    public static void main(String[] args) {
        SpringApplication.run(DemoBackendApplication.class, args);
    }


    @Bean
    CommandLineRunner runner() {
        return args -> {
            abilityRepository.deleteAll();
            abilityRepository.saveAll(Stream.of(new Ability(1,"fireball",20,""),
                    new Ability(2,"lavacast", 60, ""))
                    .toList());
            meleeEnemyRepository.deleteAll();
            meleeEnemyRepository.saveAll(
                  Stream.of(new MeleeEnemy(1,"pippo","thief",20,0,null),
                                  new MeleeEnemy(2,"claudio","thief",20,0,abilityRepository.findAll()))
                          .toList()

            );
            mageEnemyRepository.deleteAll();
            mageEnemyRepository.saveAll(
                    Stream.of(new MageEnemy(1,"Giorgio",10,500,  abilityRepository.findAll()))
                            .toList()
            );
        };
    }

}
