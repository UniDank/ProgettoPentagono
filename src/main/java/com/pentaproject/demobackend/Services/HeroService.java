package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Repositories.HeroRepository;
import org.springframework.stereotype.Service;


/**
 * Classe Service per la gestione della logica relativa agli oggetti di tipo hero
 * @version 1.0
 * @author Marco
 * */

@Service
public class HeroService {
    private HeroRepository rep;
    private static int value;

    public void insertHero(Hero hero){
        rep.insert(hero);
    }

    public Hero getHero(int id){
        return rep.findById(id).orElse(null);
    }

    public Hero generateHero(String name, Integer life, Integer mana){
        return new Hero(Integer.toString(HeroService.value++),name,life,mana);
    }

    public void insertAbility(Hero hero) {

    }
}
