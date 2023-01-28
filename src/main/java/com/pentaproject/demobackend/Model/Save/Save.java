    package com.pentaproject.demobackend.Model.Save;

import com.pentaproject.demobackend.Controllers.ItemController;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

    @Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Save")
public class Save{
    private String mainPlayer;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Save save = (Save) o;
            return Objects.equals(mainPlayer, save.mainPlayer);
        }

        @Override
        public int hashCode() {
            return Objects.hash(mainPlayer);
        }
    }
