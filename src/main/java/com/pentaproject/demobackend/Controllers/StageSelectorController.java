package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Party.Party;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * RestFull controller, aka Main controller
 * @RequestMapping /api/v1  Path controllata dal controller
 *
 * @author Marco
 * @version 1.0
 *
 * */
@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
public class StageSelectorController {
     private PartyController partyController;
     private EnemyController enemyController;
     private HeroController heroController;
     private ItemController itemController;
     private AbilityController abilityController;

     /**
     * Metodo per ottenere il party rispetto id dello stage.
     * Enumerazione [0,n-1] per gli stage
     * @param id id dello stage che viene preso dalla path del uri
     * */
    @GetMapping("/{id}/party")
    public ApiResponse<Party> getCurrentParty(@PathVariable int id){
        return partyController.getParty(id);
    }

    /**
     * Metodo per ottenere i nemici rispetto id dello stage
     * Enumerazione [0,n-1] per gli stage
     * @param id id dello stage che viene preso dalla path del uri
     * */
    @GetMapping("/{id}/enemies")
    public ApiResponse<List<Enemy>> getEnemy(@PathVariable int id){
        return enemyController.getEnemies(id);
    }

    /**
     * Metodo per inserire il party nel db
     * @param party json rapresentante oggetto Party
     * */
    @PostMapping("/party")
    public ApiResponse<?> setCurrentParty(@RequestBody Party party){
        return partyController.setParty(party);
    }

}
