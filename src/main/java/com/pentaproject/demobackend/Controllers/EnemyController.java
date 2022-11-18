package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Repositories.IEnemyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/api/v1")
@RestController
public class EnemyController {
    @Autowired
    private IEnemyRepository rep;


    @GetMapping(value = "/enemies", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<?> getEnemies(){

        return new ApiResponse<>(HttpStatus.NOT_FOUND,rep.findAll());

    }
}
