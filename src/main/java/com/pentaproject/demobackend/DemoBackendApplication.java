package com.pentaproject.demobackend;



import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Repositories.AbilityRepository;


import com.pentaproject.demobackend.Repositories.EnemyRepository;
import com.pentaproject.demobackend.Repositories.PartyRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;


@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, XADataSourceAutoConfiguration.class})
@AllArgsConstructor //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended
public class DemoBackendApplication {
    private EnemyRepository meleeEnemyRepository;
    private AbilityRepository abilityRepository;
    private PartyRepository partyRepository;



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
                    Stream.of(new Enemy("pippo",40,20,5,15,new ArrayList<>(), EnemyType.Thief),
                                    new Enemy("claudio",25,5,10,5,abilityRepository.findAll(), EnemyType.Tank),
                            new Enemy("wa",20,25,5,10,new ArrayList<>(),EnemyType.Archer),
                                    new Enemy("wa1",23,25,15,15,new ArrayList<>(),EnemyType.Archer)
                                    )
                            .toList()

            );
            partyRepository.deleteAll();
            partyRepository.save(
                    new Party(0, List.of(new Hero("0","marco",20,20,20,20)), List.of(new Item("0","potion","cure",20,5)))
            );


        };

        }


    }


