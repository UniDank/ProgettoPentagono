package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;

import com.pentaproject.demobackend.Repositories.EnemyRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
public class EnemyController {
    //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended
    private EnemyRepository rep;


    @GetMapping(value = "/enemies", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<?> getEnemies(){

        return new ApiResponse<>(HttpStatus.OK,rep.findAll());

    }
}
