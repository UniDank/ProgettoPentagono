package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Services.EnemyService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
public class EnemyController {
    //https://stackoverflow.com/questions/62845494/autowired-says-field-injection-not-recommended

    private EnemyService enemyService;




}
