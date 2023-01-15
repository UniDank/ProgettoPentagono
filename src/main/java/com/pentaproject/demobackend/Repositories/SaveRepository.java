package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Save.Save;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SaveRepository extends MongoRepository<Save,Integer> {
}
