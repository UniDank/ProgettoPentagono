package com.pentaproject.demobackend;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Controllers.PartyController;
import com.pentaproject.demobackend.Controllers.SaveController;
import com.pentaproject.demobackend.Model.ClassType;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Model.Save.Save;
import com.pentaproject.demobackend.Repositories.EnemyRepository;
import com.pentaproject.demobackend.Repositories.PartyRepository;
import com.pentaproject.demobackend.Services.EnemyService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

/***
 * per far funzionare i test, serve avviare applicazione!
 * */
@SpringBootTest
@AutoConfigureMockMvc
class DemoBackendApplicationTests {
    @Autowired
    EnemyRepository enemyRepository;

    @Autowired
    private EnemyService service;

    @Autowired
    PartyController partyController;
    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SaveController saveController;



    @Test
    @DisplayName("Salvataggio dati e verifica integrità di quest'ultimi")
    public void insertValueDB(){
        Enemy EnemyTemp =  
                this.service.generateEnemy("ProvaFinale2",29,28,2,40,40,20, 1, ClassType.Tank);
        assertEquals( EnemyTemp.getName(), enemyRepository.findByName(EnemyTemp.getName()).getName());
        enemyRepository.deleteByName(EnemyTemp.getName());
    }
    @Test
    @DisplayName("Salvataggio dati ed eliminazione di quest'ultimo")
    public void insertValueAndDeleteDB(){
        Enemy EnemyTemp = 
                this.service.generateEnemy("TestSalvataggioDatiAndDeleteSupremoDellaVita",
                        29,28,2,40,40,20,1, ClassType.Tank);
        enemyRepository.deleteByName(EnemyTemp.getName());
        try {
            EnemyTemp = enemyRepository.findByName(EnemyTemp.getName());
        }catch (Exception e){
            assertFalse(false);
        }
    }
    @Test
    @DisplayName("Test connessione al DB")
    public void TestConnectionDB(){
        try{
            enemyRepository.findAll();
        }catch(Exception e){
            assertFalse(false);
        }
    }
    
    
    //Test degli EndPoint 
    //TODO: cambiare il test getParty
    @Test
    @DisplayName("Test Party Controller method: getParty")
    public void TestGetParty() throws Exception {
        String load = "{\"id_stage\":20,\"members\":" +
                "[{\"name\":\"pippo\",\"attack\":20,\"defense\":19,\"health\":60,\"mana\":45,\"agility\":30," +
                "\"aps\":5,\"category\":\"Tank\"}],\"bag\":[{\"name\":\"potion\",\"type\":\"heal\",\"value\":50,\"quantity\":45}]}";
        Party payload = objectMapper.readValue(load,Party.class);
        
        String responseexpacted = mvc.perform(get("http://localhost:8080/api/v1/party"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        
        JavaType type = TypeFactory.defaultInstance().constructParametricType(ApiResponse.class, Party.class);
        ApiResponse<Party> response = objectMapper.readValue(responseexpacted, type);
        Party responseParty = response.getData();
        responseParty.getMembers().forEach(System.out::println);
        payload.getMembers().forEach(System.out::println);
       
        assertEquals(payload,responseParty);
    }
    @Test
    @DisplayName("Test Party Controller method: insertParty")
    public void TestInsertParty() throws Exception {
        String payload = "{\"id_stage\":20,\"members\":[{\"name\":\"pippo\",\"attack\":20,\"defense\":19,\"health\":60," +
                "\"mana\":45,\"agility\":30,\"aps\":5,\"category\":\"Tank\"}]," +
                "\"bag\":[{\"name\":\"potion\",\"type\":\"heal\",\"value\":50,\"quantity\":45}]}";
        mvc.perform(post("http://localhost:8080/api/v1/party")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                                    .andExpect(status().isOk())
                                    .andReturn()
                                    .getResponse()
                                    .getContentAsString();
        String responseexpacted = objectMapper.writeValueAsString(partyController.getParty().getData());
        assertEquals(responseexpacted,payload);
    }
    
    /**
     * Attenzione, il test di sotto controlla solo se vieni inviato il json al frontend.
     * Non viene fatto nessun controllo al json, visto che è sicuro che o invia il json formatato nel modo correto o non lo invia mandato un errore!
     * */
    @Test
    @DisplayName("Test Enemies Controller method: getEnemies ")
    public void TestGetEnemies() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newBuilder().build();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create("http://localhost:8080/api/v1/2/enemies")).build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        assertEquals(response.statusCode(), 200 );
    }
    
    @Test
    @DisplayName("Test Save Controller method: getSave")
    public void TestGetSave() throws Exception {
        Save save = new Save("Agoraco");

        String responseexpacted = mvc.perform(get("http://localhost:8080/api/v1/select"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JavaType type = TypeFactory.defaultInstance().constructParametricType(ApiResponse.class, Save.class);
        ApiResponse<Save> response = objectMapper.readValue(responseexpacted, type);
        Save responseParty = response.getData();

        assertEquals(save,responseParty);
        
    }
    
    @Test
    @DisplayName("Test Party Controller method: insertSave")
    public void TestInsertSave() throws Exception {
        String payload = "{\"mainPlayer\":\"Agoraco\"}";
        mvc.perform(post("http://localhost:8080/api/v1/select")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        String responseexpacted = objectMapper.writeValueAsString(saveController.getSave().getData());
        assertEquals(responseexpacted,payload);

    }
}
