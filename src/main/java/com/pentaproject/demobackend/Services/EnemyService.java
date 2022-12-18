package com.pentaproject.demobackend.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Model.Stage.Stage;
import com.pentaproject.demobackend.Model.Stage.StageSelector;
import com.pentaproject.demobackend.Repositories.EnemyRepository;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;


import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 * Classe Service per la gestione della logica relativa agli oggetti di tipo Enemy
 * @version 1.0
 * @author Marco
 * */

@Service
@AllArgsConstructor
public class EnemyService {
    private EnemyRepository rep;
    private static int value;

    private ObjectMapper json;

    public void insertEnemy(Enemy enemy){
        rep.insert(enemy);
    }

    public Enemy getEnemy(int id){
        return rep.findById(id).orElse(null);
    }

    public void generateEnemy(String name, Integer life, Integer mana, Integer attack, Integer defence, List<Ability> abilitiesList, EnemyType category) throws IllegalArgumentException{
        Enemy pippo = new Enemy(EnemyService.value++,name,life,mana,attack,defence,abilitiesList,category);
        insertEnemy(pippo);
    }

    public List<Enemy> getEnemies() {
        return rep.findAll();
    }



    /*
        Creazione dei nemici da passare al frontend:
        1. prelevo dal db 3 template di nemici che rispettano i requisiti dello stage
        2. li clono
        3. li mando al frontend
    */

    //TODO: NEED REFACTORY
    public List<Enemy> getEnemiesFromStage(int id) {
        try {

            File file = new File("G:\\Programmi_vari\\Programmi_Uni\\Java\\demoBackend\\src\\main\\resources\\valuestage.json");
            StageSelector value = json.readValue(file, StageSelector.class);
            Stage stage = value.getStages().get(id);
            String[] attack = stage.getAttack().split("-");
            String[] defence = stage.getDefence().split("-");
            String[] life = stage.getAttack().split("-");

            List<Enemy> template = rep.
                    findEnemiesByLifeBetweenAndDefenceBetweenAndAttackBetween(Integer.valueOf(life[0]),
                            Integer.valueOf(life[1]),Integer.valueOf(defence[0]),
                            Integer.valueOf(defence[1]),Integer.valueOf(attack[0]),
                            Integer.valueOf(attack[1]));
            Collections.shuffle(template);
            List<Enemy> enemiesforcloning = template.stream().limit(3).toList();
            List<Enemy> Cloned = new ArrayList<>();

            Random rand = new Random(21);
            for(int i = 0; i < stage.getEnemies() - 3; i++){
                int j = rand.nextInt(0,3);
                Enemy enemy = enemiesforcloning.get(j);
                Cloned.add((Enemy) enemy.clone());
            }

            Cloned.addAll(enemiesforcloning);

            return Cloned.stream().toList();



        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        return new ArrayList<>();
    }



}
