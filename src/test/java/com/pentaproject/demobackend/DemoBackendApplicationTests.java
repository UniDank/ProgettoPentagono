package com.pentaproject.demobackend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@SpringBootTest
class DemoBackendApplicationTests {

   @Test
    public void EnemyClone() throws URISyntaxException {
       HttpClient client = HttpClient.newBuilder().build();
       HttpRequest request = HttpRequest.newBuilder()
               .uri(new URI("localhost:8080/api/v1/enemy?Type=Tank"))
               .GET()
               .build();


   }

}
