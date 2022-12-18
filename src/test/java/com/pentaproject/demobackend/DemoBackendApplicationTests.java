package com.pentaproject.demobackend;

import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Services.EnemyService;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

@SpringBootTest
class DemoBackendApplicationTests {

    @Autowired
    private EnemyService service;

    @Test
    public void insertValueDB(){
        this.service.generateEnemy("wa",29,28,2,40,new ArrayList<>(), EnemyType.Tank);
    }

}
