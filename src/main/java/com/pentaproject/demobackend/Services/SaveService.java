package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Save.Save;
import com.pentaproject.demobackend.Repositories.SaveRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class SaveService {
    private SaveRepository repository;
    
    /**
     * Metodo per ottenere il salvataggio 
     * @throws NoSuchElementException lanciato, se non trova valori!
     * */
    
    public Save getSave() throws NoSuchElementException {
        try {
            return repository.findAll().get(0);
        }
        catch (Exception ex){
            throw new NoSuchElementException();
        }
    }
    
    public void insertSave(@NonNull Save save){
        repository.save(save);
    }
    
    public void removeSave(){
        repository.deleteAll();
    }
}
