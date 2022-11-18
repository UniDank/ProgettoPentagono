package com.pentaproject.demobackend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("enemy")
public class Enemy {
    @Id
    private String id;
    private String name;


}
