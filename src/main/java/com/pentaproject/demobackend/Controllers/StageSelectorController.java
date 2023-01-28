package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;

import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Model.Save.Save;
import lombok.AllArgsConstructor;


import org.springframework.web.bind.annotation.*;




/**
 * RestFull controller, aka Main controller
 * @RequestMapping /api/v1 ;Path controllata dal controller
 *
 * @author Marco
 * @version 1.0
 *
 * */
@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
@CrossOrigin
public class StageSelectorController{
     private PartyController partyController;
     private EnemyController enemyController;
     private SaveController saveController;
     

     /**
     * Metodo per ottenere il party rispetto id dello stage.
     * Enumerazione [0,n-1] per gli stage
     * */
    @GetMapping("/party")
    public ApiResponse<?> getCurrentParty(){
        return partyController.getParty();
    }

    /**
     * Metodo per ottenere i nemici rispetto id dello stage
     * Enumerazione [0,n-1] per gli stage
     * @param id id dello stage che viene preso dalla path del uri
     * */
    @GetMapping("/{id}/enemies")
    public ApiResponse<?> getEnemy(@PathVariable int id){
        return enemyController.getEnemies(id);
    }

    /**
     * Metodo per inserire il party nel db
     * @param party json rapresentante oggetto Party
     * */
    @PostMapping("/party")
    //@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, path = "/party")
    public ApiResponse<?> setCurrentParty(@RequestBody Party party){
        return partyController.setParty(party);
    }

    /**
     * Metodo per ottenere il salvataggio dal db
     * */
    @GetMapping("/select")
    public ApiResponse<?> getSave(){
        return saveController.getSave();
    }
    
    /**
     * Metodo per inserire il salvataggio nel db
     * @param save json rapresentante oggetto Save
     * */
    @PostMapping("/select")
    public ApiResponse<?> setSave(@RequestBody Save save){
        return saveController.setSave(save);
    }

}
