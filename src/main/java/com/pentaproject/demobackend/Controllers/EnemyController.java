package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;


import com.pentaproject.demobackend.Model.Enemies.Enemy;

import com.pentaproject.demobackend.Services.EnemyService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;


import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.List;

//todo: usare i nomi come id univoci!
@Controller
@AllArgsConstructor //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended
public class EnemyController {

    private EnemyService enemyService;
    
    /**
     * Metodi per restituire i nemici relativi allo stage selezionato.
     * Restituisce una lista di nemici, di cui alcuni copiati!
     * @param id id dello stage
     *
     * */
    public ApiResponse<List<Enemy>> getEnemies(int id){
        try{
            return new ApiResponse<>(HttpStatus.OK,enemyService.getEnemiesFromStage(id));
        }
        catch (IOException ex){
            return new ApiResponse<>(HttpStatus.NOT_FOUND,"File non trovato oppure problemi con esso");
        }
        
    }



}
