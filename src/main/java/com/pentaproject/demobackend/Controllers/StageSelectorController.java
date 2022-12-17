package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Party.Party;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
public class StageSelectorController {
     private PartyController partyController;
     private EnemyController enemyController;

    @GetMapping("/{id}/party")
    public ApiResponse<Party> getCurrentParty(@PathVariable int id){

    }

    @GetMapping("/{id}/enemies")
    public ApiResponse<List<Enemy>> getEnemy(@PathVariable int id){

    }

}
