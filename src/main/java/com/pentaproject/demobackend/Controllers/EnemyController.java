package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Services.EnemyService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
public class EnemyController {
    //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended

    private EnemyService enemyService;




    @GetMapping(value = "/enemies", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<?> getEnemies(){
        return new ApiResponse<>(HttpStatus.OK,enemyService.getEnemies());
    }

    @GetMapping(value = "/enemy")
    public ApiResponse<?> getEnemiesByType(@RequestParam String Type){
        try {
            List<Enemy> list = enemyService.getEnemiesByType(Type);
            return new ApiResponse<>(HttpStatus.OK,list);
        }
        catch (IllegalArgumentException ex) {
            return new ApiResponse<>(HttpStatus.BAD_REQUEST,"Verificare la scrittura della query, deve essere del tipo ?Type=<Classe>");
        }
        catch (NullPointerException ex){
            System.out.println(ex.getMessage());
            return new ApiResponse<>(HttpStatus.NOT_FOUND, "La stringa passata è nulla o enum è esploso!");
        }

    }


}
