package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Entity.Enemy;
import com.pentaproject.demobackend.Repositories.EnemyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/v1")
@RestController
public class EnemyController {
    @Autowired
    private EnemyRepository rep;


    @GetMapping("/enemies")
    public List<Enemy> getEnemies(){

        return rep.findAll();
    }
}
