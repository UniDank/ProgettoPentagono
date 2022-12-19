package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Services.EnemyService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;


import org.springframework.stereotype.Controller;

import java.util.List;

//todo: usare i nomi come id univoci!
@Controller
@AllArgsConstructor
public class EnemyController {
    //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended

    private EnemyService enemyService;
    /**
     * Metodi per inserire nemici all'interno del db
     *
     * */
    public ApiResponse<?> setEnemy(Enemy enemy){
        //TODO: gestione degli errori
        enemyService.insertEnemy(enemy);
        return new ApiResponse<>(HttpStatus.OK,"");
    }
    /**
     * Metodi per inserire nemici all'interno del db
     *
     * */

    public ApiResponse<?> setEnemy(String name, Integer life, Integer mana, Integer attack, Integer defence, List<Ability> abilitiesList, EnemyType category){
        //TODO: gestione degli errori
        enemyService.generateEnemy(name,life,mana,attack,defence,abilitiesList,category);
        return new ApiResponse<>(HttpStatus.OK,"");
    }

    /**
     * Metodi per restituire i nemici relativi allo stage selezionato.
     * Restituisce una lista di nemici, di cui alcuni copiati!
     * @param id id dello stage
     *
     * */
    public ApiResponse<List<Enemy>> getEnemies(int id){
        //TODO: gestione degli errori
        return new ApiResponse<>(HttpStatus.OK,enemyService.getEnemiesFromStage(id));
    }



}
